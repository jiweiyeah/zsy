package com.cug.cs.overseaprojectinformationsystem.entity;

import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;

@Data
@TableName("system_role")
public class SystemRole {
    private Integer id;
    private String name;
    
    @TableField("`desc`")  // 使用反引号包裹关键字
    private String desc;
    
    private Boolean enabled;
    private Boolean deleted;
} 