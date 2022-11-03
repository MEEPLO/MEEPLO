package com.sloth.meeplo.schedule.controller;


import com.sloth.meeplo.schedule.dto.request.ScheduleRequest;
import com.sloth.meeplo.schedule.service.ScheduleService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequiredArgsConstructor
@RequestMapping("meeplo/api/v1/schedule")
public class ScheduleController {

    private final ScheduleService scheduleService;

    @PostMapping
    public ResponseEntity<Map<String, Long>> createSchedule(@RequestHeader("Authorization") String authorization, @RequestBody ScheduleRequest.ScheduleCreateInput scheduleCreateInput){
        Map<String, Long> resultMap = new HashMap<>();
        Long scheduleId = scheduleService.createSchedule(authorization, scheduleCreateInput);
        resultMap.put("scheduleId", scheduleId);
        return new ResponseEntity<Map<String, Long>>(resultMap, HttpStatus.OK);
    }
}
