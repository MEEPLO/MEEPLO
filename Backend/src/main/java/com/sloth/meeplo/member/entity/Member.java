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

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String username;

    private String profilePhoto;

    private String provider;
    private String providerId;

    @Builder(builderClassName = "OAuth2Register", builderMethodName = "oAuth2Register")
    public Member(String username, String profilePhoto, String provider, String providerId) {
        this.username = username;
        this.profilePhoto = profilePhoto;
        this.provider = provider;
        this.providerId = providerId;
    }
}
