package com.cug.cs.overseaprojectinformationsystem.realm;

import com.cug.cs.overseaprojectinformationsystem.config.realm.AdminRealm;
import com.cug.cs.overseaprojectinformationsystem.config.realm.SuperAdmin;
import com.cug.cs.overseaprojectinformationsystem.config.realm.UserReaml;
import com.cug.cs.overseaprojectinformationsystem.constant.RoleConstants;
import com.cug.cs.overseaprojectinformationsystem.shiro.JwtToken;
import com.cug.cs.overseaprojectinformationsystem.util.JwtUtil;
import org.apache.shiro.authc.AuthenticationException;
import org.apache.shiro.authc.AuthenticationInfo;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import lombok.extern.slf4j.Slf4j;

import static org.junit.jupiter.api.Assertions.*;

@Slf4j
@SpringBootTest
public class RealmTest {

    @Autowired
    private AdminRealm adminRealm;
    
    @Autowired
    private UserReaml userRealm;
    
    @Autowired
    private SuperAdmin superAdmin;

    @Test
    public void testAdminRealm() {
        log.info("开始测试AdminRealm...");
        
        // 1. 测试正确的管理员token
        String adminToken = JwtUtil.createToken("admin", RoleConstants.ROLE_ADMIN);
        log.info("生成管理员token: {}", adminToken);
        JwtToken jwtToken = new JwtToken(adminToken);
        
        AuthenticationInfo authInfo = adminRealm.doGetAuthenticationInfo(jwtToken);
        assertNotNull(authInfo);
        log.info("管理员认证测试通过");
        
        // 2. 测试普通用户token (应该被拒绝)
        final String userToken = JwtUtil.createToken("user", RoleConstants.ROLE_USER);
        log.info("生成普通用户token: {}", userToken);
        final JwtToken userJwtToken = new JwtToken(userToken);
        
        assertThrows(AuthenticationException.class, () -> {
            adminRealm.doGetAuthenticationInfo(userJwtToken);
        });
        log.info("非管理员访问限制测试通过");
        
        // 3. 测试超级管理员token (应该通过)
        final String superAdminToken = JwtUtil.createToken("super", RoleConstants.ROLE_SUPER_ADMIN);
        log.info("生成超级管理员token: {}", superAdminToken);
        final JwtToken superAdminJwtToken = new JwtToken(superAdminToken);
        
        AuthenticationInfo superAuthInfo = adminRealm.doGetAuthenticationInfo(superAdminJwtToken);
        assertNotNull(superAuthInfo);
        log.info("超级管理员访问管理员权限测试通过");
    }

    @Test
    public void testUserRealm() {
        log.info("开始测试UserRealm...");
        
        // 1. 测试普通用户token
        String userToken = JwtUtil.createToken("user", RoleConstants.ROLE_USER);
        log.info("生成普通用户token: {}", userToken);
        JwtToken jwtToken = new JwtToken(userToken);
        
        AuthenticationInfo authInfo = userRealm.doGetAuthenticationInfo(jwtToken);
        assertNotNull(authInfo);
        log.info("普通用户认证测试通过");
        
        // 2. 测试管理员token (应该通过)
        final String adminToken = JwtUtil.createToken("admin", RoleConstants.ROLE_ADMIN);
        log.info("生成管理员token: {}", adminToken);
        final JwtToken adminJwtToken = new JwtToken(adminToken);
        
        AuthenticationInfo adminAuthInfo = userRealm.doGetAuthenticationInfo(adminJwtToken);
        assertNotNull(adminAuthInfo);
        log.info("管理员访问普通用户权限测试通过");
        
        // 3. 测试超级管理员token (应该通过)
        final String superAdminToken = JwtUtil.createToken("super", RoleConstants.ROLE_SUPER_ADMIN);
        log.info("生成超级管理员token: {}", superAdminToken);
        final JwtToken superAdminJwtToken = new JwtToken(superAdminToken);
        
        AuthenticationInfo superAuthInfo = userRealm.doGetAuthenticationInfo(superAdminJwtToken);
        assertNotNull(superAuthInfo);
        log.info("超级管理员访问普通用户权限测试通过");
    }

    @Test
    public void testSuperAdminRealm() {
        log.info("开始测试SuperAdminRealm...");
        
        // 1. 测试超级管理员token
        String superAdminToken = JwtUtil.createToken("super", RoleConstants.ROLE_SUPER_ADMIN);
        log.info("生成超级管理员token: {}", superAdminToken);
        JwtToken jwtToken = new JwtToken(superAdminToken);
        
        AuthenticationInfo authInfo = superAdmin.doGetAuthenticationInfo(jwtToken);
        assertNotNull(authInfo);
        log.info("超级管理员认证测试通过");
        
        // 2. 测试管理员token (应该被拒绝)
        final String adminToken = JwtUtil.createToken("admin", RoleConstants.ROLE_ADMIN);
        log.info("生成管理员token: {}", adminToken);
        final JwtToken adminJwtToken = new JwtToken(adminToken);
        
        assertThrows(AuthenticationException.class, () -> {
            superAdmin.doGetAuthenticationInfo(adminJwtToken);
        });
        log.info("管理员访问超级管理员权限限制测试通过");
        
        // 3. 测试普通用户token (应该被拒绝)
        final String userToken = JwtUtil.createToken("user", RoleConstants.ROLE_USER);
        log.info("生成普通用户token: {}", userToken);
        final JwtToken userJwtToken = new JwtToken(userToken);
        
        assertThrows(AuthenticationException.class, () -> {
            superAdmin.doGetAuthenticationInfo(userJwtToken);
        });
        log.info("普通用户访问超级管理员权限限制测试通过");
    }
} 