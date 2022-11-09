package com.sloth.meeplo.location.repository;

import com.sloth.meeplo.location.entity.Location;
import com.sloth.meeplo.location.type.LocationType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface LocationRepository extends JpaRepository<Location, Long> {

    String HAVERSINE_FORMULA = "(6371 * acos(cos(radians(:latitude)) * cos(radians(l.lat)) *" +
            " cos(radians(l.lng) - radians(:longitude)) + sin(radians(:latitude)) * sin(radians(l.lat))))";


    @Query(value = "SELECT l FROM Location l WHERE " + HAVERSINE_FORMULA + " < :distance and type = 1 ORDER BY " + HAVERSINE_FORMULA + " DESC")
    List<Location> findLocationsWithCoordination(
            @Param("latitude") double latitude,
            @Param("longitude") double longitude,
            @Param("distance") double distanceWithInKM
    );

    List<Location> findByTypeAndNameStartingWith(LocationType type, String name);


}
