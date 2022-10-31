package com.sloth.meeplo.group.entity;

import com.sloth.meeplo.common.BaseTimeEntity;
import com.sloth.meeplo.group.dto.request.GroupRequest;
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
public class Group extends BaseTimeEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(length = 20)
    private String name;

    @Column(length = 200)
    private String description;

    private String groupPhoto;

    @OneToMany(mappedBy = "group", cascade = CascadeType.ALL)
    private List<GroupMember> groupMembers;

    @Builder
    public Group(String name, String description, String groupPhoto){
        this.name = name;
        this.description = description;
        this.groupPhoto = groupPhoto;
    }
}
