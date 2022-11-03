package com.sloth.meeplo.global.filter;

import com.sloth.meeplo.global.exception.MeeploException;
import com.sloth.meeplo.global.exception.code.CommonErrorCode;
import com.sloth.meeplo.global.util.JwtUtil;
import com.sloth.meeplo.member.entity.Member;
import com.sloth.meeplo.member.service.MemberService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;
import org.springframework.security.web.util.matcher.RequestMatcher;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.GenericFilterBean;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import java.io.IOException;

@Component
@RequiredArgsConstructor
public class JwtAuthenticationFilter extends GenericFilterBean {

    RequestMatcher customFilterUrl = new AntPathRequestMatcher("/meeplo/api/v1/auth/**");

    private final MemberService memberService;
    private final JwtUtil jwtUtil;

    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain) throws IOException, ServletException {
        if(!customFilterUrl.matches((HttpServletRequest) request)) {
//        if(!((HttpServletRequest)request).getServletPath().startsWith("/meeplo/api/v1/auth/")) {
            String token = jwtUtil.resolveToken((HttpServletRequest) request);

            if(token == null || !jwtUtil.validateToken(token)) {
                throw new MeeploException(CommonErrorCode.WRONG_TOKEN);
            }

            Member member = memberService.getMemberById(jwtUtil.getUserIdFromToken(token));
            UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(member, null, member.getAuthority());
            SecurityContextHolder.getContext().setAuthentication(authenticationToken);
        }

//        logger.info("response -> " + response);
        chain.doFilter(request, response);
    }
}
