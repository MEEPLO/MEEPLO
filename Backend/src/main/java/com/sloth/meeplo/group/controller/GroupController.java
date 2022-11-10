package com.sloth.meeplo.group.controller;

import com.sloth.meeplo.group.dto.request.GroupRequest;
import com.sloth.meeplo.group.service.GroupService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequiredArgsConstructor
@RequestMapping("meeplo/api/v1/group")
public class GroupController {

    private final GroupService groupService;

    @PostMapping
    public ResponseEntity<Map<String, Long>> createGroup(@RequestHeader(value = "Authorization", required = false) String authorization, @RequestBody GroupRequest.GroupInput groupInput){
        Map<String, Long> resultMap = new HashMap<>();
        Long groupId = groupService.makeGroup(authorization, groupInput);
        resultMap.put("groupId", groupId);
        return new ResponseEntity<Map<String, Long>>(resultMap, HttpStatus.OK);
    }

    @PutMapping("/{groupId}")
    public ResponseEntity<Void> updateGroup(@RequestHeader("Authorization") String authorization, @PathVariable Long groupId, @RequestBody GroupRequest.GroupInput groupInput){

        groupService.updateGroup(authorization,groupId,groupInput);

        return new ResponseEntity<>(HttpStatus.OK);
    }

    @DeleteMapping("/{groupId}")
    public ResponseEntity<Void> deleteGroup(@RequestHeader("Authorization") String authorization, @PathVariable Long groupId){
        groupService.deleteGroup(authorization,groupId);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping
    public ResponseEntity<Map<String, List>> getGroupList(@RequestHeader(value = "Authorization", required = false) String authorization){
        Map<String, List> resultMap = new HashMap<>();
        resultMap.put("group", groupService.joinedGroupList(authorization));
        return new ResponseEntity<Map<String, List>>(resultMap, HttpStatus.OK);
    }

    @GetMapping("/{groupId}")
    public ResponseEntity<Map<String, Object>> getGroupDetail(@RequestHeader("Authorization") String authorization, @PathVariable Long groupId){
        Map<String, Object> resultMap = new HashMap<>();
        resultMap.put("group", groupService.getJoinedGroupDetail(authorization,groupId));
        return new ResponseEntity<Map<String, Object>>(resultMap, HttpStatus.OK);
    }


    @GetMapping("/{groupId}/member")
    public ResponseEntity<Map<String, List>> getGroupMembers(@RequestHeader("Authorization") String authorization, @PathVariable Long groupId){
        Map<String, List> resultMap = new HashMap<>();
        resultMap.put("members", groupService.getGroupMembers(authorization,groupId));
        return new ResponseEntity<Map<String, List>>(resultMap, HttpStatus.OK);
    }

    @DeleteMapping("{groupId}/member")
    public ResponseEntity<Void> exitGroupMember(@RequestHeader("Authorization") String authorization, @PathVariable Long groupId){
        groupService.exitGroupMember(authorization,groupId);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PostMapping("{groupId}/member")
    public ResponseEntity<Void> joinToGroup(@RequestHeader("Authorization") String authorization, @PathVariable Long groupId){
        groupService.joinToGroup(authorization, groupId);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @DeleteMapping("{groupId}/member/{memberId}")
    public ResponseEntity<Void> kickGroupMember(@RequestHeader("Authorization") String authorization, @PathVariable Long groupId, @PathVariable Long memberId){
        groupService.kickGroupMember(authorization,groupId, memberId);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping("{groupId}/moment/feed")
    public ResponseEntity<Map<String, List>> getFeedMoments(@RequestHeader("Authorization") String authorization, @PathVariable Long groupId){
        Map<String, List> resultMap = new HashMap<>();
        resultMap.put("moments", groupService.getFeedMoments(authorization,groupId));
        return new ResponseEntity<Map<String, List>>(resultMap, HttpStatus.OK);
    }


    @GetMapping("{groupId}/moment/map")
    public ResponseEntity<Map<String, List>> getMapMoments(@RequestHeader("Authorization") String authorization, @PathVariable Long groupId){
        Map<String, List> resultMap = new HashMap<>();
        resultMap.put("moments", groupService.getMapMoments(authorization,groupId));
        return new ResponseEntity<Map<String, List>>(resultMap, HttpStatus.OK);
    }
}
