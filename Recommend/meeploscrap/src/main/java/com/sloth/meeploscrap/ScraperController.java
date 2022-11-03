package com.sloth.meeploscrap;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RequiredArgsConstructor
@RestController
public class ScraperController {
    private final ScraperService scraperService;

    @GetMapping
    public ResponseEntity<String> test(String location) {
        return ResponseEntity.ok().body(scraperService.scrapDataFromWeb(location));
    }
}
