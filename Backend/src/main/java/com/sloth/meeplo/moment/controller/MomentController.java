package com.sloth.meeplo.moment.controller;

import com.sloth.meeplo.moment.dto.request.MomentRequest;
import com.sloth.meeplo.moment.dto.response.MomentResponse;
import com.sloth.meeplo.moment.service.MomentService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequiredArgsConstructor
@RequestMapping("meeplo/api/v1/moment")
public class MomentController {

    private final MomentService momentService;

    @GetMapping("/{momentId}")
    public ResponseEntity<MomentResponse.MomentDetail> getMomentDetail(@RequestHeader("Authorization") String authorization, @PathVariable Long momentId){
        return new ResponseEntity<>(momentService.getMomentDetail(authorization,momentId), HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<Map<String, Long>> createMoment(@RequestHeader("Authorization") String authorization, @RequestBody MomentRequest.CreateMomentInfo createMomentInfo){
        Map<String, Long> resultMap = new HashMap<>();
        resultMap.put("momentId", momentService.createMoment(authorization, createMomentInfo));
        return new ResponseEntity<Map<String, Long>>(resultMap, HttpStatus.OK);
    }

    @PostMapping("/{momentId}/reaction")
    public ResponseEntity<Map<String,Long>> createReaction(@RequestHeader("Authorization") String authorization, @PathVariable Long momentId){
        Map<String, Long> resultMap = new HashMap<>();
        resultMap.put("reactionCount", momentService.createReaction(authorization, momentId));
        return new ResponseEntity<Map<String, Long>>(resultMap, HttpStatus.OK);
    }

    @DeleteMapping("/{momentId}/reaction/{reactionId}")
    public ResponseEntity<Map<String,Long>> deleteReaction(@RequestHeader("Authorization") String authorization, @PathVariable Long momentId){
        Map<String, Long> resultMap = new HashMap<>();
        resultMap.put("reactionCount", momentService.deleteReaction(authorization, momentId));
        return new ResponseEntity<Map<String, Long>>(resultMap, HttpStatus.OK);
    }
}
