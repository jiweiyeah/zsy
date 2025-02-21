package com.cug.cs.overseaprojectinformationsystem.filter;

import com.alibaba.fastjson.JSON;
import com.cug.cs.overseaprojectinformationsystem.bean.common.ResData;
import com.cug.cs.overseaprojectinformationsystem.bean.common.ResUtil;
import com.cug.cs.overseaprojectinformationsystem.shiro.JwtToken;
import org.apache.shiro.web.filter.authc.BasicHttpAuthenticationFilter;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.RequestMethod;

import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

/**
 * @description: TODO
 * @author: ShengHui
 * @date: 2023-09-15  23:24
 */
public class JwtFilter extends BasicHttpAuthenticationFilter {
    
    /**
     * @description: 判断是否允许通过
     * @param:
     * @return:
     */
    @Override
    protected boolean isAccessAllowed(ServletRequest request, ServletResponse response, Object mappedValue) {
        try {
            return executeLogin(request, response);
        } catch (Exception e) {
            return false;
        }
    }
    
    /**
     * @description: 判断是否登录
     * @param:
     * @return: 
     */
    @Override
    protected boolean isLoginAttempt(ServletRequest request, ServletResponse response) {
        HttpServletRequest req = (HttpServletRequest) request;
        String token = req.getHeader("Authorization");
        return token != null && !token.isEmpty();
    }
    
    @Override
    protected boolean executeLogin(ServletRequest request, ServletResponse response) {
        HttpServletRequest httpServletRequest = (HttpServletRequest) request;
        String token = httpServletRequest.getHeader("Authorization");
        
        if (token == null || token.isEmpty()) {
            return false;
        }
        
        JwtToken jwtToken = new JwtToken(token);
        try {
            getSubject(request, response).login(jwtToken);
            return true;
        } catch (Exception e) {
            return false;
        }
    }
    
    @Override
    protected boolean preHandle(ServletRequest request, ServletResponse response) throws Exception {
        HttpServletRequest httpServletRequest = (HttpServletRequest) request;
        HttpServletResponse httpServletResponse = (HttpServletResponse) response;
        httpServletResponse.setHeader("Access-control-Allow-Origin", httpServletRequest.getHeader("Origin"));
        httpServletResponse.setHeader("Access-Control-Allow-Methods", "GET,POST,OPTIONS,PUT,DELETE");
        httpServletResponse.setHeader("Access-Control-Allow-Headers", httpServletRequest.getHeader("Access-Control-Request-Headers"));
        if (httpServletRequest.getMethod().equals(RequestMethod.OPTIONS.name())) {
            httpServletResponse.setStatus(HttpStatus.OK.value());
            return false;
        }
        return super.preHandle(request, response);
    }
    
    @Override
    protected boolean onAccessDenied(ServletRequest request, ServletResponse response) throws Exception {
        HttpServletResponse httpResponse = (HttpServletResponse) response;
        if (isLoginAttempt(request, response)) {
            // Token存在但验证失败，返回403
            httpResponse.setStatus(HttpStatus.FORBIDDEN.value());
        } else {
            // Token不存在，返回401
            httpResponse.setStatus(HttpStatus.UNAUTHORIZED.value());
        }
        return false;
    }
    
    private void responseError(ServletResponse response) {
        try {
            HttpServletResponse httpServletResponse = (HttpServletResponse) response;
            httpServletResponse.setHeader("Access-Control-Allow-Origin", "*");
            httpServletResponse.setHeader("Access-Control-Allow-Methods", "*");
            httpServletResponse.setContentType("application/json; charset=UTF-8");
            ResUtil<String> resUtil = new ResUtil<>();
            ResData<String> error = resUtil.setErrorMsg("认证失败");
            httpServletResponse.getWriter().write(JSON.toJSONString(error));
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}
