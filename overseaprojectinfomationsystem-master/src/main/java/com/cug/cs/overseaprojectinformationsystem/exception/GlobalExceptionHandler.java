package com.cug.cs.overseaprojectinformationsystem.exception;

import com.cug.cs.overseaprojectinformationsystem.bean.common.ResData;
import com.cug.cs.overseaprojectinformationsystem.bean.common.ResUtil;
import org.apache.shiro.authz.AuthorizationException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(AuthorizationException.class)
    public ResData<String> handleAuthorizationException(AuthorizationException e) {
        ResUtil<String> resUtil = new ResUtil<>();
        return resUtil.setErrorMsg(403, "没有权限访问该接口");
    }

    @ExceptionHandler(Exception.class)
    public ResData<String> handleException(Exception e) {
        ResUtil<String> resUtil = new ResUtil<>();
        return resUtil.setErrorMsg(500, "服务器内部错误：" + e.getMessage());
    }
} 