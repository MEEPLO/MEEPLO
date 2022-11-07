package com.sloth.meeplo.schedule.entity;

import com.sloth.meeplo.common.GeoDataEntity;
import com.sloth.meeplo.member.entity.Member;
import com.sloth.meeplo.global.type.Role;
import com.sloth.meeplo.schedule.type.ScheduleMemberStatus;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

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

    @Builder
    ScheduleMember(Schedule schedule, Member member, Role role){
//          해당 약속의 Leader / Member 를 구분한다.
        if(role.equals(Role.LEADER)){
            this.role = Role.LEADER;
            this.status = ScheduleMemberStatus.JOINED;
        }else{
            this.role = Role.MEMBER;
            this.status = ScheduleMemberStatus.PENDING;
        }
        this.schedule = schedule;
        this.member = member;
    }
}
