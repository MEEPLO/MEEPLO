package com.sloth.meeplo.location.service;

import com.sloth.meeplo.global.exception.MeeploException;
import com.sloth.meeplo.global.type.DefaultValue;
import com.sloth.meeplo.location.dto.response.LocationResponse;
import com.sloth.meeplo.location.entity.Location;
import com.sloth.meeplo.location.exception.code.LocationErrorCode;
import com.sloth.meeplo.location.repository.LocationRepository;
import com.sloth.meeplo.location.type.LocationType;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Slf4j
@Service
@RequiredArgsConstructor
public class LocationServiceImpl implements LocationService {

    private final LocationRepository locationRepository;

    @Override
    public List<LocationResponse.PointNearLocation> getNearLocation(Double lat, Double lng, Double radius) {

        return locationRepository.findLocationsWithCoordination(lat, lng, radius, LocationType.AMUSE).stream()
                .filter(l -> l.getCategory().startsWith(DefaultValue.AMUSE_SEARCH_CATEGORY.getValue()))
                .map(l-> LocationResponse.PointNearLocation.builder()
                        .location(l)
                        .build())
                .collect(Collectors.toList());
    }

    @Override
    public LocationResponse.LocationDetail getDetailLocation(Long locationId) {
        Location location=locationRepository.findById(locationId)
                .orElseThrow(() -> new MeeploException(LocationErrorCode.NOT_EXIST_LOCATION));
        return LocationResponse.LocationDetail.builder().location(location).build();
    }

    @Override
    public List<LocationResponse.StationAutoSearch> getStationList(String keyword) {
        return locationRepository.findByTypeAndNameStartingWith(LocationType.STATION, keyword).stream()
                .map(l-> LocationResponse.StationAutoSearch.builder()
                        .location(l)
                        .build())
                .collect(Collectors.toList());
    }
    @Override
    public Location getLocationById(Long locationId){
        return locationRepository.findById(locationId)
                .orElseThrow(()-> new MeeploException(LocationErrorCode.NOT_EXIST_LOCATION));
    }
}
