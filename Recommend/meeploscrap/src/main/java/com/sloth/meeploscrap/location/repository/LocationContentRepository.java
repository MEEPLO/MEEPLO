package com.sloth.meeploscrap.location.repository;

import com.sloth.meeploscrap.location.entity.LocationContent;
import org.springframework.data.jpa.repository.JpaRepository;

public interface LocationContentRepository extends JpaRepository<LocationContent, Long> {
}
