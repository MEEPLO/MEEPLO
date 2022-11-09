package com.sloth.meeplo.recommendation.controller;

import com.sloth.meeplo.recommendation.dto.request.RecommendRequest;
import com.sloth.meeplo.recommendation.dto.response.AmuseRecommendResponse;
import com.sloth.meeplo.recommendation.service.AmuseRecommendService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RequiredArgsConstructor
@RestController
@RequestMapping("meeplo/api/v1/recommendation/location")
public class RecommendController {

    private final AmuseRecommendService amuseRecommendService;

    @PostMapping("/middle")
    public ResponseEntity<?> getMiddlePoint(@RequestBody RecommendRequest.CoordinationList startLocations) {
        return ResponseEntity.ok().body(null);
    }

    @PostMapping("/amuse")
    public ResponseEntity<AmuseRecommendResponse.AmuseList> getAmuseRecommendation(@RequestBody RecommendRequest.CreateRecommendAmuse recommendAmuse) {
        return ResponseEntity.ok().body(amuseRecommendService.gatherAmuseRecommendation());
    }

}
