package com.sloth.meeplo.member.repository;

import com.sloth.meeplo.member.entity.Member;
import com.sloth.meeplo.member.entity.MemberLocation;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface MemberLocationRepository extends JpaRepository<MemberLocation, Long> {

    List<MemberLocation> findByMember(Member member);
}
