package com.sloth.meeplo.member.controller;

import com.sloth.meeplo.member.dto.request.MemberRequest;
import com.sloth.meeplo.member.dto.response.MemberResponse;
import com.sloth.meeplo.member.service.MemberService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

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
    public ResponseEntity<MemberResponse.MemberToken> getAppTokenForKakaoLogin(@RequestHeader("Authorization") String authorization) {
        MemberResponse.MemberToken memberToken = memberService.getKakaoMemberToken(authorization);

        return new ResponseEntity<>(memberToken, HttpStatus.OK);
    }

    @GetMapping("/member")
    public ResponseEntity<Map<String, Object>> getMemberDetail(@RequestHeader("Authorization") String authorization){
        Map<String, Object> resultMap = new HashMap<>();
        resultMap.put("memberDetail", memberService.getMemberDetail(authorization));
        return new ResponseEntity<Map<String, Object>>(resultMap, HttpStatus.OK);
    }

    @PutMapping("/member")
    public ResponseEntity<Void> updateMemberInfo(@RequestHeader("Authorization") String authorization, @RequestBody MemberRequest.MemberUpdateInfo memberUpdateInfo){
        memberService.updateMemberInfo(authorization,memberUpdateInfo);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @DeleteMapping("/member")
    public ResponseEntity<Void> quitMember(@RequestHeader("Authorization") String authorization){
        memberService.quitMember(authorization);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping("/member/location")
    public ResponseEntity<Map<String, List>> getMemberStartLocations(@RequestHeader("Authorization") String authorization){
        Map<String, List> resultMap = new HashMap<>();
        resultMap.put("startLocations", memberService.getMemberStartLocations(authorization));
        return new ResponseEntity<>(resultMap, HttpStatus.OK);
    }

    @PostMapping("/member/location")
    public ResponseEntity<Void> addMemberStartLocation(@RequestHeader("Authorization") String authorization, @RequestBody MemberRequest.MemberLocationAddInfo memberLocationAddInfo){
        memberService.addMemberStartLocation(authorization,memberLocationAddInfo);
        return new ResponseEntity<>(HttpStatus.OK);
    }

}
