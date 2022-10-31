package com.sloth.meeplo.member.service;

import com.sloth.meeplo.member.dto.response.MemberResponse;

public interface MemberService {

    MemberResponse.MemberToken getKakaoMemberToken(String token);

}
