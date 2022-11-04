package com.sloth.meeplo.schedule.repository;

import com.sloth.meeplo.schedule.entity.ScheduleMember;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ScheduleMemberRepository extends JpaRepository<ScheduleMember, Long> {
}
