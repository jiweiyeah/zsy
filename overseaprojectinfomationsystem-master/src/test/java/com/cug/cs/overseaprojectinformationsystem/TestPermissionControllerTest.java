package com.cug.cs.overseaprojectinformationsystem;

import com.cug.cs.overseaprojectinformationsystem.constant.RoleConstants;
import com.cug.cs.overseaprojectinformationsystem.util.JwtUtil;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.web.servlet.MockMvc;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest
@AutoConfigureMockMvc
public class TestPermissionControllerTest {

    @Autowired
    private MockMvc mockMvc;
    
    private String userToken;
    private String adminToken;
    private String superAdminToken;
    
    @BeforeEach
    public void setup() {
        // 生成测试用的token
        userToken = JwtUtil.createToken("user", RoleConstants.ROLE_USER);
        adminToken = JwtUtil.createToken("admin", RoleConstants.ROLE_ADMIN);
        superAdminToken = JwtUtil.createToken("super", RoleConstants.ROLE_SUPER_ADMIN);
    }

    @Test
    public void testUserView() throws Exception {
        // 使用普通用户token测试查看权限
        mockMvc.perform(get("/test/user/view")
                .header("Authorization", userToken))
                .andExpect(status().isOk());
                
        // 管理员也应该能查看
        mockMvc.perform(get("/test/user/view")
                .header("Authorization", adminToken))
                .andExpect(status().isOk());
    }

    @Test
    public void testAdminOperation() throws Exception {
        // 普通用户不能访问管理接口
        mockMvc.perform(post("/test/project/manage")
                .header("Authorization", userToken))
                .andExpect(status().isForbidden());
        
        // 管理员可以访问
        mockMvc.perform(post("/test/project/manage")
                .header("Authorization", adminToken))
                .andExpect(status().isOk());
    }
    
    @Test
    public void testSuperAdminOperation() throws Exception {
        // 测试系统配置接口
        // 普通用户不能访问
        mockMvc.perform(post("/test/system/config")
                .header("Authorization", userToken))
                .andExpect(status().isForbidden());
                
        // 管理员不能访问
        mockMvc.perform(post("/test/system/config")
                .header("Authorization", adminToken))
                .andExpect(status().isForbidden());
                
        // 超级管理员可以访问
        mockMvc.perform(post("/test/system/config")
                .header("Authorization", superAdminToken))
                .andExpect(status().isOk());
    }
    
    @Test
    public void testUnauthorizedAccess() throws Exception {
        // 测试未登录访问
        mockMvc.perform(get("/test/user/view"))
                .andExpect(status().isUnauthorized());
    }
    
    @Test 
    public void testInvalidToken() throws Exception {
        // 测试无效token
        mockMvc.perform(get("/test/user/view")
                .header("Authorization", "invalid_token"))
                .andExpect(status().isUnauthorized());
    }
} 