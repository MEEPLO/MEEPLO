package com.sloth.meeploscrap.location.repository;

import com.sloth.meeploscrap.location.entity.LocationPhoto;
import org.springframework.data.jpa.repository.JpaRepository;

public interface LocationPhotoRepository extends JpaRepository<LocationPhoto, Long> {
}
