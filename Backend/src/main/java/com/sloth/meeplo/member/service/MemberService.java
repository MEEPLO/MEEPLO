package com.sloth.meeplo.member.service;

import com.sloth.meeplo.member.dto.request.MemberRequest;
import com.sloth.meeplo.member.dto.response.MemberResponse;
import com.sloth.meeplo.member.entity.Member;
import com.sloth.meeplo.member.entity.MemberLocation;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestHeader;
import springfox.documentation.annotations.ApiIgnore;

import java.util.List;

public interface MemberService {

    Member getMemberById(long id);

    MemberResponse.MemberToken getKakaoMemberToken(String token);

    MemberResponse.MemberToken refreshMemberToken(String authorization, String refresh);

    MemberResponse.MemberDetail getMemberDetail(String authorization);

    void updateMemberInfo(String authorization, MemberRequest.MemberUpdateInfo memberUpdateInfo);

    void quitMember(String authorization);

    List<MemberResponse.MemberDetailStartLocation> getMemberStartLocations(String authorization);

    Member getMemberByAuthorization(String authorization);

    void addMemberStartLocation(String authorization, MemberRequest.MemberLocationAddInfo memberLocationAddInfo);

    void deleteMemberStartLocation(String authorization, Long id);

    void updateMemberDefaultLocation(String authorization,  Long id);

    MemberLocation findMemberLocationByMember(Member member);
}
