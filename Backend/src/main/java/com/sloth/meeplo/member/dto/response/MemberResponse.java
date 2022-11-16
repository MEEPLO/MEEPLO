package com.sloth.meeplo.member.dto.response;

import com.sloth.meeplo.member.entity.Member;
import com.sloth.meeplo.member.entity.MemberLocation;
import lombok.Builder;
import lombok.Getter;
import lombok.ToString;

import java.util.List;
import java.util.stream.Collectors;

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

    @ToString
    @Getter
    public static class MemberDetail{
        private Long id;
        private String nickname;
        private String profilePhoto;
        private List<MemberDetailStartLocation> startLocations;

        @Builder
        MemberDetail(Member member){
            this.id = member.getId();
            this.nickname = member.getUsername();
            this.profilePhoto = member.getProfilePhoto();
            this.startLocations = member.getMemberLocations()
                    .stream()
                    .map(ml -> MemberDetailStartLocation.builder()
                            .memberLocation(ml)
                            .build())
                    .collect(Collectors.toList());
        }
    }

    @ToString
    @Getter
    public static class MemberDetailStartLocation{
        private Long id;
        private String name;
        private Double lat;
        private Double lng;
        private String address;

        @Builder
        MemberDetailStartLocation(MemberLocation memberLocation){
            this.id = memberLocation.getId();
            this.name = memberLocation.getName();
            this.lat = memberLocation.getLat();
            this.lng = memberLocation.getLng();
            this.address = memberLocation.getAddress();
        }
    }


}
