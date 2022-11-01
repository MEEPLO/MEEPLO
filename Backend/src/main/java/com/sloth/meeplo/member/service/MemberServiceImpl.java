package com.sloth.meeplo.member.service;

import com.sloth.meeplo.global.exception.MeeploException;
import com.sloth.meeplo.global.exception.code.CommonErrorCode;
import com.sloth.meeplo.global.type.TokenType;
import com.sloth.meeplo.global.util.ExternalAPIRequest;
import com.sloth.meeplo.global.util.JwtUtil;
import com.sloth.meeplo.global.util.RedisUtil;
import com.sloth.meeplo.member.dto.request.MemberRequest;
import com.sloth.meeplo.member.dto.response.MemberResponse;
import com.sloth.meeplo.member.entity.Member;
import com.sloth.meeplo.member.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.regex.Pattern;

@Service
@RequiredArgsConstructor
public class MemberServiceImpl implements MemberService {

    private final ExternalAPIRequest externalAPIRequest;
    private final MemberRepository memberRepository;
    private final JwtUtil jwtUtil;
    private final RedisUtil redisUtil;

    @Override
    public MemberResponse.MemberToken getKakaoMemberToken(String authorization) {

        MemberRequest.MemberInfo memberInfo = null;
        Member member = null;

        if(Pattern.matches("^Bearer .*", authorization)) {
            memberInfo = externalAPIRequest.getKakaoMemberInfo(authorization);
            member = memberRepository.findByProviderAndProviderId(memberInfo.getProvider(), memberInfo.getProviderId()).orElse(null);
        } else {
            throw new MeeploException(CommonErrorCode.WRONG_TOKEN);
        }

        boolean isNewMember = false;

        if(member == null) {
            member = memberInfo.toEntity();
            memberRepository.save(member);
            isNewMember = true;
        }

        String accessToken = jwtUtil.generateJwtToken(member, TokenType.ACCESS_TOKEN);
        String refreshToken = jwtUtil.generateJwtToken(member, TokenType.REFRESH_TOKEN);
        redisUtil.setDataWithExpiration(member.getId().toString(), refreshToken, TokenType.REFRESH_TOKEN.getExpiration());

        return MemberResponse.MemberToken.builder()
                .accessToken(accessToken)
                .refreshToken(refreshToken)
                .isNewMember(isNewMember)
                .build();
    }
}
