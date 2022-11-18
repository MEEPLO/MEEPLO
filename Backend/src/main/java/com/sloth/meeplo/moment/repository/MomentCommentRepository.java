package com.sloth.meeplo.moment.repository;

import com.sloth.meeplo.member.entity.Member;
import com.sloth.meeplo.moment.entity.Moment;
import com.sloth.meeplo.moment.entity.MomentComment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface MomentCommentRepository extends JpaRepository<MomentComment, Long> {

    Boolean existsByMemberAndMoment(Member member, Moment moment);


    @Query(value = "select distinct mc from MomentComment mc where mc.moment.id = :momentId")
    List<MomentComment> findByMomentId(@Param("momentId")Long momentId);
}
