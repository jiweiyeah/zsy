package com.cug.cs.overseaprojectinformationsystem.mapper;

import com.cug.cs.overseaprojectinformationsystem.dal.entitys.Member;
import org.apache.ibatis.annotations.Param;

import java.util.List;

public interface MemberMapper {
    List<Member> selectByUserNameAndPassword(Member member);
    
    Member selectUserInfoByUserId(@Param("id")Integer  id);
    
    int insertNewUser(Member member);
    
    List<Member> selectUserList();
    
    List<Member> selectUserListByCenterId(@Param("centerId") String centerId);
    
    int updateUserInfo(@Param("member") Member member);
    
    int deletedUserByUserId(@Param("id") Integer id);
}
