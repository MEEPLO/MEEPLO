package com.sloth.meeplo.member.dto.request;

import com.sloth.meeplo.member.entity.Member;
import lombok.*;

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
    @NoArgsConstructor
    public static class MemberUpdateInfo{
        private String nickname;
        private String profilePhoto;

        @Builder
        public MemberUpdateInfo(String nickname, String profilePhoto){
            this.nickname = nickname;
            this.profilePhoto = profilePhoto;
        }

    }

    @Getter
    @ToString
    @NoArgsConstructor
    public static class MemberLocationAddInfo{
        private String name;
        private String address;
        private Double lat;
        private Double lng;

        @Builder
        public MemberLocationAddInfo(String name, String address, Double lat, Double lng){
            this.name = name;
            this.address= address;
            this.lat=lat;
            this.lng=lng;
        }
    }

}
