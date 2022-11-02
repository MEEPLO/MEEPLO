package com.sloth.meeplo.member.dto.request;

import com.sloth.meeplo.member.entity.Member;
import lombok.Builder;
import lombok.Getter;
import lombok.ToString;

// static inner class 지양 * 검색
public class MemberRequest {

    @Getter
    @ToString
    public static class MemberInfo {

        private String username;
        private String profilePhoto;
        private String provider;
        private String providerId;

        @Builder
        public MemberInfo(String username, String profilePhoto, String provider, String providerId) {
            this.username = username;
            this.profilePhoto = profilePhoto;
            this.provider = provider;
            this.providerId = providerId;
        }

        public Member toEntity() {
            return Member.builder()
                    .username(username)
                    .profilePhoto(profilePhoto)
                    .provider(provider)
                    .providerId(providerId)
                    .build();
        }
    }

    @Getter
    @ToString
    @Builder
    public static class MemberUpdateInfo{
        private String nickname;
        private String profilePhoto;

    }

}
