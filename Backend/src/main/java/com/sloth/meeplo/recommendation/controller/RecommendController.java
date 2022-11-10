package com.sloth.meeplo.recommendation.controller;

import com.sloth.meeplo.recommendation.dto.common.Coordinate;
import com.sloth.meeplo.recommendation.dto.request.AmuseRecommendRequest;
import com.sloth.meeplo.recommendation.dto.request.MiddlePointRequest;
import com.sloth.meeplo.recommendation.dto.response.AmuseRecommendResponse;
import com.sloth.meeplo.recommendation.service.AmuseRecommendService;
import com.sloth.meeplo.recommendation.service.MiddlePointService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RequiredArgsConstructor
@RestController
@RequestMapping("meeplo/api/v1/recommendation/location")
public class RecommendController {

    private final AmuseRecommendService amuseRecommendService;
    private final MiddlePointService middlePointService;

    @PostMapping("/middle")
    public ResponseEntity<?> getMiddlePoint(@RequestHeader("Authorization") String authorization, @RequestBody MiddlePointRequest.CoordinationList startLocations) {
        return ResponseEntity.ok().body(middlePointService.calcMiddleStations(authorization, startLocations));
    }

    @PostMapping("/amuse")
    public ResponseEntity<AmuseRecommendResponse.AmuseList> getAmuseRecommendation(@RequestBody AmuseRecommendRequest.CreateRecommendAmuse recommendAmuse) {
        return ResponseEntity.ok().body(amuseRecommendService.gatherAmuseRecommendation(recommendAmuse));
    }

}
