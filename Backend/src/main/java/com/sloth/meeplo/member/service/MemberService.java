package com.sloth.meeplo.member.service;

import com.sloth.meeplo.member.dto.response.MemberResponse;
import com.sloth.meeplo.member.entity.Member;

public interface MemberService {

    Member getMemberById(long id);
    MemberResponse.MemberToken getKakaoMemberToken(String token);

}
