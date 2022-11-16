package com.sloth.meeplo.recommendation.service;

import com.sloth.meeplo.global.type.DefaultValue;
import com.sloth.meeplo.location.repository.LocationRepository;
import com.sloth.meeplo.location.type.LocationType;
import com.sloth.meeplo.recommendation.dto.request.AmuseRecommendRequest;
import com.sloth.meeplo.recommendation.dto.response.AmuseRecommendResponse;
import com.sloth.meeplo.recommendation.util.RecommendAPIRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.stream.Collectors;

@RequiredArgsConstructor
@Service
public class AmuseRecommendServiceImpl implements AmuseRecommendService{

    private final LocationRepository locationRepository;
    private final RecommendAPIRequest recommendAPIRequest;

    @Override
    @Transactional(readOnly = true)
    public AmuseRecommendResponse.AmuseList gatherAmuseRecommendation(AmuseRecommendRequest.CreateRecommendAmuse recommendAmuse) {

        double radius = Double.parseDouble(DefaultValue.AMUSE_SEARCH_RADIUS.getValue());

        AmuseRecommendResponse.AmuseList listByRecommended = AmuseRecommendResponse.AmuseList.builder()
                .amuses(locationRepository.findAmuseLocations(recommendAmuse.getStartLocation().getLat(), recommendAmuse.getStartLocation().getLng(), radius, LocationType.AMUSE,
                        recommendAPIRequest.callWord2VecAPI(recommendAmuse.getKeywords()).getTags()).stream()
                        .map(l -> AmuseRecommendResponse.AmuseSummary.builder()
                                .location(l)
                                .build())
                        .collect(Collectors.toList()))
                .build();

        return listByRecommended.getAmuses().size() > 0 ? listByRecommended
                : AmuseRecommendResponse.AmuseList.builder()
                    .amuses(locationRepository.findLocationsWithCoordination(recommendAmuse.getStartLocation().getLat(), recommendAmuse.getStartLocation().getLng(), radius, LocationType.AMUSE).stream()
                            .filter(l -> l.getCategory().startsWith(DefaultValue.AMUSE_SEARCH_CATEGORY.getValue()))
                            .map(l -> AmuseRecommendResponse.AmuseSummary.builder()
                                    .location(l)
                                    .build())
                            .collect(Collectors.toList()))
                .build();
    }

}
