package com.cug.cs.overseaprojectinformationsystem.entity;

import lombok.Data;

@Data
public class SystemUser {
    private Integer id;
    private String name;
    private String username;
    private String password;
    private Integer sex;
    private String department;
    private Integer roleId;
    private Boolean deleted;
} 