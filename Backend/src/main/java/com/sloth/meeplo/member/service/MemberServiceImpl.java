package com.sloth.meeplo.member.service;

import com.sloth.meeplo.global.util.ExternalAPIRequest;
import com.sloth.meeplo.member.dto.request.MemberRequest;
import com.sloth.meeplo.member.dto.response.MemberResponse;
import com.sloth.meeplo.member.entity.Member;
import com.sloth.meeplo.member.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.regex.Pattern;

@Service
@RequiredArgsConstructor
public class MemberServiceImpl implements MemberService {

    private final ExternalAPIRequest externalAPIRequest;
    private final MemberRepository memberRepository;

    @Override
    public MemberResponse.MemberToken getKakaoMemberToken(String authorization) {

        MemberRequest.MemberInfo memberInfo = null;
        Member member = null;

        // 추후 Exception Handling 관련 refactoring 필요
        try {
            if(Pattern.matches("^Bearer .*", authorization)) {
                System.out.println("Valid Token");
                memberInfo = externalAPIRequest.getKakaoMemberInfo(authorization);
                member = memberRepository.findByProviderAndProviderId(memberInfo.getProvider(), memberInfo.getProviderId()).orElse(null);
            } else {
                // 토큰이 "Bearer " 로 시작하지 않는 경우 -> Exception?
                System.out.println("Invalid Token");
            }
        } catch(IOException e) {
            e.printStackTrace();
        }

        boolean isNewMember = false;

        if(member == null) {
            member = memberInfo.toEntity();
            memberRepository.save(member);
            isNewMember = true;
        }

        // Jwt 관련 로직 추가

        return MemberResponse.MemberToken.builder()
                .accessToken("ACCESS_TOKEN")
                .refreshToken("REFRESH_TOKEN")
                .isNewMember(isNewMember)
                .build();
    }
}
