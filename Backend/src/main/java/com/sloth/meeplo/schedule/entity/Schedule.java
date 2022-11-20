package com.sloth.meeplo.schedule.entity;

import com.sloth.meeplo.common.BaseTimeEntity;
import com.sloth.meeplo.group.entity.Group;
import com.sloth.meeplo.location.entity.Location;
import lombok.*;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.Set;

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

    @OneToMany(mappedBy = "schedule", cascade = CascadeType.ALL)
    private Set<ScheduleMember> scheduleMembers;

    @OneToMany(mappedBy = "schedule", cascade = CascadeType.ALL)
    private Set<ScheduleLocation> scheduleLocations;

    @OneToMany(mappedBy = "schedule",cascade = CascadeType.ALL)
    private Set<ScheduleKeyword> scheduleKeywords;

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

    public void updateDate(LocalDateTime date) {
        this.date = date;
    }

    public void updateLocation(Location location) {
        this.location = location;
    }

    public void updateName(String name) {
        this.name = name;
    }
}
