package com.sloth.meeplo.member.service;

import com.sloth.meeplo.member.dto.request.MemberRequest;
import com.sloth.meeplo.member.dto.response.MemberResponse;
import com.sloth.meeplo.member.entity.Member;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;

import java.util.List;

public interface MemberService {

    MemberResponse.MemberToken getKakaoMemberToken(String token);

    MemberResponse.MemberDetail getMemberDetail(String authorization);

    void updateMemberInfo(String authorization, MemberRequest.MemberUpdateInfo memberUpdateInfo);

    void quitMember(String authorization);

    List<MemberResponse.MemberDetailStartLocation> getMemberStartLocations(String authorization);

    Member getMemberByAuthorization(String authorization);
}
