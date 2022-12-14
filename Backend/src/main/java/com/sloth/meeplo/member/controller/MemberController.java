package com.sloth.meeplo.member.controller;

import com.sloth.meeplo.member.dto.request.MemberRequest;
import com.sloth.meeplo.member.dto.response.MemberResponse;
import com.sloth.meeplo.member.service.MemberService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import springfox.documentation.annotations.ApiIgnore;

import javax.validation.Valid;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("meeplo/api/v1")
public class MemberController {

    private final MemberService memberService;

    /**
     * @param authorization 카카오에서 발급한 토큰
     * @return : accessToken, refreshToken, 신규 회원 여부
     */
    @GetMapping("/auth/kakao")
    public ResponseEntity<MemberResponse.MemberToken> getAppTokenForKakaoLogin(@ApiIgnore @RequestHeader(value = "Authorization", required = false) String authorization) {
        MemberResponse.MemberToken memberToken = memberService.getKakaoMemberToken(authorization);

        return new ResponseEntity<>(memberToken, HttpStatus.OK);
    }

    @GetMapping("/auth/refresh")
    public ResponseEntity<MemberResponse.MemberToken> refreshTokens(@ApiIgnore @RequestHeader("Authorization") String authorization, @ApiIgnore @RequestHeader("Refresh") String refresh) {
        log.info("refresh 토큰 받는 컨트롤러입니다.");
        log.info(refresh);
        MemberResponse.MemberToken memberToken = memberService.refreshMemberToken(authorization, refresh);
        return new ResponseEntity<>(memberToken, HttpStatus.OK);
    }

    @GetMapping("/member")
    public ResponseEntity<MemberResponse.MemberDetail> getMemberDetail(@ApiIgnore @RequestHeader("Authorization") String authorization){
        return new ResponseEntity<>(memberService.getMemberDetail(authorization), HttpStatus.OK);
    }

    @PutMapping("/member")
    public ResponseEntity<Void> updateMemberInfo(@ApiIgnore @RequestHeader("Authorization") String authorization,
                                                 @RequestBody @Valid MemberRequest.MemberUpdateInfo memberUpdateInfo){
        memberService.updateMemberInfo(authorization,memberUpdateInfo);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @DeleteMapping("/member")
    public ResponseEntity<Void> quitMember(@ApiIgnore @RequestHeader("Authorization") String authorization){
        memberService.quitMember(authorization);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping("/member/location")
    public ResponseEntity<Map<String, List>> getMemberStartLocations(@ApiIgnore @RequestHeader("Authorization") String authorization){
        Map<String, List> resultMap = new HashMap<>();
        resultMap.put("startLocations", memberService.getMemberStartLocations(authorization));
        return new ResponseEntity<>(resultMap, HttpStatus.OK);
    }

    @PostMapping("/member/location")
    public ResponseEntity<Void> addMemberStartLocation(@RequestHeader("Authorization") String authorization,
                                                       @RequestBody @Valid MemberRequest.MemberLocationAddInfo memberLocationAddInfo){
        memberService.addMemberStartLocation(authorization,memberLocationAddInfo);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @DeleteMapping("/member/location/{id}")
    public ResponseEntity<Void> deleteMemberStartLocation(@RequestHeader("Authorization") String authorization, @PathVariable Long id){
        memberService.deleteMemberStartLocation(authorization,id);
        return new ResponseEntity<>(HttpStatus.OK);
    }


    @GetMapping("/member/defaultlocation/{id}")
    public ResponseEntity<Void> updateMemberDefaultLocation(@ApiIgnore @RequestHeader("Authorization") String authorization, @PathVariable Long id){
        memberService.updateMemberDefaultLocation(authorization, id);
        return new ResponseEntity<>(HttpStatus.OK);
    }

}
