package com.sloth.meeplo.global.filter;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import com.sloth.meeplo.global.exception.MeeploException;
import com.sloth.meeplo.global.exception.code.CommonErrorCode;
import com.sloth.meeplo.global.exception.code.ErrorCode;
import com.sloth.meeplo.global.exception.dto.ErrorResponse;
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
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@Component
@RequiredArgsConstructor
public class JwtAuthenticationFilter extends GenericFilterBean {

    RequestMatcher customFilterUrl = new AntPathRequestMatcher("/meeplo/api/v1/auth/**");
    RequestMatcher authRequiredUrl = new AntPathRequestMatcher("/meeplo/api/v1/**");

    private final MemberService memberService;
    private final JwtUtil jwtUtil;

    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain) throws IOException, ServletException {
        if(authRequiredUrl.matches((HttpServletRequest) request) && !customFilterUrl.matches((HttpServletRequest) request)) {
            String token = null;
            try {
                token = jwtUtil.resolveToken((HttpServletRequest) request);
                if(!jwtUtil.validateToken(token)) throw new MeeploException(CommonErrorCode.WRONG_TOKEN);   // 중복
                Member member = memberService.getMemberById(jwtUtil.getUserIdFromToken(token));
                UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(member, null, member.getAuthority());
                SecurityContextHolder.getContext().setAuthentication(authenticationToken);
                chain.doFilter(request, response);
                return;
            } catch(MeeploException e) {
                logger.error(e.getMessage());
                ErrorCode errorCode = CommonErrorCode.WRONG_TOKEN;
                ObjectMapper mapper = new ObjectMapper();
                String jsonString = mapper.registerModule(new JavaTimeModule()).writeValueAsString(ErrorResponse.builder().name(errorCode.name()).message(errorCode.getMessage()).build());
                response.setContentType("application/json");
                response.setCharacterEncoding("UTF-8");
                response.getWriter().write(jsonString);
                ((HttpServletResponse)response).setStatus(HttpServletResponse.SC_UNAUTHORIZED);
                return;
            } catch (Exception e) {
                e.printStackTrace();
            }
        }

        chain.doFilter(request, response);
    }
}
