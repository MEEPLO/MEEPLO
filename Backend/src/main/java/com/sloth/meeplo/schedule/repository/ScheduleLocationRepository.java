package com.sloth.meeplo.schedule.repository;

import com.sloth.meeplo.schedule.entity.Schedule;
import com.sloth.meeplo.schedule.entity.ScheduleLocation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;

public interface ScheduleLocationRepository extends JpaRepository<ScheduleLocation, Long> {

    @Modifying(clearAutomatically = true, flushAutomatically = true)
    void deleteAllBySchedule(Schedule schedule);
}
