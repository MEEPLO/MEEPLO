package com.sloth.meeplo.member;

import com.sloth.meeplo.location.dto.response.LocationResponse;
import com.sloth.meeplo.location.repository.LocationRepository;
import com.sloth.meeplo.location.service.LocationService;
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
    public List<LocationResponse.pointNearLocation> getNearLocation(Double lat, Double lng, Double radius) {

        return locationRepository.findLocationsWithCoordination(lat,lng,radius).stream()
                .map(l->LocationResponse.pointNearLocation.builder()
                        .location(l)
                        .build())
                .collect(Collectors.toList());
    }
}
