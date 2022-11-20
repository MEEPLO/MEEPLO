package com.sloth.meeploscrap.location.repository;

import com.sloth.meeploscrap.location.entity.Location;
import com.sloth.meeploscrap.location.entity.type.LocationType;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface LocationRepository extends JpaRepository<Location, Long> {

    List<Location> findByType(LocationType type, Pageable pageable);
    List<Location> findByTypeOrderByIdDesc(LocationType type, Pageable pageable);

}
