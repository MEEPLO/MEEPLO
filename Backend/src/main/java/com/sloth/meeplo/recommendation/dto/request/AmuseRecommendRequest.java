package com.sloth.meeplo.recommendation.dto.request;

import com.sloth.meeplo.recommendation.dto.common.Coordinate;
import lombok.Getter;
import lombok.ToString;

import java.util.List;

public class AmuseRecommendRequest {

    @ToString
    @Getter
    public static class CreateRecommendAmuse {
        private Coordinate startLocation;
        private List<Keyword> keywords;
    }

    @ToString
    @Getter
    public static class Keyword {
        private String content;
    }
}
