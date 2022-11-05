package com.sloth.meeploscrap;

import com.sloth.meeploscrap.location.repository.LocationRepository;
import com.sloth.meeploscrap.util.JsoupScraper;
import com.sloth.meeploscrap.util.SeleniumScraper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Slf4j
@RequiredArgsConstructor
@Service
public class ScraperService {

    private final JsoupScraper jsoupScraper;
    private final LocationRepository locationRepository;

    public String scrapDataFromWeb() {

        String clickableExplainRestaurant = "방이편백육분삼십 서울 강남구 테헤란로29길";
        String nonClickableExplainRestaurant = "바게트케이 서울특별시 강남구 테헤란로34길 21-10";

        locationRepository.findByType(null, Pageable.ofSize(10))
                .forEach(loc -> {
                    SeleniumScraper seleniumScraper = SeleniumScraper.builder()
                            .location(loc.getName() + " " + loc.getAddress())
                            .build();

                    jsoupScraper.scrapDetailData(seleniumScraper.focusInitFrame(), loc);

                    seleniumScraper.closeDriver();
                });

        return "good";
    }

}
