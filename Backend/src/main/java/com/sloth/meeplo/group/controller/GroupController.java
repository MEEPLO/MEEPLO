package com.sloth.meeplo.group.controller;

import com.sloth.meeplo.group.dto.request.GroupRequest;
import com.sloth.meeplo.group.dto.response.GroupResponse;
import com.sloth.meeplo.group.service.GroupService;
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
@RequestMapping("meeplo/api/v1/group")
public class GroupController {

    private final GroupService groupService;

    @PostMapping
    public ResponseEntity<Map<String, Long>> createGroup(@ApiIgnore @RequestHeader(value = "Authorization") String authorization,
                                                         @RequestBody @Valid GroupRequest.GroupInput groupInput){
        Map<String, Long> resultMap = new HashMap<>();
        Long groupId = groupService.makeGroup(authorization, groupInput);
        resultMap.put("groupId", groupId);
        return new ResponseEntity<>(resultMap, HttpStatus.OK);
    }

    @PutMapping("/{groupId}")
    public ResponseEntity<Void> updateGroup(@ApiIgnore @RequestHeader("Authorization") String authorization,
                                            @PathVariable Long groupId,
                                            @RequestBody @Valid GroupRequest.GroupInput groupInput){

        groupService.updateGroup(authorization,groupId,groupInput);

        return new ResponseEntity<>(HttpStatus.OK);
    }

    @DeleteMapping("/{groupId}")
    public ResponseEntity<Void> deleteGroup(@ApiIgnore @RequestHeader("Authorization") String authorization, @PathVariable Long groupId){
        groupService.deleteGroup(authorization,groupId);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping
    public ResponseEntity<Map<String, List<GroupResponse.JoinedGroupSummary>>> getGroupList(@ApiIgnore @RequestHeader(value = "Authorization") String authorization){
        Map<String, List<GroupResponse.JoinedGroupSummary>> resultMap = new HashMap<>();
        resultMap.put("group", groupService.joinedGroupList(authorization));
        return new ResponseEntity<>(resultMap, HttpStatus.OK);
    }

    @GetMapping("/{groupId}")
    public ResponseEntity<Map<String, Object>> getGroupDetail(@ApiIgnore @RequestHeader("Authorization") String authorization, @PathVariable Long groupId){
        Map<String, Object> resultMap = new HashMap<>();
        resultMap.put("group", groupService.getJoinedGroupDetail(authorization,groupId));
        return new ResponseEntity<>(resultMap, HttpStatus.OK);
    }


    @GetMapping("/{groupId}/member")
    public ResponseEntity<Map<String, List<GroupResponse.GroupDetailMember>>> getGroupMembers(@ApiIgnore @RequestHeader("Authorization") String authorization, @PathVariable Long groupId){
        Map<String, List<GroupResponse.GroupDetailMember>> resultMap = new HashMap<>();
        resultMap.put("members", groupService.getGroupMembers(authorization,groupId));
        return new ResponseEntity<>(resultMap, HttpStatus.OK);
    }

    @DeleteMapping("{groupId}/member")
    public ResponseEntity<Void> exitGroupMember(@ApiIgnore @RequestHeader("Authorization") String authorization, @PathVariable Long groupId){
        groupService.exitGroupMember(authorization,groupId);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PostMapping("/member")
    public ResponseEntity<Map<String, GroupResponse.GroupJoinedResponse>> joinToGroup(@ApiIgnore @RequestHeader("Authorization") String authorization, @RequestBody GroupRequest.GroupJoinCode groupJoinCode){
        Map<String, GroupResponse.GroupJoinedResponse> resultMap = new HashMap<>();
        resultMap.put("members", groupService.joinToGroup(authorization, groupJoinCode));
        return new ResponseEntity<>(resultMap, HttpStatus.OK);
    }

    @DeleteMapping("{groupId}/member/{memberId}")
    public ResponseEntity<Void> kickGroupMember(@ApiIgnore @RequestHeader("Authorization") String authorization, @PathVariable Long groupId, @PathVariable Long memberId){
        groupService.kickGroupMember(authorization,groupId, memberId);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping("{groupId}/moment/feed")
    public ResponseEntity<Map<String, List<GroupResponse.FeedMoment>>> getFeedMoments(@ApiIgnore @RequestHeader("Authorization") String authorization, @PathVariable Long groupId){
        Map<String, List<GroupResponse.FeedMoment>> resultMap = new HashMap<>();
        resultMap.put("moments", groupService.getFeedMoments(authorization,groupId));
        return new ResponseEntity<>(resultMap, HttpStatus.OK);
    }


    @GetMapping("{groupId}/moment/map")
    public ResponseEntity<Map<String, List<GroupResponse.MapMoment>>> getMapMoments(@ApiIgnore @RequestHeader("Authorization") String authorization, @PathVariable Long groupId){
        Map<String, List<GroupResponse.MapMoment>> resultMap = new HashMap<>();
        resultMap.put("moments", groupService.getMapMoments(authorization,groupId));
        return new ResponseEntity<>(resultMap, HttpStatus.OK);
    }

    @GetMapping("{groupId}/schedule")
    public ResponseEntity<Map<String, List<GroupResponse.GroupSchedule>>> getGroupSchedules(@ApiIgnore @RequestHeader("Authorization") String authorization, @PathVariable Long groupId){
        Map<String, List<GroupResponse.GroupSchedule>> resultMap = new HashMap<>();
        resultMap.put("schedules", groupService.getGroupSchedules(authorization,groupId));
        return new ResponseEntity<>(resultMap, HttpStatus.OK);
    }
}
