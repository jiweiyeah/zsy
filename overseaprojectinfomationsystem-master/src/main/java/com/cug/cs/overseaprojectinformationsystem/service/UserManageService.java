package com.cug.cs.overseaprojectinformationsystem.service;


import com.cug.cs.overseaprojectinformationsystem.dal.entitys.Member;

import java.util.List;

public interface UserManageService {
    Member selectUserInfoByUserId(Integer id);
    
    boolean createNewUser(Member member);
    
    List<Member> selectUserList();
    
    List<Member> selectUserListByCenterId(String centerId);
    
    boolean updateUserInfo(Member member);
    
    boolean deleteUserByUserId(Integer id);
}
