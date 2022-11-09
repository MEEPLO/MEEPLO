package com.sloth.meeplo.recommendation.service;

import com.sloth.meeplo.location.repository.LocationRepository;
import com.sloth.meeplo.recommendation.dto.response.AmuseRecommendResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.stream.Collectors;

@RequiredArgsConstructor
@Service
public class AmuseRecommendService {

    private final LocationRepository locationRepository;

    public AmuseRecommendResponse.AmuseList gatherAmuseRecommendation() {
        return AmuseRecommendResponse.AmuseList.builder()
                .amuses(locationRepository.findLocationsWithCoordination(37.567091, 127.052362, 0.5).stream()
                        .map(l -> AmuseRecommendResponse.AmuseSummary.builder()
                                .location(l)
                                .build())
                        .collect(Collectors.toList()))
                .build();
    }

}
