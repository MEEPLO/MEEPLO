package com.sloth.meeploscrap.location.repository;

import com.sloth.meeploscrap.location.entity.LocationKeyword;
import org.springframework.data.jpa.repository.JpaRepository;

public interface LocationKeywordRepository extends JpaRepository<LocationKeyword, Long> {
}
