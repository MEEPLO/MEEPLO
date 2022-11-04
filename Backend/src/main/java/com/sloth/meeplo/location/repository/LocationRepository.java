package com.sloth.meeplo.location.repository;

import com.sloth.meeplo.location.entity.Location;
import org.springframework.data.jpa.repository.JpaRepository;

public interface LocationRepository extends JpaRepository<Location, Long> {
}
