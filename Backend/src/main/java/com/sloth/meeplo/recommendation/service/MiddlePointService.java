package com.sloth.meeplo.recommendation.service;

import com.sloth.meeplo.recommendation.dto.request.MiddlePointRequest;
import com.sloth.meeplo.recommendation.dto.response.MiddlePointResponse;

public interface MiddlePointService {
    MiddlePointResponse.StationList calcMiddleStations(String authorization, MiddlePointRequest.CoordinationList startList);
}
