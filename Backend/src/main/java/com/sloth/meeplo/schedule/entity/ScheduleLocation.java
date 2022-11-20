package com.sloth.meeplo.schedule.entity;

import com.sloth.meeplo.location.entity.Location;
import com.sloth.meeplo.moment.entity.Moment;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.List;
import java.util.Set;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class ScheduleLocation {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "schedule_id", referencedColumnName = "id")
    private Schedule schedule;

    @ManyToOne
    @JoinColumn(name = "location_id", referencedColumnName = "id")
    private Location location;

    @OneToMany(mappedBy = "scheduleLocation", cascade = CascadeType.ALL)
    private Set<Moment> moments;

    @Builder(builderClassName = "EmptyScheduleLocation",builderMethodName = "EmptyScheduleLocation")
    ScheduleLocation(Location location){
        this.location = location;
    }

    @Builder(builderClassName = "createScheduleLocation",builderMethodName = "createScheduleLocation")
    ScheduleLocation(Schedule schedule, Location location){
        this.schedule = schedule;
        this.location = location;
    }
}
