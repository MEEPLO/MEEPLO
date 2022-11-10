package com.sloth.meeplo.recommendation.service;

import com.sloth.meeplo.group.entity.Group;
import com.sloth.meeplo.group.repository.GroupMemberRepository;
import com.sloth.meeplo.group.service.GroupService;
import com.sloth.meeplo.location.entity.Location;
import com.sloth.meeplo.location.repository.LocationRepository;
import com.sloth.meeplo.member.entity.Member;
import com.sloth.meeplo.member.repository.MemberRepository;
import com.sloth.meeplo.member.service.MemberService;
import com.sloth.meeplo.recommendation.dto.request.MiddlePointRequest;
import com.sloth.meeplo.recommendation.dto.response.MiddlePointResponse;
import com.sloth.meeplo.recommendation.dto.response.RouteMetaData;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Service
public class MiddlePointServiceImpl implements MiddlePointService{

    private final GroupMemberRepository groupMemberRepository;
    private final MemberRepository memberRepository;
    private final LocationRepository locationRepository;

    private final GroupService groupService;
    private final MemberService memberService;

    @Override
    public MiddlePointResponse.StationList calcMiddleStations(String authorization, MiddlePointRequest.CoordinationList startData) {

        Member mySelf = memberService.getMemberByAuthorization(authorization);

        Group group = groupService.getGroupEntityByGroupId(startData.getGroupId());

        groupService.checkMemberInGroup(mySelf, group);

        return MiddlePointResponse.StationList.builder()
                .stations(getMiddleStations(startData.getStartLocations()).stream()
                        .map(station -> MiddlePointResponse.RecommendedStation.builder()
                                .name(station.getName())
                                .lat(station.getLat())
                                .lng(station.getLng())
                                .requiredTimes(startData.getStartLocations().stream()
                                        .map(start -> {
                                            RouteMetaData route = calcDurationAndRoute(start, station);

                                            return MiddlePointResponse.StationRoute.builder()
                                                    .member(groupMemberRepository.findByGroupAndMember(group,
                                                                    memberRepository.findById(start.getMemberId())
                                                                            .orElseThrow())
                                                            .orElseThrow())
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
        return "강남구";
    }

    private RouteMetaData calcDurationAndRoute(MiddlePointRequest.MemberStartLocation start, Location destination) {
        // TODO : openroutemap을 사용하여 시간과 경로를 얻어오기
        return RouteMetaData.builder()
                .time(30)
                .pointCoordinate(new ArrayList<>())
                .build();
    }

    private List<Location> getMiddleStations(List<MiddlePointRequest.MemberStartLocation> coordinates) {
        // TODO : fastapi로 무게중심 좌표 찾아오기
        double lat = 37.564820366666666;
        double lng = 127.04954223333333;
        return locationRepository.findLocationsWithCoordination(lat, lng, 0.3);
    }
}
