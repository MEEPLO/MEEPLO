package com.sloth.meeplo.member.entity;

import com.sloth.meeplo.common.BaseTimeEntity;
import com.sloth.meeplo.group.entity.GroupMember;
import com.sloth.meeplo.moment.entity.Moment;
import com.sloth.meeplo.schedule.entity.ScheduleMember;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.List;

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


    @OneToMany(mappedBy = "member")
    private List<GroupMember> groupMembers;

    @OneToMany(mappedBy = "member")
    private List<ScheduleMember> scheduleMembers;

    @OneToMany(mappedBy = "member")
    private List<MemberLocation> memberLocations;

    @OneToMany(mappedBy = "member")
    private List<Moment> moments;


    @Builder
    public Member(String username, String profilePhoto, String provider, String providerId) {
        this.username = username;
        this.profilePhoto = profilePhoto;
        this.provider = provider;
        this.providerId = providerId;
    }
}