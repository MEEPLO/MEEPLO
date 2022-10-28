package com.sloth.meeplo.moment.entity;

import com.sloth.meeplo.common.BaseTimeEntity;
import com.sloth.meeplo.member.entity.Member;
import com.sloth.meeplo.moment.type.MomentType;
import com.sloth.meeplo.schedule.entity.ScheduleLocation;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Moment extends BaseTimeEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String momentPhoto;

    private MomentType type;

    @ManyToOne
    @JoinColumn(name = "scheduleLocation_id", referencedColumnName = "id")
    private ScheduleLocation scheduleLocation;

    @ManyToOne
    @JoinColumn(name = "member_id", referencedColumnName = "id")
    private Member member;

    @ManyToMany
    @JoinTable(name = "MomentReaction",
            joinColumns = @JoinColumn(name="moment_id"),
            inverseJoinColumns = @JoinColumn(name="member_id")
    )
    private List<Member> members = new ArrayList<>();
}
