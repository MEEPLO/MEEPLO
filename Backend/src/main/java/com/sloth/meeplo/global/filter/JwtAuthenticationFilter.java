package com.sloth.meeplo.global.filter;

import com.sloth.meeplo.global.exception.MeeploException;
import com.sloth.meeplo.global.exception.code.CommonErrorCode;
import com.sloth.meeplo.global.util.JwtUtil;
import com.sloth.meeplo.member.entity.Member;
import com.sloth.meeplo.member.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;
import org.springframework.security.web.util.matcher.RequestMatcher;
import org.springframework.web.filter.GenericFilterBean;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import java.io.IOException;

@RequiredArgsConstructor
public class JwtAuthenticationFilter extends GenericFilterBean {

    AuthenticationManager authenticationManager;
    MemberRepository memberRepository;

    RequestMatcher customFilterUrl = new AntPathRequestMatcher("/meeplo/api/v1/auth/**");

    private final JwtUtil jwtUtil;

    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain) throws IOException, ServletException {
        if(!customFilterUrl.matches((HttpServletRequest) request)) {
            String token = jwtUtil.resolveToken((HttpServletRequest) request);

            if(token == null || !jwtUtil.validateToken(token)) {
                throw new MeeploException(CommonErrorCode.WRONG_TOKEN);
            }

            Member member = memberRepository.findById(jwtUtil.getUserIdFromToken(token)).orElseThrow(() -> new MeeploException(CommonErrorCode.MEMBER_NOT_FOUND));
            UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(member, null);
            Authentication authentication = authenticationManager.authenticate(authenticationToken);
            SecurityContextHolder.getContext().setAuthentication(authentication);
        }
        chain.doFilter(request, response);
    }
}
