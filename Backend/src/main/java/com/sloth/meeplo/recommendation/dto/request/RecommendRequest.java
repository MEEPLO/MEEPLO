package com.sloth.meeplo.recommendation.dto.request;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

import java.util.List;

public class RecommendRequest {

    @ToString
    @Getter
    public static class CoordinationList {
        private List<StartCoordination> startLocations;
    }

    @ToString
    @Getter
    public static class CreateRecommendAmuse {
        private StartCoordination startLocation;
        private List<Keyword> keywords;
    }

    @ToString
    @Getter
    public static class Keyword {
        private String content;
    }

    @ToString
    @Getter
    @NoArgsConstructor
    public static class StartCoordination {
        private double lat;
        private double lng;
    }

}
