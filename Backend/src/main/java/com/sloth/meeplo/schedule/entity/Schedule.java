package com.sloth.meeplo.schedule.entity;

import com.sloth.meeplo.common.BaseTimeEntity;
import com.sloth.meeplo.group.entity.Group;
import com.sloth.meeplo.location.entity.Location;
import lombok.*;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@ToString
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

    @ManyToOne
    @JoinColumn(name = "location_id", referencedColumnName = "id")
    private Location location;

    @OneToMany(mappedBy = "schedule")
    private List<ScheduleMember> scheduleMembers;

    @OneToMany(mappedBy = "schedule")
    private List<ScheduleLocation> scheduleLocations;

    @ManyToMany(cascade = CascadeType.ALL)
    @JoinTable(name = "ScheduleKeywordRelaction",
            joinColumns = @JoinColumn(name="schedule_id"),
            inverseJoinColumns = @JoinColumn(name="schedule_keyword_id")
    )
    private List<ScheduleKeyword> scheduleKeywords = new ArrayList<>();

    @Builder(builderClassName = "EmptyBuilder",builderMethodName = "EmptyBuilder")
    Schedule(LocalDateTime date){
        this.date = date;
    }

    @Builder(builderClassName = "CreateSchedule",builderMethodName = "CreateSchedule")
    Schedule(LocalDateTime date, String name, Group group, Location location){
        this.date = date;
        this.name =name;
        this.group = group;
        this.location = location;

    }
}
