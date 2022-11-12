package com.sloth.meeplo.member.dto.request;

import com.sloth.meeplo.member.entity.Member;
import com.sloth.meeplo.recommendation.dto.common.Coordinate;
import lombok.*;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

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
        @NotBlank
        private String nickname;
        @NotBlank
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
        @NotBlank
        private String name;
        @NotBlank
        private String address;


        @Builder
        public MemberLocationAddInfo(String name, String address){
            this.name = name;
            this.address= address;
        }
    }
    @Getter
    @ToString
    @NoArgsConstructor
    public static class ConvertedCoordinate extends Coordinate {
        @Builder
        ConvertedCoordinate(Double lat, Double lng){
            super(lat, lng);
        }
    }

}
