package com.cug.cs.overseaprojectinformationsystem.entity;

import lombok.Data;

@Data
public class SystemPermission {
    private Integer id;
    private Integer roleId;  // 对应数据库中的 role_id
    private String permission;  // 对应数据库中的 permission
    private Boolean deleted;
} 