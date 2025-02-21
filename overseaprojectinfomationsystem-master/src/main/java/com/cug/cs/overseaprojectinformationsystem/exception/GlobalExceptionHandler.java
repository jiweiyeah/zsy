package com.cug.cs.overseaprojectinformationsystem.exception;

import com.cug.cs.overseaprojectinformationsystem.bean.common.ResData;
import com.cug.cs.overseaprojectinformationsystem.bean.common.ResUtil;
import com.cug.cs.overseaprojectinformationsystem.bean.common.ResponseData;
import org.apache.shiro.authz.AuthorizationException;
import org.apache.shiro.authz.UnauthenticatedException;
import org.apache.shiro.authz.UnauthorizedException;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.apache.shiro.authc.AuthenticationException;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(UnauthenticatedException.class)
    @ResponseStatus(HttpStatus.UNAUTHORIZED)
    public ResponseData handleUnauthenticatedException(UnauthenticatedException e) {
        ResponseData response = new ResponseData();
        response.setSuccess(false);
        response.setMessage("未登录或token已过期");
        response.setCode(401);
        return response;
    }

    @ExceptionHandler(UnauthorizedException.class)
    @ResponseStatus(HttpStatus.FORBIDDEN)
    public ResponseData handleUnauthorizedException(UnauthorizedException e) {
        ResponseData response = new ResponseData();
        response.setSuccess(false);
        response.setMessage("没有相关权限");
        response.setCode(403);
        return response;
    }

    @ExceptionHandler(AuthorizationException.class)
    @ResponseStatus(HttpStatus.FORBIDDEN)
    public ResponseData handleAuthorizationException(AuthorizationException e) {
        ResponseData response = new ResponseData();
        response.setSuccess(false);
        response.setMessage("权限验证失败");
        response.setCode(403);
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