package com.sloth.meeplo.schedule.repository;

import com.sloth.meeplo.group.entity.GroupMember;
import com.sloth.meeplo.member.entity.Member;
import com.sloth.meeplo.schedule.entity.Schedule;
import com.sloth.meeplo.schedule.entity.ScheduleLocation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ScheduleLocationRepository extends JpaRepository<ScheduleLocation, Long> {

    @Modifying(clearAutomatically = true, flushAutomatically = true)
    void deleteAllBySchedule(Schedule schedule);

    @Query(value = "select distinct sl from ScheduleLocation sl where sl.schedule = :schedule")
    List<ScheduleLocation> findBySchedule(@Param("schedule") Schedule schedule);
}
