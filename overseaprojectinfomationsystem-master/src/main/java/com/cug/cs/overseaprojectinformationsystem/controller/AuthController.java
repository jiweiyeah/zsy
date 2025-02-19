package com.cug.cs.overseaprojectinformationsystem.controller;

import com.cug.cs.overseaprojectinformationsystem.bean.common.ResData;
import com.cug.cs.overseaprojectinformationsystem.bean.common.ResUtil;
import com.cug.cs.overseaprojectinformationsystem.util.JwtUtil;
import org.apache.shiro.authz.annotation.RequiresAuthentication;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/auth")
public class AuthController {

    @PostMapping("/login")
    public ResData<Map<String, String>> login(@RequestParam String username, @RequestParam String password) {
        ResUtil<Map<String, String>> resUtil = new ResUtil<>();
        // 这里简单演示，实际应该查询数据库验证用户名密码
        if ("admin".equals(username) && "123456".equals(password)) {
            String token = JwtUtil.createToken(username);
            Map<String, String> data = new HashMap<>();
            data.put("token", token);
            return resUtil.setData(data, "登录成功");
        }
        return resUtil.setErrorMsg("用户名或密码错误");
    }

    @GetMapping("/test")
    @RequiresAuthentication
    public ResData<String> test() {
        ResUtil<String> resUtil = new ResUtil<>();
        return resUtil.setData("认证通过");
    }
} 