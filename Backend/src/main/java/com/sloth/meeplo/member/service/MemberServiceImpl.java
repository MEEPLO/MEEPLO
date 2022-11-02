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
import com.sloth.meeplo.member.entity.MemberLocation;
import com.sloth.meeplo.member.repository.MemberLocationRepository;
import com.sloth.meeplo.member.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.regex.Pattern;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class MemberServiceImpl implements MemberService {

    private final ExternalAPIRequest externalAPIRequest;
    private final MemberRepository memberRepository;
    private final MemberLocationRepository memberLocationRepository;
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
        } else if (member.isUnactivated()) {
            member.activated();
//            memberRepository.save(member);
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

    @Override
    public MemberResponse.MemberDetail getMemberDetail(String authorization) {
        Member member = getMemberByAuthorization(authorization);
        return MemberResponse.MemberDetail.builder().member(member).build();
    }

    @Override
    public void updateMemberInfo(String authorization, MemberRequest.MemberUpdateInfo memberUpdateInfo) {
        Member member = getMemberByAuthorization(authorization);
        member.updateUsername(memberUpdateInfo.getNickname());
        member.updateProfilePhoto(memberUpdateInfo.getProfilePhoto());

        // TODO: 2022-11-02 save가 필요한가 확인
//        memberRepository.save(member);
    }

    @Override
    public void quitMember(String authorization) {
        Member member = getMemberByAuthorization(authorization);
        member.unactivated();

//        memberRepository.save(member);
    }

    @Override
    public List<MemberResponse.MemberDetailStartLocation> getMemberStartLocations(String authorization) {
        Member member = getMemberByAuthorization(authorization);
        return memberLocationRepository
                .findByMember(member).stream()
                .map(ml -> MemberResponse.MemberDetailStartLocation
                        .builder()
                        .memberLocation(ml)
                        .build()
                )
                .collect(Collectors.toList());
    }

    public Member getMemberByAuthorization(String authorization){
        return memberRepository.findById(jwtUtil.getUserIdFromToken(authorization))
                .orElseThrow(()-> new MeeploException(CommonErrorCode.NOT_EXIST_RESOURCE));
    }

    @Override
    public void addMemberStartLocation(String authorization, MemberRequest.MemberLocationAddInfo memberLocationAddInfo) {
        Member member = getMemberByAuthorization(authorization);
        memberLocationRepository.save(MemberLocation.builder()
                .memberLocationAddInfo(memberLocationAddInfo)
                .member(member)
                .build()
        );
    }

    @Override
    public void deleteMemberStartLocation(String authorization, Long id) {
        Member member = getMemberByAuthorization(authorization);
        if(memberLocationRepository.findById(id)
                .orElseThrow(()-> new MeeploException(CommonErrorCode.UNAUTHORIZED))
                .getMember().equals(member)){
            memberLocationRepository.deleteById(id);
        }
    }
}
