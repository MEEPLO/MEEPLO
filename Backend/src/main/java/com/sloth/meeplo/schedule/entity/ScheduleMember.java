package com.sloth.meeplo.schedule.entity;

import com.sloth.meeplo.common.GeoDataEntity;
import com.sloth.meeplo.group.dto.response.GroupResponse;
import com.sloth.meeplo.member.entity.Member;
import com.sloth.meeplo.global.type.Role;
import com.sloth.meeplo.member.entity.MemberLocation;
import com.sloth.meeplo.schedule.type.ScheduleMemberStatus;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.Objects;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class ScheduleMember extends GeoDataEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Role role;

    private ScheduleMemberStatus status;

    @ManyToOne
    @JoinColumn(name = "schedule_id", referencedColumnName = "id")
    private Schedule schedule;

    @ManyToOne
    @JoinColumn(name = "member_id", referencedColumnName = "id")
    private Member member;

    public void unactivateStatus(){
        this.status = ScheduleMemberStatus.UNACTIVATED;
    }
    public void joinStatus(){
        this.status = ScheduleMemberStatus.JOINED;
    }

    @Builder
    ScheduleMember(Schedule schedule, Member member, Role role, MemberLocation memberLocation){
        this.status = ScheduleMemberStatus.JOINED;
        this.role = role;
        this.schedule = schedule;
        this.member = member;
        this.address = memberLocation.getAddress();
        this.lat = memberLocation.getLat();
        this.lng = memberLocation.getLng();
    }

    @Override
    public boolean equals(Object x) {
        if(!(x instanceof ScheduleMember))
            return false;
        ScheduleMember sm = ((ScheduleMember)x);

        return Objects.equals(this.id, sm.id)
                && this.getSchedule().getId().equals(sm.getSchedule().getId())
                && this.getMember().getId().equals(sm.getMember().getId());
    }

    @Override
    public int hashCode() {
        return id.hashCode();
    }
}
