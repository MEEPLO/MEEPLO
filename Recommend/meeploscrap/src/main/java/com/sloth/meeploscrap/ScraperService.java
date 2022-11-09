package com.sloth.meeploscrap;

import com.sloth.meeploscrap.location.entity.type.LocationType;
import com.sloth.meeploscrap.location.repository.LocationRepository;
import com.sloth.meeploscrap.util.JsoupScraper;
import com.sloth.meeploscrap.util.SeleniumScraper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Pageable;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.Arrays;

@EnableScheduling
@Slf4j
@RequiredArgsConstructor
@Service
public class ScraperService {

    private final JsoupScraper jsoupScraper;
    private final LocationRepository locationRepository;

    private final int REQUEST_COUNT = 20;

    @Scheduled(fixedDelay = 500)
    @Transactional
    public void scrapDataFromWeb() {
        SeleniumScraper seleniumScraper = SeleniumScraper.builder().build();

        locationRepository.findByTypeOrderByIdDesc(null, Pageable.ofSize(REQUEST_COUNT))
                .forEach(loc -> {
                    String html = seleniumScraper.focusInitFrame(loc.getName() + " " + loc.getAddress());

                    if(Arrays.stream(LocationType.values()).anyMatch(v -> v.name().equals(html))) {
                        log.error("{} occurs error : {}", loc.getName(), html);
                        loc.overwriteType(LocationType.valueOf(html));
                        locationRepository.save(loc);
                        return;
                    }
                    jsoupScraper.scrapDetailData(html, loc, seleniumScraper.getDetailExplain());

                    jsoupScraper.scrapReviews(seleniumScraper.clickBar("리뷰"), loc);

                    loc.overwriteType(LocationType.AMUSE);

                    locationRepository.save(loc);
                });

        seleniumScraper.closeDriver();

        log.info("=====================");
    }

}
