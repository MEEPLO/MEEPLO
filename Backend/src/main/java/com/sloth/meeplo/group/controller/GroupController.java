package com.sloth.meeplo.group.controller;

import com.sloth.meeplo.group.dto.request.GroupRequest;
import com.sloth.meeplo.group.service.GroupService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequiredArgsConstructor
@RequestMapping("meeplo/api/v1/group")
public class GroupController {

    private final GroupService groupService;

    @PostMapping
    public ResponseEntity<Long> createGroup(@RequestHeader Map<String, Object> token, @RequestBody GroupRequest.GroupInput groupInput){
        Long groupId = groupService.makeGroup(token, groupInput);

        return new ResponseEntity<>(groupId, HttpStatus.OK);
    }

    @PutMapping("/{groupId}")
    public ResponseEntity<Void> updateGroup(@RequestHeader Map<String, Object> token, @PathVariable Long groupId, @RequestBody GroupRequest.GroupInput groupInput){

        groupService.updateGroup(token,groupId,groupInput);

        return new ResponseEntity<>(HttpStatus.OK);
    }

    @DeleteMapping("/{groupId}")
    public ResponseEntity<Void> deleteGroup(@RequestHeader Map<String, Object> token, @PathVariable Long groupId){
        groupService.deleteGroup(token,groupId);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping
    public ResponseEntity<Map<String, String>> getGroupList(@RequestHeader Map<String, Object> token){
        Map<String, String> resultMap = new HashMap<>();


        return new ResponseEntity<Map<String, String>>(resultMap, HttpStatus.OK);
    }
}
