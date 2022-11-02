package com.sloth.meeplo.member.controller;

import com.sloth.meeplo.global.util.JwtUtil;
import com.sloth.meeplo.member.dto.response.MemberResponse;
import com.sloth.meeplo.member.entity.Member;
import com.sloth.meeplo.member.service.MemberService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("meeplo/api/v1")
public class MemberController {

    private final MemberService memberService;
    private final JwtUtil jwtUtil;

    /**
     * @param authorization 카카오에서 발급한 토큰
     * @return : accessToken, refreshToken, 신규 회원 여부
     */
    @GetMapping("/auth/kakao")
    public ResponseEntity<MemberResponse.MemberToken> getAppTokenForKakaoLogin(@RequestHeader("Authorization") String authorization) {
        MemberResponse.MemberToken memberToken = memberService.getKakaoMemberToken(authorization);

        return new ResponseEntity<>(memberToken, HttpStatus.OK);
    }

}
