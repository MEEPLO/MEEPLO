package com.sloth.meeplo.group.controller;

import com.sloth.meeplo.group.service.GroupService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequiredArgsConstructor
@RequestMapping("meeplo/api/v1/group")
public class GroupController {

    private final GroupService groupService;


    @PostMapping
    public ResponseEntity<Map<String, Object>> createGroup(@RequestHeader Map<String, Object> token){

        return null;
    }
}
