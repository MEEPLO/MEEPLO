package com.sloth.meeplo.schedule.controller;


import com.sloth.meeplo.moment.dto.response.MomentResponse;
import com.sloth.meeplo.schedule.dto.request.ScheduleRequest;
import com.sloth.meeplo.schedule.dto.response.ScheduleResponse;
import com.sloth.meeplo.schedule.service.ScheduleService;
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
@RequestMapping("meeplo/api/v1/schedule")
public class ScheduleController {

    private final ScheduleService scheduleService;

    @PostMapping
    public ResponseEntity<Map<String, Long>> createSchedule(@ApiIgnore @RequestHeader("Authorization") String authorization,
                                                            @RequestBody @Valid ScheduleRequest.ScheduleCreateInput scheduleCreateInput){
        Map<String, Long> resultMap = new HashMap<>();
        resultMap.put("scheduleId", scheduleService.createSchedule(authorization, scheduleCreateInput));
        return new ResponseEntity<>(resultMap, HttpStatus.OK);
    }

    @PostMapping("/temp")
    public ResponseEntity<Map<String, Long>> createTempSchedule(@ApiIgnore @RequestHeader("Authorization") String authorization,
                                                            @RequestBody @Valid ScheduleRequest.ScheduleTempCreateInput scheduleTempCreateInput){
        Map<String, Long> resultMap = new HashMap<>();
        resultMap.put("scheduleId", scheduleService.createTempSchedule(authorization, scheduleTempCreateInput));
        return new ResponseEntity<>(resultMap, HttpStatus.OK);
    }

    @PutMapping
    public ResponseEntity<Void> updateSchedule(@ApiIgnore @RequestHeader("Authorization") String authorization,
                                               @RequestBody @Valid ScheduleRequest.ScheduleUpdateInput scheduleUpdateInput){
        scheduleService.updateSchedule(authorization, scheduleUpdateInput);
        return new ResponseEntity<Void>(HttpStatus.OK);
    }

    @DeleteMapping("/{scheduleId}")
    public ResponseEntity<Void> deleteSchedule(@ApiIgnore @RequestHeader("Authorization") String authorization, @PathVariable Long scheduleId){
        scheduleService.deleteSchedule(authorization, scheduleId);
        return new ResponseEntity<Void>(HttpStatus.OK);
    }

    @GetMapping("/{scheduleId}")
    public ResponseEntity<ScheduleResponse.ScheduleDetailInfo> getScheduleDetail(@ApiIgnore @RequestHeader("Authorization") String authorization, @PathVariable Long scheduleId){
        return new ResponseEntity<>(scheduleService.getScheduleDetail(authorization,scheduleId), HttpStatus.OK);
    }

    @GetMapping
    public ResponseEntity<Map<String, List<ScheduleResponse.ScheduleListInfo>>> getScheduleList(@ApiIgnore @RequestHeader("Authorization") String authorization){
        Map<String, List<ScheduleResponse.ScheduleListInfo>> resultMap = new HashMap<>();
        resultMap.put("schedules", scheduleService.getScheduleList(authorization));
        return new ResponseEntity<>(resultMap, HttpStatus.OK);
    }

    @GetMapping("/monthly/{yearMonth}")
    public ResponseEntity<Map<String, List<String>>> getScheduleMonthList(@ApiIgnore @RequestHeader("Authorization") String authorization, @PathVariable String yearMonth){
        Map<String, List<String>> resultMap = new HashMap<>();
        resultMap.put("scheduledDates", scheduleService.getScheduleMonthList(authorization, yearMonth));
        return new ResponseEntity<>(resultMap, HttpStatus.OK);
    }

    @GetMapping("/monthly/{yearMonth}/list")
    public ResponseEntity<Map<String, List<ScheduleResponse.ScheduleListInfo>>> getScheduleDetailMonthList(@ApiIgnore @RequestHeader("Authorization") String authorization, @PathVariable String yearMonth){
        Map<String, List<ScheduleResponse.ScheduleListInfo>> resultMap = new HashMap<>();
        resultMap.put("schedules", scheduleService.getScheduleDetailMonthList(authorization, yearMonth));
        return new ResponseEntity<>(resultMap, HttpStatus.OK);
    }

    @GetMapping("/daily/{date}")
    public ResponseEntity<Map<String, List<ScheduleResponse.ScheduleListInfo>>> getScheduleDailyList(@ApiIgnore @RequestHeader("Authorization") String authorization, @PathVariable String date){
        Map<String, List<ScheduleResponse.ScheduleListInfo>> resultMap = new HashMap<>();
        resultMap.put("schedules", scheduleService.getScheduleDailyList(authorization, date));
        return new ResponseEntity<>(resultMap, HttpStatus.OK);
    }

    @GetMapping("/{scheduleId}/moment")
    public ResponseEntity<Map<String, List<MomentResponse.MomentSimpleList>>> getMomentListBySchedule(@ApiIgnore @RequestHeader("Authorization") String authorization, @PathVariable Long scheduleId){
        Map<String, List<MomentResponse.MomentSimpleList>> resultMap = new HashMap<>();
        resultMap.put("moments", scheduleService.getMomentListBySchedule(authorization, scheduleId));
        return new ResponseEntity<>(resultMap, HttpStatus.OK);
    }

    @GetMapping("/upcoming")
    public ResponseEntity<Map<String, List<ScheduleResponse.ScheduleListInfo>>> getScheduleByUpcoming(@ApiIgnore @RequestHeader("Authorization") String authorization){
        Map<String, List<ScheduleResponse.ScheduleListInfo>> resultMap = new HashMap<>();
        resultMap.put("schedules", scheduleService.getScheduleByUpcoming(authorization));
        return new ResponseEntity<>(resultMap, HttpStatus.OK);
    }

    @GetMapping("/unwritten")
    public ResponseEntity<Map<String, List<ScheduleResponse.ScheduleListInfo>>> getScheduleByUnwritten(@ApiIgnore @RequestHeader("Authorization") String authorization){
        Map<String, List<ScheduleResponse.ScheduleListInfo>> resultMap = new HashMap<>();
        resultMap.put("schedules", scheduleService.getScheduleByUnwritten(authorization));
        return new ResponseEntity<>(resultMap, HttpStatus.OK);
    }
}
