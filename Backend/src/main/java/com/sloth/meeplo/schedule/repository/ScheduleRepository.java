package com.sloth.meeplo.schedule.repository;

import com.sloth.meeplo.group.entity.Group;
import com.sloth.meeplo.schedule.entity.Schedule;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

public interface ScheduleRepository extends JpaRepository<Schedule, Long> {
    Optional<Schedule> findFirstByGroupOrderByIdDesc(Group group);
    Optional<Schedule> findFirstByGroupAndDateBeforeOrderByDateDesc(Group group, LocalDateTime date);

    List<Schedule> findByGroup(Group group);

    List<Schedule> findByGroupAndDateBetween(Group group, LocalDateTime start, LocalDateTime end);


}
