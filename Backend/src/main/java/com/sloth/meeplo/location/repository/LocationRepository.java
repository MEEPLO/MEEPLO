package com.sloth.meeplo.location.repository;

import com.sloth.meeplo.location.entity.Location;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface LocationRepository extends JpaRepository<Location, Long> {

    String HAVERSINE_FORMULA = "(6371 * acos(cos(radians(:latitude)) * cos(radians(l.lat)) *" +
            " cos(radians(l.lng) - radians(:longitude)) + sin(radians(:latitude)) * sin(radians(l.lat))))";

    @Query("SELECT location FROM location l WHERE " + HAVERSINE_FORMULA + " < :distance ORDER BY "+ HAVERSINE_FORMULA + " DESC")
    List<Location> findLocationsWithInDistance(@Param("latitude") double latitude, @Param("longitude") double longitude, @Param("distance") double distanceWithInKM);


}
