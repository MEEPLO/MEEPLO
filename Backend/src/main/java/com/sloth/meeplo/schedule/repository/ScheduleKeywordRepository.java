package com.sloth.meeplo.schedule.repository;

import com.sloth.meeplo.schedule.entity.ScheduleKeyword;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ScheduleKeywordRepository extends JpaRepository<ScheduleKeyword, Long> {
}
