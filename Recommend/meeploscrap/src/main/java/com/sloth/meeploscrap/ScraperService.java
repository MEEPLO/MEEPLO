package com.sloth.meeploscrap;

import com.sloth.meeploscrap.location.entity.type.LocationType;
import com.sloth.meeploscrap.location.repository.LocationRepository;
import com.sloth.meeploscrap.util.JsoupScraper;
import com.sloth.meeploscrap.util.SeleniumScraper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

@Slf4j
@RequiredArgsConstructor
@Service
public class ScraperService {

    private final JsoupScraper jsoupScraper;
    private final LocationRepository locationRepository;

    @Transactional
    public String scrapDataFromWeb() {
        SeleniumScraper seleniumScraper = SeleniumScraper.builder().build();

        locationRepository.findByType(null, Pageable.ofSize(10))
                .forEach(loc -> {
                    String html = seleniumScraper.focusInitFrame(loc.getName() + " " + loc.getAddress());

                    if(html == null)
                        return;

                    jsoupScraper.scrapDetailData(html, loc, seleniumScraper.getDetailExplain());

                    jsoupScraper.scrapReviews(seleniumScraper.clickBar("리뷰"), loc);

                    loc.overwriteType(LocationType.AMUSE);

                    locationRepository.save(loc);
                });

        seleniumScraper.closeDriver();

        return "good";
    }

}
