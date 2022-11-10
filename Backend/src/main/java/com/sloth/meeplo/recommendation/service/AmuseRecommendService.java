package com.sloth.meeplo.recommendation.service;

import com.sloth.meeplo.recommendation.dto.request.AmuseRecommendRequest;
import com.sloth.meeplo.recommendation.dto.response.AmuseRecommendResponse;

public interface AmuseRecommendService {
    AmuseRecommendResponse.AmuseList gatherAmuseRecommendation(AmuseRecommendRequest.CreateRecommendAmuse recommendAmuse);
}
