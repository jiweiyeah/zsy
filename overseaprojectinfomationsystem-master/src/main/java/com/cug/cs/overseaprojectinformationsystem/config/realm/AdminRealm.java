package com.cug.cs.overseaprojectinformationsystem.config.realm;

import org.apache.shiro.authc.AuthenticationException;
import org.apache.shiro.authc.AuthenticationInfo;
import org.apache.shiro.authc.AuthenticationToken;
import org.apache.shiro.authc.SimpleAuthenticationInfo;
import org.apache.shiro.authz.AuthorizationInfo;
import org.apache.shiro.authz.SimpleAuthorizationInfo;
import org.apache.shiro.realm.AuthorizingRealm;
import org.apache.shiro.subject.PrincipalCollection;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import lombok.extern.slf4j.Slf4j;

import com.cug.cs.overseaprojectinformationsystem.shiro.JwtToken;
import com.cug.cs.overseaprojectinformationsystem.util.JwtUtil;
import com.cug.cs.overseaprojectinformationsystem.constant.RoleConstants;
import com.cug.cs.overseaprojectinformationsystem.entity.SystemRole;
import com.cug.cs.overseaprojectinformationsystem.entity.SystemPermission;
import com.cug.cs.overseaprojectinformationsystem.mapper.SystemRoleMapper;
import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import java.util.List;

/**
 * @description: TODO 提供信息：授权信息与认证信息（管理员）
 * @author: ShengHui
 * @date: 2023-07-21  16:25
 */

@Slf4j
@Component
public class AdminRealm extends AuthorizingRealm {
    @Autowired
    private SystemRoleMapper roleMapper;

    /*@Autowired
    MarketAdminMapper marketAdminMapper;
    @Autowired
    MarketRoleMapper marketRoleMapper;
    @Autowired
    MarketPermissionMapper marketPermissionMapper;*/
    /**
     * 身份验证
     * @param token
     * @return org.apache.shiro.authc.AuthenticationInfo
     * @author huangshenghui
     */
    @Override
    public boolean supports(AuthenticationToken token) {
        boolean support = token instanceof JwtToken;
        log.info("AdminRealm supports token: {}, result: {}", token.getClass(), support);
        return support;
    }

    @Override
    public AuthenticationInfo doGetAuthenticationInfo(AuthenticationToken token) throws AuthenticationException {
        String jwt = (String) token.getPrincipal();
        log.info("AdminRealm开始验证token: {}", jwt);
        
        if (jwt == null) {
            log.error("AdminRealm验证失败: token为空");
            throw new AuthenticationException("token不能为空");
        }
        
        try {
            if (!JwtUtil.verify(jwt)) {
                log.error("AdminRealm验证失败: token无效");
                throw new AuthenticationException("token验证失败");
            }
            
            String role = JwtUtil.getRole(jwt);
            log.info("AdminRealm当前用户角色: {}", role);
            
            if (!RoleConstants.ROLE_ADMIN.equals(role) && 
                !RoleConstants.ROLE_SUPER_ADMIN.equals(role)) {
                log.error("AdminRealm验证失败: 权限不足, 当前角色: {}", role);
                throw new AuthenticationException("权限不足");
            }
            
            String username = JwtUtil.getUsername(jwt);
            log.info("AdminRealm当前用户: {}", username);
            
            if (username == null) {
                log.error("AdminRealm验证失败: token中无用户信息");
                throw new AuthenticationException("token中无用户信息");
            }
            
            log.info("AdminRealm验证成功, 用户: {}, 角色: {}", username, role);
            return new SimpleAuthenticationInfo(jwt, jwt, getName());
        } catch (Exception e) {
            log.error("AdminRealm验证失败: {}", e.getMessage(), e);
            throw new AuthenticationException("token验证失败: " + e.getMessage());
        }
    }
    
    /**
     *  授权验证
     * @param principals
     * @return org.apache.shiro.authz.AuthorizationInfo
     * @author huangshenghui
     */
    @Override
    protected AuthorizationInfo doGetAuthorizationInfo(PrincipalCollection principals) {
        String token = (String) principals.getPrimaryPrincipal();
        String username = JwtUtil.getUsername(token);
        log.info("AdminRealm开始授权, 用户: {}", username);
        
        // 从数据库获取角色和权限
        SystemRole role = roleMapper.selectOne(
            new QueryWrapper<SystemRole>().eq("name", RoleConstants.ROLE_ADMIN)
        );
        List<SystemPermission> permissions = roleMapper.getPermissionsByRoleId(role.getId());
        
        SimpleAuthorizationInfo info = new SimpleAuthorizationInfo();
        info.addRole(role.getName());
        permissions.forEach(p -> info.addStringPermission(p.getPermission()));
        
        log.info("AdminRealm授权完成, 用户: {}, 角色: {}, 权限: {}", 
            username, role.getName(), info.getStringPermissions());
        return info;
    }
}
