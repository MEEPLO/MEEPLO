package com.sloth.meeplo.member.controller;

import com.sloth.meeplo.member.dto.response.MemberResponse;
import com.sloth.meeplo.member.service.MemberService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;

@Controller
@RequiredArgsConstructor
public class MemberController {

    private final MemberService memberService;

    /**
     * @param authorization 카카오에서 발급한 토큰
     * @return : accessToken, refreshToken, 신규 회원 여부
     */
    @GetMapping("/kakao/token")
    public ResponseEntity<MemberResponse.MemberToken> getAppTokenForKakaoLogin(@RequestHeader("Authorization") String authorization) {
        MemberResponse.MemberToken memberToken = memberService.getKakaoMemberToken(authorization);

        return new ResponseEntity<>(memberToken, HttpStatus.OK);
    }

}
