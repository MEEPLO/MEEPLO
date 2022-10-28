package com.sloth.meeplo.group.entity;

import com.sloth.meeplo.global.type.Role;
import com.sloth.meeplo.group.type.GroupMemberStatus;
import com.sloth.meeplo.member.entity.Member;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class GroupMember {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Role role;

    private GroupMemberStatus status;

    private String Nickname;

    @ManyToOne
    @JoinColumn(name = "group_id", referencedColumnName = "id")
    private Group group;

    @ManyToOne
    @JoinColumn(name = "member_id", referencedColumnName = "id")
    private Member member;
}
