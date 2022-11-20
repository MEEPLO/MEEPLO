package com.sloth.meeploscrap.location.repository;

import com.sloth.meeploscrap.location.entity.LocationInfo;
import org.springframework.data.jpa.repository.JpaRepository;

public interface LocationInfoRepository extends JpaRepository<LocationInfo, Long> {
}
