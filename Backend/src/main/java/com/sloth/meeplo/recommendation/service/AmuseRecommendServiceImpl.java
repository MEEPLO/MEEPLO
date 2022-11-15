package com.sloth.meeplo.recommendation.service;

import com.sloth.meeplo.location.repository.LocationRepository;
import com.sloth.meeplo.location.type.LocationType;
import com.sloth.meeplo.recommendation.dto.request.AmuseRecommendRequest;
import com.sloth.meeplo.recommendation.dto.response.AmuseRecommendResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.stream.Collectors;

@RequiredArgsConstructor
@Service
public class AmuseRecommendServiceImpl implements AmuseRecommendService{

    private final LocationRepository locationRepository;

    private final double RADIUS = 0.5;

    @Override
    public AmuseRecommendResponse.AmuseList gatherAmuseRecommendation(AmuseRecommendRequest.CreateRecommendAmuse recommendAmuse) {
        return AmuseRecommendResponse.AmuseList.builder()
                .amuses(locationRepository.findLocationsWithCoordination(recommendAmuse.getStartLocation().getLat(), recommendAmuse.getStartLocation().getLng(), RADIUS, LocationType.AMUSE).stream()
                        .map(l -> AmuseRecommendResponse.AmuseSummary.builder()
                                .location(l)
                                .build())
                        .collect(Collectors.toList()))
                .build();
    }

}
