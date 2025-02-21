package com.cug.cs.overseaprojectinformationsystem.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.cug.cs.overseaprojectinformationsystem.entity.SystemRole;
import com.cug.cs.overseaprojectinformationsystem.entity.SystemPermission;
import org.apache.ibatis.annotations.Param;
import java.util.List;

public interface SystemRoleMapper extends BaseMapper<SystemRole> {
    SystemRole selectById(@Param("id") Integer id);
    SystemRole selectByName(@Param("name") String name);
    List<SystemPermission> getPermissionsByRoleId(@Param("roleId") Integer roleId);
} 