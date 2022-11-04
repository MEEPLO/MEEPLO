package com.sloth.meeplo.schedule.repository;

import com.sloth.meeplo.schedule.entity.ScheduleLocation;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ScheduleLocationRepository extends JpaRepository<ScheduleLocation, Long> {
}
