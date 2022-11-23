package com.sloth.meeplo.member.repository;

import com.sloth.meeplo.member.entity.Member;
import com.sloth.meeplo.member.entity.MemberLocation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface MemberLocationRepository extends JpaRepository<MemberLocation, Long> {

    List<MemberLocation> findByMember(Member member);

    Optional<MemberLocation> findByMemberAndDefaultLocation(Member member, Boolean defaultLocation);

    Boolean existsByMember(Member member);


    @Query(value = "select distinct ml from MemberLocation ml where ml.member = :member and ml.defaultLocation = :defaultLocation")
    Optional<MemberLocation> findOneByMemberAndDefaultLocation(@Param("member")Member member, @Param("defaultLocation")Boolean defaultLocation);
}
