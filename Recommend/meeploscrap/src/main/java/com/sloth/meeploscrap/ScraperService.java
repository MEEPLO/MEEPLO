package com.sloth.meeploscrap;

import com.sloth.meeploscrap.util.scraper.JsoupScraper;
import com.sloth.meeploscrap.util.scraper.SeleniumScraper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
public class ScraperService {

    private final JsoupScraper jsoupScraper;

    public String scrapDataFromWeb(String location) {

        String clickableExplainRestaurant = "방이편백육분삼십 서울 강남구 테헤란로29길";
        String nonClickableExplainRestaurant = "바게트케이 서울특별시 강남구 테헤란로34길 21-10";

        SeleniumScraper seleniumScraper = SeleniumScraper.builder()
                .location(location)
                .build();

        String html = seleniumScraper.focusInitFrame();

        jsoupScraper.scrapDetailData(html);

        return "good";
    }

}
