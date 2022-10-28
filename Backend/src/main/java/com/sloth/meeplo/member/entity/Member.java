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

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String username;

    private String profilePhoto;

    private String provider;
    private String providerId;

    @OneToMany(mappedBy = "member")
    private List<GroupMember> groupMembers;

    @OneToMany(mappedBy = "member")
    private List<ScheduleMember> scheduleMembers;

    @OneToMany(mappedBy = "member")
    private List<MemberLocation> memberLocations;

    @OneToMany(mappedBy = "member")
    private List<Moment> moments;

    @Builder(builderClassName = "OAuth2Register", builderMethodName = "oAuth2Register")
    public Member(String username, String profilePhoto, String provider, String providerId) {
        this.username = username;
        this.profilePhoto = profilePhoto;
        this.provider = provider;
        this.providerId = providerId;
    }
}
