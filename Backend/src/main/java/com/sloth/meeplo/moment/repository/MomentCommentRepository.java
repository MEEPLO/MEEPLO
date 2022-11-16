package com.sloth.meeplo.moment.repository;

import com.sloth.meeplo.member.entity.Member;
import com.sloth.meeplo.moment.entity.Moment;
import com.sloth.meeplo.moment.entity.MomentComment;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MomentCommentRepository extends JpaRepository<MomentComment, Long> {

    Boolean existsByMemberAndMoment(Member member, Moment moment);
}
