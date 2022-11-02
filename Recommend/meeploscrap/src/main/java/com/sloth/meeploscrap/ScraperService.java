package com.sloth.meeploscrap;

import com.sloth.meeploscrap.util.scraper.SeleniumScraper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
public class ScraperService {
    public String scrapDataFromWeb() {
        SeleniumScraper seleniumScraper = SeleniumScraper.builder().location("방이편백육분삼십 서울 강남구 테헤란로29길").build();

        return seleniumScraper.scrapWholeHTML();
    }
}
