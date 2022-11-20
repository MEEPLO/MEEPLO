package com.sloth.meeplo.group.repository;

import com.sloth.meeplo.group.entity.Group;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface GroupRepository extends JpaRepository<Group, Long> {
    Optional<Group> findByEnterCode(String enterCode);
}
