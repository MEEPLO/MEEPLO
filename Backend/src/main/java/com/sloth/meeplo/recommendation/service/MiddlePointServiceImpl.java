package com.sloth.meeplo.recommendation.service;

import com.sloth.meeplo.global.type.DefaultValue;
import com.sloth.meeplo.global.util.ExternalAPIRequest;
import com.sloth.meeplo.group.entity.Group;
import com.sloth.meeplo.group.service.GroupService;
import com.sloth.meeplo.location.entity.Location;
import com.sloth.meeplo.location.repository.LocationRepository;
import com.sloth.meeplo.location.type.LocationType;
import com.sloth.meeplo.member.dto.request.MemberRequest;
import com.sloth.meeplo.member.entity.Member;
import com.sloth.meeplo.member.service.MemberService;
import com.sloth.meeplo.recommendation.algorithm.GrahamScan;
import com.sloth.meeplo.recommendation.dto.common.Coordinate;
import com.sloth.meeplo.recommendation.dto.request.MiddlePointRequest;
import com.sloth.meeplo.recommendation.dto.response.MiddlePointResponse;
import com.sloth.meeplo.recommendation.dto.response.RouteMetaData;
import com.sloth.meeplo.recommendation.util.RecommendAPIRequest;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Arrays;
import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Service
@Slf4j
public class MiddlePointServiceImpl implements MiddlePointService{
    private final LocationRepository locationRepository;

    private final GroupService groupService;
    private final MemberService memberService;

    private final GrahamScan grahamScan;
    private final ExternalAPIRequest externalAPIRequest;
    private final RecommendAPIRequest recommendAPIRequest;

    @Override
    @Transactional(readOnly = true)
    public MiddlePointResponse.StationList calcMiddleStations(String authorization, MiddlePointRequest.CoordinationList startData) {

        Member mySelf = memberService.getMemberByAuthorization(authorization);

        Group group = groupService.getGroupEntityByGroupId(startData.getGroupId());

        groupService.checkMemberInGroup(mySelf, group);

        return MiddlePointResponse.StationList.builder()
                .stations(getMiddleStations(startData.getStartLocations()).stream()
                        .map(station -> MiddlePointResponse.RecommendedStation.builder()
                                .location(station)
                                .requiredTimes(startData.getStartLocations().stream()
                                        .map(start -> MiddlePointResponse.StationRoute.builder()
                                                    .member(memberService.getMemberById(start.getMemberId()))
                                                    .startLocation(MiddlePointResponse.StartLocation.builder()
                                                            .lat(start.getLat())
                                                            .lng(start.getLng())
                                                            .address(convertAddressFromCoordinate(start.getLat(), start.getLng()))
                                                            .build())
                                                    .routeMetaData(calcDurationAndRoute(start, station))
                                                    .build()
                                        )
                                        .collect(Collectors.toList()))
                                .build())
                        .sorted(Comparator.comparingInt(MiddlePointResponse.RecommendedStation::getAvgTime))
                        .collect(Collectors.toList()))
                .build();
    }

    private String convertAddressFromCoordinate(double lat, double lng) {
        String response = externalAPIRequest.getKakaoAddressInfo(lng, lat);
        return Arrays.stream(response.split(" "))
                .filter(s -> s.endsWith("구"))
                .findFirst()
                .orElse("서울시");
    }

    private RouteMetaData calcDurationAndRoute(MiddlePointRequest.MemberStartLocation start, Location destination) {

        return externalAPIRequest.getTimeAndRouteInfo(
                MemberRequest.ConvertedCoordinate.builder().lng(start.getLng()).lat(start.getLat()).build(),
                MemberRequest.ConvertedCoordinate.builder().lat(destination.getLat()).lng(destination.getLng()).build());
    }

    private List<Location> getMiddleStations(List<MiddlePointRequest.MemberStartLocation> coordinates) {

        List<MiddlePointResponse.RouteCoordinate> points = coordinates.stream()
                .map(coord -> MiddlePointResponse.RouteCoordinate.builder()
                        .lat(coord.getLat())
                        .lng(coord.getLng())
                        .build())
                .collect(Collectors.toList());

        Coordinate centerPoint = recommendAPIRequest.callMiddlePointAPI(grahamScan.calcConvexHullPoints(points));

        return locationRepository.findLocationsWithCoordination(centerPoint.getLat(), centerPoint.getLng(),
                Double.parseDouble(DefaultValue.STATION_SEARCH_RADIUS.getValue()), LocationType.STATION).stream()
                .limit(Integer.parseInt(DefaultValue.STATION_LIMIT.getValue()))
                .collect(Collectors.toList());
    }
}
