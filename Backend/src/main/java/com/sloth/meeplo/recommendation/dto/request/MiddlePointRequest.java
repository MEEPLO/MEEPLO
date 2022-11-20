package com.sloth.meeplo.recommendation.dto.request;

import com.sloth.meeplo.recommendation.dto.common.Coordinate;
import lombok.Getter;
import lombok.ToString;

import java.util.List;

public class MiddlePointRequest {
    @ToString
    @Getter
    public static class CoordinationList {
        private long groupId;
        private List<MemberStartLocation> startLocations;
    }

    @ToString
    @Getter
    public static class MemberStartLocation extends Coordinate{
        private long memberId;
    }
}
