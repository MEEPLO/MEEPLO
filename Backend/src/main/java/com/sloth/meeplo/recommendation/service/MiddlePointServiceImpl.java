package com.sloth.meeplo.recommendation.service;

import com.sloth.meeplo.global.exception.MeeploException;
import com.sloth.meeplo.global.exception.code.CommonErrorCode;
import com.sloth.meeplo.global.util.ExternalAPIRequest;
import com.sloth.meeplo.group.entity.Group;
import com.sloth.meeplo.group.repository.GroupMemberRepository;
import com.sloth.meeplo.group.service.GroupService;
import com.sloth.meeplo.location.entity.Location;
import com.sloth.meeplo.location.repository.LocationRepository;
import com.sloth.meeplo.location.type.LocationType;
import com.sloth.meeplo.member.dto.request.MemberRequest;
import com.sloth.meeplo.member.entity.Member;
import com.sloth.meeplo.member.repository.MemberRepository;
import com.sloth.meeplo.member.service.MemberService;
import com.sloth.meeplo.recommendation.dto.common.Coordinate;
import com.sloth.meeplo.recommendation.dto.request.MiddlePointRequest;
import com.sloth.meeplo.recommendation.dto.response.MiddlePointResponse;
import com.sloth.meeplo.recommendation.dto.response.RouteMetaData;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Service
@Slf4j
public class MiddlePointServiceImpl implements MiddlePointService{
    private final LocationRepository locationRepository;

    private final GroupService groupService;
    private final MemberService memberService;

    private final ExternalAPIRequest externalAPIRequest;

    @Override
    public MiddlePointResponse.StationList calcMiddleStations(String authorization, MiddlePointRequest.CoordinationList startData) {

        Member mySelf = memberService.getMemberByAuthorization(authorization);

        Group group = groupService.getGroupEntityByGroupId(startData.getGroupId());

        groupService.checkMemberInGroup(mySelf, group);

        return MiddlePointResponse.StationList.builder()
                .stations(getMiddleStations(startData.getStartLocations()).stream()
                        .map(station -> MiddlePointResponse.RecommendedStation.builder()
                                .location(station)
                                .requiredTimes(startData.getStartLocations().stream()
                                        .map(start -> {
                                            RouteMetaData route = calcDurationAndRoute(start, station);

                                            return MiddlePointResponse.StationRoute.builder()
                                                    .groupMember(groupService.getGroupMemberByGroupAndMemberId(group, start.getMemberId()))
                                                    .time((int) route.getTime())
                                                    .startLocation(MiddlePointResponse.StartLocation.builder()
                                                            .lat(start.getLat())
                                                            .lng(start.getLng())
                                                            .address(convertAddressFromCoordinate(start.getLat(), start.getLng()))
                                                            .build())
                                                    .coordinates(route.getPointCoordinate())
                                                    .build();
                                        })
                                        .collect(Collectors.toList()))
                                .build())
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
        // TODO : openroutemap을 사용하여 시간과 경로를 얻어오기
        // api 호출
        externalAPIRequest.getTimeAndRouteInfo(
                MemberRequest.ConvertedCoordinate.builder().lng(start.getLng()).lat(start.getLat()).build(),
                MemberRequest.ConvertedCoordinate.builder().lat(destination.getLat()).lng(destination.getLng()).build());
        return RouteMetaData.builder()
                .time(30)
                .pointCoordinate(new ArrayList<>())
                .build();
    }

    private List<Location> getMiddleStations(List<MiddlePointRequest.MemberStartLocation> coordinates) {
        // TODO : fastapi로 무게중심 좌표 찾아오기 -> graham scan 알고리즘을 이용하여 concave일 경우 외곽
        // fastapi 호출


        // graham scan


        double lat = 37.564820366666666;
        double lng = 127.04954223333333;
        return locationRepository.findLocationsWithCoordination(lat, lng, 1, LocationType.STATION);
    }
}
