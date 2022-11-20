package com.sloth.meeploscrap.location.repository;

import com.sloth.meeploscrap.location.entity.LocationTime;
import org.springframework.data.jpa.repository.JpaRepository;

public interface LocationTimeRepository extends JpaRepository<LocationTime, Long> {
}
