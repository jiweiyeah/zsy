package com.cug.cs.overseaprojectinformationsystem.service.impl;

import com.alibaba.fastjson.JSON;

import com.cug.cs.overseaprojectinformationsystem.constant.UserRetCode;
import com.cug.cs.overseaprojectinformationsystem.dal.entitys.Member;
import com.cug.cs.overseaprojectinformationsystem.dto.UserLoginResponse;
import com.cug.cs.overseaprojectinformationsystem.exception.ValidateException;
import com.cug.cs.overseaprojectinformationsystem.form.UserLoginRequest;
import com.cug.cs.overseaprojectinformationsystem.mapper.MemberMapper;
import com.cug.cs.overseaprojectinformationsystem.service.ILoginService;
import com.cug.cs.overseaprojectinformationsystem.util.jwt.JwtTokenUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.CollectionUtils;
import org.springframework.util.DigestUtils;


import javax.validation.constraints.NotEmpty;
import java.util.HashMap;
import java.util.List;
import java.util.Map;


@Service
public class LoginServiceImpl implements ILoginService {

    @Autowired
    private MemberMapper memberMapper;

   /* @Autowired
    private UserConverterMapper userConverterMapper;*/


    @Override
    public UserLoginResponse login(UserLoginRequest request) {
        // 验证用户名和密码是否正确
        /*Example example = new Example(Member.class);
        example.createCriteria()
                .andEqualTo("username", request.getUserName())
                .andEqualTo("password", DigestUtils.md5DigestAsHex(request.getUserPwd().getBytes()));*/
        String password = request.getUserPwd();
        String userName = request.getUserName();
        Member member = new Member();
        member.setUsername(userName);
        member.setPassword(password);
        // 验证用户名和密码是否正确
        
        List<Member> members = memberMapper.selectByUserNameAndPassword(member);
        
        if (CollectionUtils.isEmpty(members)) {
            throw new ValidateException(UserRetCode.USERORPASSWORD_ERROR.getCode(),
                    UserRetCode.USERORPASSWORD_ERROR.getMessage());
        }

        // 是否需要用  激活表来验证
        Member registeredMember = members.get(0);
        
        // 生成 JWT token
        Map<String, Object> map = new HashMap<>();
        map.put("uid", registeredMember.getId());
        map.put("username", registeredMember.getUsername());
        String token = JwtTokenUtils.builder().msg(JSON.toJSONString(map)).build().creatJwtToken();
        UserLoginResponse loginResponse = new UserLoginResponse();
        // TODO 需要重新封装类
        
        // UserLoginResponse loginResponse = userConverterMapper.converter(registeredMember);
        loginResponse.setToken(token);
        return loginResponse;
    }

}
