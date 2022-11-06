package com.sloth.meeplo.moment.repository;

import com.sloth.meeplo.moment.entity.MomentComment;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MomentCommentRepository extends JpaRepository<MomentComment, Long> {
}
