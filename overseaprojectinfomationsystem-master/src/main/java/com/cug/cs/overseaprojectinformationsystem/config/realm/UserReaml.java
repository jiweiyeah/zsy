package com.cug.cs.overseaprojectinformationsystem.config.realm;

import com.cug.cs.overseaprojectinformationsystem.constant.RoleConstants;
import com.cug.cs.overseaprojectinformationsystem.shiro.JwtToken;
import com.cug.cs.overseaprojectinformationsystem.util.JwtUtil;
import lombok.extern.slf4j.Slf4j;
import org.apache.shiro.authc.AuthenticationException;
import org.apache.shiro.authc.AuthenticationInfo;
import org.apache.shiro.authc.AuthenticationToken;
import org.apache.shiro.authc.SimpleAuthenticationInfo;
import org.apache.shiro.authz.AuthorizationInfo;
import org.apache.shiro.authz.SimpleAuthorizationInfo;
import org.apache.shiro.realm.AuthorizingRealm;
import org.apache.shiro.subject.PrincipalCollection;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

/**
 * @description: TODO  提供信息：授权信息与认证信息（普通用户）
 * @author: ShengHui
 * @date: 2023-07-21  16:29
 */

@Slf4j
@Component
public class UserReaml extends AuthorizingRealm {
    /*@Autowired
    MarketUserMapper marketUserMapper;*/
    
    @Override
    public boolean supports(AuthenticationToken token) {
        boolean support = token instanceof JwtToken;
        log.info("UserRealm supports token: {}, result: {}", token.getClass(), support);
        return support;
    }
    
    @Override
    public AuthenticationInfo doGetAuthenticationInfo(AuthenticationToken token) throws AuthenticationException {
        String jwt = (String) token.getPrincipal();
        log.info("UserRealm开始验证token: {}", jwt);
        
        if (jwt == null) {
            log.error("UserRealm验证失败: token为空");
            throw new AuthenticationException("token不能为空");
        }
        
        try {
            if (!JwtUtil.verify(jwt)) {
                log.error("UserRealm验证失败: token无效");
                throw new AuthenticationException("token验证失败");
            }
            
            String role = JwtUtil.getRole(jwt);
            log.info("UserRealm当前用户角色: {}", role);
            
            if (!RoleConstants.ROLE_USER.equals(role) && 
                !RoleConstants.ROLE_ADMIN.equals(role) && 
                !RoleConstants.ROLE_SUPER_ADMIN.equals(role)) {
                log.error("UserRealm验证失败: 无效角色, 当前角色: {}", role);
                throw new AuthenticationException("无效角色");
            }
            
            String username = JwtUtil.getUsername(jwt);
            log.info("UserRealm当前用户: {}", username);
            
            if (username == null) {
                log.error("UserRealm验证失败: token中无用户信息");
                throw new AuthenticationException("token中无用户信息");
            }
            
            log.info("UserRealm验证成功, 用户: {}, 角色: {}", username, role);
            return new SimpleAuthenticationInfo(jwt, jwt, getName());
        } catch (Exception e) {
            log.error("UserRealm验证失败: {}", e.getMessage(), e);
            throw new AuthenticationException("token验证失败: " + e.getMessage());
        }
    }
    
    @Override
    protected AuthorizationInfo doGetAuthorizationInfo(PrincipalCollection principals) {
        String token = (String) principals.getPrimaryPrincipal();
        String username = JwtUtil.getUsername(token);
        log.info("UserRealm开始授权, 用户: {}", username);
        
        SimpleAuthorizationInfo info = new SimpleAuthorizationInfo();
        info.addRole(RoleConstants.ROLE_USER);
        info.addStringPermission(RoleConstants.PERMISSION_USER_VIEW);
        
        log.info("UserRealm授权完成, 用户: {}, 角色: {}, 权限: {}", 
            username, RoleConstants.ROLE_USER, info.getStringPermissions());
        return info;
    }
}
