package com.sloth.meeplo.schedule.controller;

import com.sloth.meeplo.schedule.dto.response.KeywordResponse;
import com.sloth.meeplo.schedule.service.ScheduleService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequiredArgsConstructor
@RequestMapping("meeplo/api/v1/keyword")
public class KeywordController {

    private final ScheduleService scheduleService;

    @GetMapping
    public ResponseEntity<Map<String, List<KeywordResponse.KeyWordListInfo>>> getKeywordList(){
        Map<String, List<KeywordResponse.KeyWordListInfo>> resultMap = new HashMap<>();
        resultMap.put("keywords", scheduleService.getKeywordList());
        return new ResponseEntity<>(resultMap, HttpStatus.OK);
    }
}
