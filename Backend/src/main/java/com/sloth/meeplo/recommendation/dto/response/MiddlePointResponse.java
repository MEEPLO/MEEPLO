package com.sloth.meeplo.recommendation.dto.response;

import com.sloth.meeplo.global.type.DefaultValue;
import com.sloth.meeplo.location.entity.Location;
import com.sloth.meeplo.member.entity.Member;
import com.sloth.meeplo.recommendation.dto.common.Coordinate;
import lombok.Builder;
import lombok.Getter;
import lombok.ToString;

import java.util.List;

public class MiddlePointResponse {

    @ToString
    @Getter
    public static class StationList {
        private List<RecommendedStation> stations;

        @Builder
        StationList(List<RecommendedStation> stations) {
            this.stations = stations;
        }
    }

    @ToString
    @Getter
    public static class RecommendedStation extends Coordinate{
        private Long stationId;
        private String name;
        private Integer avgTime;
        private List<StationRoute> requiredTimes;

        @Builder
        RecommendedStation(Location location, List<StationRoute> requiredTimes) {
            super(location.getLat(), location.getLng());
            this.stationId = location.getId();
            this.name = location.getName();
            this.requiredTimes = requiredTimes;
            this.avgTime = (int) requiredTimes.stream()
                            .mapToInt(StationRoute::getTime)
                            .average()
                            .orElse(Integer.parseInt(DefaultValue.STATION_AVERAGE_TIME.getValue()));
        }
    }

    @ToString
    @Getter
    public static class StationRoute {
        private Long memberId;
        private String memberName;
        private Integer time;
        private StartLocation startLocation;
        private List<RouteCoordinate> coordinates;

        @Builder
        StationRoute(Member member, StartLocation startLocation, RouteMetaData routeMetaData) {
            this.memberId = member.getId();
            this.memberName = member.getUsername();
            this.time = (int) routeMetaData.getTime();
            this.startLocation = startLocation;
            this.coordinates = routeMetaData.getPointCoordinate();
        }
    }

    @ToString
    @Getter
    public static class StartLocation extends Coordinate{
        private String address;

        @Builder
        StartLocation(double lat, double lng, String address) {
            super(lat, lng);
            this.address = address;
        }
    }

    @Getter
    public static class RouteCoordinate extends Coordinate{
        @Builder
        RouteCoordinate(Double lat, Double lng) {
            super(lat, lng);
        }
    }

}
