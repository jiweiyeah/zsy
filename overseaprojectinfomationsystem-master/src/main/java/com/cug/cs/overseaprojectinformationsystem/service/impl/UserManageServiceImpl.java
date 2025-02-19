package com.cug.cs.overseaprojectinformationsystem.service.impl;

import com.cug.cs.overseaprojectinformationsystem.dal.entitys.Member;
import com.cug.cs.overseaprojectinformationsystem.mapper.MemberMapper;
import com.cug.cs.overseaprojectinformationsystem.service.UserManageService;
import com.cug.cs.overseaprojectinformationsystem.util.jwt.JwtTokenUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

/**
 * @description: TODO
 * @author: ShengHui
 * @date: 2023-09-17  18:21
 */
@Service
public class UserManageServiceImpl implements UserManageService {
    
    @Autowired
    MemberMapper memberMapper;
    @Override
    public Member selectUserInfoByUserId(Integer id) {
        Member member=memberMapper.selectUserInfoByUserId(id);
        return member;
    }
    
    @Transactional
    @Override
    public boolean createNewUser(Member member) {
        int result=memberMapper.insertNewUser(member);
        if (result == 1) {
            return true;
        }
        return false;
    }
    
    @Override
    public List<Member> selectUserList() {
        List<Member> memberList=memberMapper.selectUserList();
        return memberList;
    }
    
    @Override
    public List<Member> selectUserListByCenterId(String centerId) {
        List<Member> memberList=memberMapper.selectUserListByCenterId(centerId);
        return memberList;
        
    }
    
    @Override
    public boolean updateUserInfo(Member member) {
        int row=memberMapper.updateUserInfo(member);
        if (row == 1) {
            return true;
        }
        return false;
    }
    
    @Override
    public boolean deleteUserByUserId(Integer id) {
        int row=memberMapper.deletedUserByUserId(id);
        if (row == 1) {
            return true;
        }
        return false;
    }
}
