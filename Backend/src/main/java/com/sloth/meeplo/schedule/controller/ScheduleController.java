package com.sloth.meeplo.schedule.controller;


import com.sloth.meeplo.schedule.dto.request.ScheduleRequest;
import com.sloth.meeplo.schedule.dto.response.ScheduleResponse;
import com.sloth.meeplo.schedule.service.ScheduleService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
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

    @PutMapping
    public ResponseEntity<Void> updateSchedule(@RequestHeader("Authorization") String authorization, @RequestBody ScheduleRequest.ScheduleUpdateInput scheduleUpdateInput){
        scheduleService.updateSchedule(authorization, scheduleUpdateInput);
        return new ResponseEntity<Void>(HttpStatus.OK);
    }

    @DeleteMapping("/{scheduleId}")
    public ResponseEntity<Void> deleteSchedule(@RequestHeader("Authorization") String authorization, @PathVariable Long scheduleId){
        scheduleService.deleteSchedule(authorization, scheduleId);
        return new ResponseEntity<Void>(HttpStatus.OK);
    }

    @GetMapping("/{scheduleId}")
    public ResponseEntity<ScheduleResponse.ScheduleDetailInfo> getScheduleDetail(@RequestHeader("Authorization") String authorization, @PathVariable Long scheduleId){
        return new ResponseEntity<>(scheduleService.getScheduleDetail(authorization,scheduleId), HttpStatus.OK);
    }

    @GetMapping
    public ResponseEntity<Map<String, List<ScheduleResponse.ScheduleListInfo>>> getScheduleList(@RequestHeader("Authorization") String authorization){
        Map<String, List<ScheduleResponse.ScheduleListInfo>> resultMap = new HashMap<>();
        resultMap.put("schedules", scheduleService.getScheduleList(authorization));
        return new ResponseEntity<>(resultMap, HttpStatus.OK);
    }

    @GetMapping("/monthly/{yearMonth}")
    public ResponseEntity<Map<String, List<String>>> getScheduleMonthList(@RequestHeader("Authorization") String authorization, @PathVariable String yearMonth){
        Map<String, List<String>> resultMap = new HashMap<>();
        resultMap.put("scheduledDates", scheduleService.getScheduleMonthList(authorization, yearMonth));
        return new ResponseEntity<>(resultMap, HttpStatus.OK);
    }

    @GetMapping("/daily/{date}")
    public ResponseEntity<Map<String, List<ScheduleResponse.ScheduleListInfo>>> getScheduleDailyList(@RequestHeader("Authorization") String authorization, @PathVariable String date){
        Map<String, List<ScheduleResponse.ScheduleListInfo>> resultMap = new HashMap<>();
        resultMap.put("scheduledDates", scheduleService.getScheduleDailyList(authorization, date));
        return new ResponseEntity<>(resultMap, HttpStatus.OK);
    }
}
