package com.sloth.meeplo.recommendation.util;

import com.sloth.meeplo.recommendation.dto.common.Coordinate;
import com.sloth.meeplo.recommendation.dto.response.MiddlePointResponse;

import java.util.List;

public interface RecommendAPIRequest {

    Coordinate callMiddlePointAPI(List<MiddlePointResponse.RouteCoordinate> coordinates);
}
