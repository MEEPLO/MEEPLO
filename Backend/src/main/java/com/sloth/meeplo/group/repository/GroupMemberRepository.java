package com.sloth.meeplo.group.repository;

import com.sloth.meeplo.global.type.Role;
import com.sloth.meeplo.group.entity.Group;
import com.sloth.meeplo.group.entity.GroupMember;
import com.sloth.meeplo.group.type.GroupMemberStatus;
import com.sloth.meeplo.member.entity.Member;
import com.sloth.meeplo.schedule.entity.ScheduleMember;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface GroupMemberRepository extends JpaRepository<GroupMember, Long> {

    Optional<GroupMember> findByGroupAndMemberAndStatus(Group group, Member member, GroupMemberStatus groupMemberStatus);

    List<GroupMember> findByMemberAndStatus(Member member, GroupMemberStatus groupMemberStatus);

    List<GroupMember> findByGroupAndStatus(Group group, GroupMemberStatus groupMemberStatus);

    Integer countByGroupAndStatus(Group group, GroupMemberStatus groupMemberStatus);

    Optional<GroupMember> findByGroupAndRoleAndStatus(Group group, Role role, GroupMemberStatus groupMemberStatus);

    Optional<GroupMember> findByGroupAndMember(Group group, Member member);

    Boolean existsByMemberAndGroupAndStatus(Member member, Group group, GroupMemberStatus groupMemberStatus);

    @Query(value = "select distinct gm from GroupMember gm where gm.member = :member")
    List<GroupMember> findByMember(@Param("member")Member member);

}
