package com.sloth.meeplo.schedule.repository;

import com.sloth.meeplo.group.entity.Group;
import com.sloth.meeplo.schedule.entity.Schedule;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ScheduleRepository extends JpaRepository<Schedule, Long> {
    Optional<Schedule> findFirstByGroupOrderByIdDesc(Group group);
}