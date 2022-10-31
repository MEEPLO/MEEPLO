package com.sloth.meeplo.member.entity;

import com.sloth.meeplo.common.BaseTimeEntity;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Member extends BaseTimeEntity {

    /**
     * 고유 ID
     */
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    /**
     * 닉네임
     */
    private String username;    // nickname

    /**
     * 프로필 사진
     */
    private String profilePhoto;

    /**
     * 로그인 수단
     * ex) kakao
     */
    private String provider;    // enum type

    /**
     * 로그인 수단에서의 고유 ID
     * ex) 2500345456
     */
    private String providerId;

    /**
     * 탈퇴 여부
     */
    private boolean isUnactivated;  // enum type

    @Builder
    public Member(String username, String profilePhoto, String provider, String providerId) {
        this.username = username;
        this.profilePhoto = profilePhoto;
        this.provider = provider;
        this.providerId = providerId;
    }
}
