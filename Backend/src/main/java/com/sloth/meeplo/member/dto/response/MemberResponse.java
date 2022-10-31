package com.sloth.meeplo.member.dto.response;

import lombok.Builder;
import lombok.Getter;
import lombok.ToString;

public class MemberResponse {

    @Getter
    @ToString
    public static class MemberToken {

        private String accessToken;
        private String refreshToken;
        private boolean isNewMember;

        @Builder
        public MemberToken(String accessToken, String refreshToken, boolean isNewMember) {
            this.accessToken = accessToken;
            this.refreshToken = refreshToken;
            this.isNewMember = isNewMember;
        }
    }
}
