package com.sloth.meeplo.schedule.repository;

import com.sloth.meeplo.member.entity.Member;
import com.sloth.meeplo.schedule.entity.Schedule;
import com.sloth.meeplo.schedule.entity.ScheduleMember;
import com.sloth.meeplo.schedule.type.ScheduleMemberStatus;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ScheduleMemberRepository extends JpaRepository<ScheduleMember, Long> {

    Boolean existsByMemberAndScheduleAndStatus(Member member, Schedule schedule, ScheduleMemberStatus status);
}
