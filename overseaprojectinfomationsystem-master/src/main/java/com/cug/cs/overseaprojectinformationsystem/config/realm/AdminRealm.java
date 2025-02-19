package com.cug.cs.overseaprojectinformationsystem.config.realm;

import org.apache.shiro.authc.AuthenticationException;
import org.apache.shiro.authc.AuthenticationInfo;
import org.apache.shiro.authc.AuthenticationToken;
import org.apache.shiro.authc.SimpleAuthenticationInfo;
import org.apache.shiro.authz.AuthorizationInfo;
import org.apache.shiro.authz.SimpleAuthorizationInfo;
import org.apache.shiro.realm.AuthorizingRealm;
import org.apache.shiro.subject.PrincipalCollection;
import org.springframework.stereotype.Component;

import com.cug.cs.overseaprojectinformationsystem.shiro.JwtToken;
import com.cug.cs.overseaprojectinformationsystem.util.JwtUtil;

/**
 * @description: TODO 提供信息：授权信息与认证信息（管理员）
 * @author: ShengHui
 * @date: 2023-07-21  16:25
 */

@Component
public class AdminRealm extends AuthorizingRealm {
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
        return token instanceof JwtToken;
    }

    @Override
    protected AuthenticationInfo doGetAuthenticationInfo(AuthenticationToken token) throws AuthenticationException {
        String jwt = (String) token.getPrincipal();
        if (jwt == null) {
            throw new AuthenticationException("token不能为空");
        }
        
        // 验证JWT的有效性
        try {
            if (!JwtUtil.verify(jwt)) {
                throw new AuthenticationException("token验证失败");
            }
            String username = JwtUtil.getUsername(jwt);
            if (username == null) {
                throw new AuthenticationException("token中无用户信息");
            }
            return new SimpleAuthenticationInfo(jwt, jwt, getName());
        } catch (Exception e) {
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
        // 从JWT中获取用户信息，并设置用户权限
        SimpleAuthorizationInfo info = new SimpleAuthorizationInfo();
        // 设置角色和权限
        // info.addRole("admin");
        // info.addStringPermission("user:view");
        return info;
    }
}
