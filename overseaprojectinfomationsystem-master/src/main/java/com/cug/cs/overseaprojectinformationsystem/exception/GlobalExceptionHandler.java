package com.cug.cs.overseaprojectinformationsystem.exception;

import com.cug.cs.overseaprojectinformationsystem.bean.common.ResData;
import com.cug.cs.overseaprojectinformationsystem.bean.common.ResUtil;
import com.cug.cs.overseaprojectinformationsystem.bean.common.ResponseData;
import org.apache.shiro.authz.AuthorizationException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.apache.shiro.authc.AuthenticationException;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(AuthorizationException.class)
    public ResponseData handleAuthorizationException(AuthorizationException e) {
        ResponseData response = new ResponseData();
        response.setSuccess(false);
        response.setCode(403);
        response.setMessage("没有权限访问该资源");
        return response;
    }

    @ExceptionHandler(AuthenticationException.class) 
    public ResponseData handleAuthenticationException(AuthenticationException e) {
        ResponseData response = new ResponseData();
        response.setSuccess(false);
        response.setCode(401);
        response.setMessage("身份认证失败");
        return response;
    }

    @ExceptionHandler(Exception.class)
    public ResData<String> handleException(Exception e) {
        ResUtil<String> resUtil = new ResUtil<>();
        return resUtil.setErrorMsg(500, "服务器内部错误：" + e.getMessage());
    }
} 