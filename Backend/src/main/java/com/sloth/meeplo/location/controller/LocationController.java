package com.sloth.meeplo.location.controller;

import com.sloth.meeplo.location.service.LocationService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("meeplo/api/v1/location")
public class LocationController {

    private final LocationService locationService;
    @GetMapping
    public ResponseEntity<Map<String, List>> getNearLocation(@RequestParam Double lat, @RequestParam Double lng, @RequestParam Double radius){

        Map<String, List> resultMap = new HashMap<>();
        resultMap.put("locations", locationService.getNearLocation(lat,lng,radius));
        return new ResponseEntity<>(resultMap, HttpStatus.OK);
    }
}
