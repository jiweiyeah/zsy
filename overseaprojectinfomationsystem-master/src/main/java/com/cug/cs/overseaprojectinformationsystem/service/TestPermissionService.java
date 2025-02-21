package com.cug.cs.overseaprojectinformationsystem.service;

import com.cug.cs.overseaprojectinformationsystem.constant.RoleConstants;
import org.apache.shiro.authz.annotation.RequiresPermissions;
import org.springframework.stereotype.Service;

@Service
public class TestPermissionService {

    @RequiresPermissions(RoleConstants.PERMISSION_USER_EDIT)
    public void editUser() {
        // 编辑用户的具体实现
    }

    @RequiresPermissions(RoleConstants.PERMISSION_PROJECT_MANAGE)
    public void manageProject() {
        // 管理项目的具体实现
    }
} 