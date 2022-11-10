package com.sloth.meeplo.recommendation.dto.response;

import com.sloth.meeplo.global.type.DefaultValue;
import com.sloth.meeplo.group.entity.GroupMember;
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
        private String name;
        private int avgTime;
        private List<StationRoute> requiredTimes;

        @Builder
        RecommendedStation(String name, double lat, double lng, List<StationRoute> requiredTimes) {
            super(lat, lng);
            this.name = name;
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
        private long memberId;
        private String memberName;
        private int time;
        private StartLocation startLocation;
        private List<RouteCoordinate> coordinates;

        @Builder
        StationRoute(GroupMember member, int time, StartLocation startLocation, List<RouteCoordinate> coordinates) {
            this.memberId = member.getId();
            this.memberName = member.getNickname();
            this.time = time;
            this.startLocation = startLocation;
            this.coordinates = coordinates;
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

    @ToString
    @Getter
    public static class RouteCoordinate extends Coordinate{
        @Builder
        RouteCoordinate(double lat, double lng) {
            super(lat, lng);
        }
    }

}
