package com.sloth.meeplo.schedule.entity;

import com.sloth.meeplo.common.BaseTimeEntity;
import com.sloth.meeplo.group.entity.Group;
import com.sloth.meeplo.location.entity.Location;
import com.sloth.meeplo.schedule.dto.request.ScheduleRequest;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Schedule extends BaseTimeEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private LocalDateTime date;

    @Column(length = 20)
    private String name;

    @ManyToOne
    @JoinColumn(name = "group_id", referencedColumnName = "id")
    private Group group;

    @OneToOne
    @JoinColumn(name = "location_id", referencedColumnName = "id")
    private Location location;

    @OneToMany(mappedBy = "schedule")
    private List<ScheduleMember> scheduleMembers;

    @OneToMany(mappedBy = "schedule")
    private List<ScheduleLocation> scheduleLocations;

    @Builder(builderMethodName = "EmptyBuilder")
    Schedule(LocalDateTime date){
        this.date = date;
    }

    @Builder(builderMethodName = "CreateSchedule")
    Schedule(ScheduleRequest.ScheduleCreateInput scheduleCreateInput){

    }
}
