package com.sloth.meeplo.location.service;

import com.sloth.meeplo.location.dto.response.LocationResponse;
import com.sloth.meeplo.location.entity.Location;

import java.util.List;

public interface LocationService {

    List<LocationResponse.PointNearLocation> getNearLocation(Double lat, Double lng, Double radius);

    LocationResponse.LocationDetail getDetailLocation(Long locationId);

    List<LocationResponse.StationAutoSearch> getStationList(String keyword);

    Location getLocationById(Long locationId);
}
