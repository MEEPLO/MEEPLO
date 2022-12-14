package com.sloth.meeplo.moment.controller;

import com.sloth.meeplo.moment.dto.request.MomentRequest;
import com.sloth.meeplo.moment.dto.response.MomentResponse;
import com.sloth.meeplo.moment.repository.MomentRepository;
import com.sloth.meeplo.moment.service.MomentService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import springfox.documentation.annotations.ApiIgnore;

import javax.validation.Valid;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequiredArgsConstructor
@RequestMapping("meeplo/api/v1/moment")
public class MomentController {

    private final MomentService momentService;

    @GetMapping("/{momentId}")
    public ResponseEntity<MomentResponse.MomentDetail> getMomentDetail(@ApiIgnore @RequestHeader("Authorization") String authorization, @PathVariable Long momentId){
        return new ResponseEntity<>(momentService.getMomentDetail(authorization,momentId), HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<Map<String, Long>> createMoment(@ApiIgnore @RequestHeader("Authorization") String authorization,
                                                          @RequestBody @Valid MomentRequest.CreateMomentInfo createMomentInfo){
        Map<String, Long> resultMap = new HashMap<>();
        resultMap.put("momentId", momentService.createMoment(authorization, createMomentInfo));
        return new ResponseEntity<>(resultMap, HttpStatus.OK);
    }

    @DeleteMapping("/{momentId}")
    public ResponseEntity<Void> deleteMoment(@ApiIgnore @RequestHeader("Authorization") String authorization, @PathVariable Long momentId){
        momentService.deleteMoment(authorization,momentId);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PostMapping("/{momentId}/reaction")
    public ResponseEntity<Map<String,Long>> createReaction(@ApiIgnore @RequestHeader("Authorization") String authorization, @PathVariable Long momentId){
        Map<String, Long> resultMap = new HashMap<>();
        resultMap.put("reactionCount", momentService.createReaction(authorization, momentId));
        return new ResponseEntity<>(resultMap, HttpStatus.OK);
    }

    @DeleteMapping("/{momentId}/reaction")
    public ResponseEntity<Map<String,Long>> deleteReaction(@ApiIgnore @RequestHeader("Authorization") String authorization, @PathVariable Long momentId){
        Map<String, Long> resultMap = new HashMap<>();
        resultMap.put("reactionCount", momentService.deleteReaction(authorization, momentId));
        return new ResponseEntity<Map<String, Long>>(resultMap, HttpStatus.OK);
    }

    @PostMapping("/{momentId}/comment")
    public ResponseEntity<Map<String, List<MomentResponse.MomentDetailComment>>> createComment(@ApiIgnore @RequestHeader("Authorization") String authorization, @PathVariable Long momentId,
                                                                                               @RequestBody @Valid MomentRequest.CreateMomentCommentInfo createMomentCommentInfo){
        Map<String, List<MomentResponse.MomentDetailComment>> resultMap = new HashMap<>();
        resultMap.put("comments", momentService.createComment(authorization, momentId,createMomentCommentInfo));
        return new ResponseEntity<>(resultMap, HttpStatus.OK);
    }

    @GetMapping("/{momentId}/comment")
    public ResponseEntity<Map<String, List<MomentResponse.MomentDetailComment>>> getComments(@ApiIgnore @RequestHeader("Authorization") String authorization, @PathVariable Long momentId){
        Map<String, List<MomentResponse.MomentDetailComment>> resultMap = new HashMap<>();
        resultMap.put("comments", momentService.getComments(authorization, momentId));
        return new ResponseEntity<>(resultMap, HttpStatus.OK);
    }

    @GetMapping("/calendar")
    public ResponseEntity<Map<String, List>> getCalenderMoments(@ApiIgnore @RequestHeader("Authorization") String authorization, @RequestParam String month){
        Map<String, List> resultMap = new HashMap<>();
        resultMap.put("moments", momentService.getCalenderMoments(authorization, month));
        return new ResponseEntity<>(resultMap, HttpStatus.OK);
    }

    @GetMapping("/feed")
    public ResponseEntity<MomentResponse.MomentFeedTwoList> getFeedMoment(@RequestHeader("Authorization") String authorization, @RequestParam Integer page, @RequestParam Integer size, @RequestParam(required = false) Long group, @RequestParam(defaultValue = "0") Integer leftSize, @RequestParam(defaultValue = "0") Integer rightSize, @RequestParam(defaultValue = "false") Boolean writer){

        return new ResponseEntity<>(momentService.getFeedMoment(authorization,page,size,group, leftSize, rightSize, writer),HttpStatus.OK);
    }
}
