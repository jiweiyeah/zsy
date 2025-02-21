package com.cug.cs.overseaprojectinformationsystem.controller;

import com.cug.cs.overseaprojectinformationsystem.bean.common.ResponseData;
import com.cug.cs.overseaprojectinformationsystem.constant.RoleConstants;
import org.apache.shiro.authz.annotation.*;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/test")
public class TestPermissionController {

    // 需要登录才能访问
    @RequiresAuthentication
    @GetMapping("/auth")
    public ResponseData testAuth() {
        ResponseData response = new ResponseData();
        response.setSuccess(true);
        response.setMessage("认证测试成功");
        return response;
    }

    // 超级管理员专属接口
    @RequiresRoles(RoleConstants.ROLE_SUPER_ADMIN)
    @RequiresPermissions(RoleConstants.PERMISSION_SYSTEM_CONFIG)
    @PostMapping("/system/config")
    public ResponseData systemConfig() {
        ResponseData response = new ResponseData();
        response.setSuccess(true);
        response.setMessage("系统配置操作成功");
        return response;
    }

    // 管理员及以上角色可访问
    @RequiresRoles(value = {RoleConstants.ROLE_ADMIN, RoleConstants.ROLE_SUPER_ADMIN}, logical = Logical.OR)
    @RequiresPermissions(RoleConstants.PERMISSION_PROJECT_MANAGE)
    @PutMapping("/project/manage")
    public ResponseData projectManage() {
        ResponseData response = new ResponseData();
        response.setSuccess(true);
        response.setMessage("项目管理操作成功");
        return response;
    }

    // 所有用户都可以查看
    @RequiresPermissions(RoleConstants.PERMISSION_USER_VIEW)
    @GetMapping("/user/view")
    public ResponseData userView() {
        ResponseData response = new ResponseData();
        response.setSuccess(true);
        response.setMessage("用户查看操作成功");
        return response;
    }

    // 管理员可以编辑用户
    @RequiresPermissions(RoleConstants.PERMISSION_USER_EDIT)
    @PutMapping("/user/edit")
    public ResponseData userEdit() {
        ResponseData response = new ResponseData();
        response.setSuccess(true);
        response.setMessage("用户编辑操作成功");
        return response;
    }

    // 管理员可以删除用户
    @RequiresPermissions(RoleConstants.PERMISSION_USER_DELETE)
    @DeleteMapping("/user/delete")
    public ResponseData userDelete() {
        ResponseData response = new ResponseData();
        response.setSuccess(true);
        response.setMessage("用户删除操作成功");
        return response;
    }

    // 管理员及以上可以导出数据
    @RequiresPermissions(RoleConstants.PERMISSION_DATA_EXPORT)
    @GetMapping("/data/export")
    public ResponseData dataExport() {
        ResponseData response = new ResponseData();
        response.setSuccess(true);
        response.setMessage("数据导出操作成功");
        return response;
    }
} 