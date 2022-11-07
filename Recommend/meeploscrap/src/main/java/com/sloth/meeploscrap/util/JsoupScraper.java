package com.sloth.meeploscrap.util;

import com.sloth.meeploscrap.location.entity.*;
import com.sloth.meeploscrap.location.repository.LocationInfoRepository;
import com.sloth.meeploscrap.location.repository.LocationKeywordRepository;
import com.sloth.meeploscrap.location.repository.LocationPhotoRepository;
import com.sloth.meeploscrap.location.repository.LocationTimeRepository;
import com.sloth.meeploscrap.util.type.LocationInfoSelector;
import com.sloth.meeploscrap.util.type.LocationListSelector;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.openqa.selenium.By;
import org.springframework.stereotype.Component;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.regex.Matcher;
import java.util.regex.Pattern;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@Slf4j
@RequiredArgsConstructor
@Component
public class JsoupScraper implements Scraper{

    private final LocationInfoRepository locationInfoRepository;
    private final LocationPhotoRepository locationPhotoRepository;
    private final LocationKeywordRepository locationKeywordRepository;
    private final LocationTimeRepository locationTimeRepository;

    @Transactional
    public void scrapDetailData(String html, Location location) {
        Document parsedHTML = Jsoup.parse(html);

        locationInfoRepository.save(LocationInfo.builder()
                .location(location)
                .phoneNumber(extractFirstText(parsedHTML, LocationInfoSelector.PHONE_NUMBER))
                .link(extractFirstText(parsedHTML, LocationInfoSelector.LINK))
                .description(extractExplain(parsedHTML))
                .build()
        );

        Pattern pattern = Pattern.compile("background-image:url\\(\"(.+)\"\\);");

        locationPhotoRepository.saveAll(parsedHTML.select(LocationListSelector.PHOTO.getSelector()).stream()
                        .map(s -> {
                            Matcher matcher = pattern.matcher(s.attr("style"));
                            return matcher.find() ? matcher.group(1) : null;
                        })
                        .filter(Objects::nonNull)
                        .map(link -> LocationPhoto.builder()
                                .location(location)
                                .photo(link)
                                .build())
                        .collect(Collectors.toList()));


        locationKeywordRepository.saveAll(parsedHTML.select(LocationListSelector.KEYWORD.getSelector()).stream()
                        .map(k -> LocationKeyword.builder()
                                .location(location)
                                .keyword(k.text().replace(", ", ""))
                                .build())
                        .collect(Collectors.toList()));

        Stream.of(new String[]{".ihmWt", ".awlpp", ".MENyI", ".gl2cc"})
                .forEach(c -> log.info(parsedHTML.select(c).stream()
                            .map(Element::text)
                            .collect(Collectors.toList()).toString())
                );

        locationTimeRepository.saveAll(extractOperationData(parsedHTML, location));

    }

    @Transactional
    public void scrapReviews(String html, Location location) {
        if(html == null)
            return;

        Document parsedHTML = Jsoup.parse(html);

        locationKeywordRepository.saveAll(parsedHTML.select(LocationListSelector.REVIEW_TAG.getSelector()).stream()
                .map(r -> LocationKeyword.builder()
                        .location(location)
                        .keyword(r.text().replace("\"", ""))
                        .build())
                .collect(Collectors.toList()));

        locationKeywordRepository.saveAll(parsedHTML.select(LocationListSelector.REVIEW_MENU_KEYWORD.getSelector()).stream()
                .map(c -> LocationKeyword.builder()
                        .location(location)
                        .keyword(c.text())
                        .build())
                .collect(Collectors.toList()));
    }

    private String extractFirstText(Document doc, LocationInfoSelector selector) {
        return doc.select(selector.getSelector()).stream()
                .findFirst()
                .map(Element::text)
                .orElse("");
    }

    private String extractExplain(Document doc) {
        String detail = extractFirstText(doc, LocationInfoSelector.DETAIL_DESCRIPTION);

        return !detail.isEmpty() ? detail : extractFirstText(doc, LocationInfoSelector.SIMPLE_DESCRIPTION);
    }

    private List<LocationTime> extractOperationData(Document doc, Location location) {
        List<String> opDay = doc.select(LocationListSelector.OPERATION_DAY.getSelector()).stream()
                .map(Element::text)
                .collect(Collectors.toList());

        List<String> opTime = doc.select(LocationListSelector.OPERATION_TIME.getSelector()).stream()
                .map(Element::text)
                .collect(Collectors.toList());

        List<LocationTime> opData = new ArrayList<>();

        // TODO : stream을 이용하여 반환하도록 바꿔보기
        for(int i=0;i<opDay.size();i++) {
            opData.add(LocationTime.builder()
                    .location(location)
                    .day(opDay.get(i))
                    .content(opTime.get(i))
                    .build());
        }

        return opData;
    }
}
