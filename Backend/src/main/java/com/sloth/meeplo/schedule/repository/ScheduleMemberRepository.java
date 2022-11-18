package com.sloth.meeplo.schedule.repository;

import com.sloth.meeplo.member.entity.Member;
import com.sloth.meeplo.schedule.entity.Schedule;
import com.sloth.meeplo.schedule.entity.ScheduleMember;
import com.sloth.meeplo.schedule.type.ScheduleMemberStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ScheduleMemberRepository extends JpaRepository<ScheduleMember, Long> {

    Boolean existsByMemberAndScheduleAndStatus(Member member, Schedule schedule, ScheduleMemberStatus status);

    @Query(value = "select distinct sm from ScheduleMember sm where sm.schedule = :schedule")
    List<ScheduleMember> findBySchedule(@Param("schedule")Schedule schedule);

    @Query(value = "select distinct sm from ScheduleMember sm where sm.member = :member")
    List<ScheduleMember> findByMember(@Param("member")Member member);
}
