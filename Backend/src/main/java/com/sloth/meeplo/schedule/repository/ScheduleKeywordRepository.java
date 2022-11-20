package com.sloth.meeplo.schedule.repository;

import com.sloth.meeplo.schedule.entity.Schedule;
import com.sloth.meeplo.schedule.entity.ScheduleKeyword;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.transaction.annotation.Transactional;

public interface ScheduleKeywordRepository extends JpaRepository<ScheduleKeyword, Long> {

    @Modifying
    @Transactional
    void deleteAllBySchedule(Schedule schedule);
}
