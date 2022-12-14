package com.sloth.meeplo.moment.entity;

import com.sloth.meeplo.common.BaseTimeEntity;
import com.sloth.meeplo.global.exception.MeeploException;
import com.sloth.meeplo.member.entity.Member;
import com.sloth.meeplo.moment.dto.request.MomentRequest;
import com.sloth.meeplo.moment.exception.code.MomentErrorCode;
import com.sloth.meeplo.moment.type.MomentType;
import com.sloth.meeplo.schedule.entity.ScheduleLocation;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.Set;

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

    @ManyToMany(cascade = {CascadeType.PERSIST, CascadeType.DETACH})
    @JoinTable(name = "MomentReaction",
            joinColumns = @JoinColumn(name="moment_id"),
            inverseJoinColumns = @JoinColumn(name="member_id")
    )
    private Set<Member> momentReactions;

    @OneToMany(mappedBy = "moment", cascade = CascadeType.ALL)
    private Set<MomentComment> momentComments;

    @Builder
    public Moment(MomentRequest.CreateMomentInfo createMomentInfo, Member member, ScheduleLocation scheduleLocation){
        this.momentPhoto = createMomentInfo.getPhotoUrl();
        this.member = member;
        if(MomentType.values().length<=createMomentInfo.getType()) throw new MeeploException(MomentErrorCode.NO_MOMENT_TYPE);
        this.type = MomentType.values()[createMomentInfo.getType()];
        this.scheduleLocation = scheduleLocation;
    }

    @Override
    public boolean equals(Object x) {
        if(!(x instanceof Moment))
            return false;
        Moment m = ((Moment)x);

        return Objects.equals(this.id, m.id);
    }

    @Override
    public int hashCode() {
        return id.hashCode();
    }
}
