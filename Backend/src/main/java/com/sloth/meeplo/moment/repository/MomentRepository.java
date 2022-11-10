package com.sloth.meeplo.moment.repository;

import com.sloth.meeplo.moment.entity.Moment;
import com.sloth.meeplo.schedule.entity.ScheduleLocation;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface MomentRepository extends JpaRepository<Moment, Long> {

    List<Moment> findByScheduleLocation(ScheduleLocation scheduleLocation);


}
