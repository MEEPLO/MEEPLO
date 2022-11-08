package com.sloth.meeplo.moment.repository;

import com.sloth.meeplo.moment.entity.Moment;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MomentRepository extends JpaRepository<Moment, Long> {
}
