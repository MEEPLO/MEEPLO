package com.sloth.meeplo.recommendation.dto.response;

import lombok.Builder;
import lombok.Getter;

import java.util.List;

@Getter
@Builder
public class RouteMetaData {
    private double time;
    private List<MiddlePointResponse.RouteCoordinate> pointCoordinate;
}
