package com.sloth.meeploscrap.util;

import com.sloth.meeploscrap.location.entity.*;
import com.sloth.meeploscrap.location.repository.*;
import com.sloth.meeploscrap.util.type.LocationInfoSelector;
import com.sloth.meeploscrap.util.type.LocationListSelector;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.springframework.stereotype.Component;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.regex.Matcher;
import java.util.regex.Pattern;
import java.util.stream.Collectors;

@Slf4j
@RequiredArgsConstructor
@Component
public class JsoupScraper implements Scraper{

    private final LocationInfoRepository locationInfoRepository;
    private final LocationPhotoRepository locationPhotoRepository;
    private final LocationKeywordRepository locationKeywordRepository;
    private final LocationTimeRepository locationTimeRepository;
    private final LocationContentRepository locationContentRepository;

    @Transactional
    public void scrapDetailData(String html, Location location, String detailExplain) {
        Document parsedHTML = Jsoup.parse(html);

        String phoneNumber = extractFirstText(parsedHTML, LocationInfoSelector.PHONE_NUMBER);
        String link = extractFirstText(parsedHTML, LocationInfoSelector.LINK);
        String explain = extractExplain(parsedHTML, detailExplain);

        if(!phoneNumber.isEmpty() || !link.isEmpty() || !explain.isEmpty()) {
            locationInfoRepository.save(LocationInfo.builder()
                    .location(location)
                    .phoneNumber(phoneNumber)
                    .link(link)
                    .description(explain)
                    .build()
            );
        }

        Pattern pattern = Pattern.compile("background-image:url\\(\"(.+)\"\\);");

        locationPhotoRepository.saveAll(parsedHTML.select(LocationListSelector.PHOTO.getSelector()).stream()
                        .map(s -> {
                            Matcher matcher = pattern.matcher(s.attr("style"));
                            return matcher.find() ? matcher.group(1) : null;
                        })
                        .filter(Objects::nonNull)
                        .map(url -> LocationPhoto.builder()
                                .location(location)
                                .photo(url)
                                .build())
                        .collect(Collectors.toList()));


        locationKeywordRepository.saveAll(parsedHTML.select(LocationListSelector.KEYWORD.getSelector()).stream()
                        .map(k -> LocationKeyword.builder()
                                .location(location)
                                .keyword(k.text().replace(", ", ""))
                                .build())
                        .collect(Collectors.toList()));

        List<LocationContent> menuList = extractMenuData(parsedHTML, location,
                LocationListSelector.MENU_NAME, LocationListSelector.MENU_PRICE);

        locationContentRepository.saveAll(!menuList.isEmpty() ? menuList :
                extractMenuData(parsedHTML, location,
                        LocationListSelector.MENU_NAME_WITH_PHOTO, LocationListSelector.MENU_PRICE_WITH_PHOTO));

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

    private List<String> getValuesFromSelector(Document doc, LocationListSelector selector) {
        return doc.select(selector.getSelector()).stream()
                .map(Element::text)
                .collect(Collectors.toList());
    }

    private String extractExplain(Document doc, String detail) {
        String summary = extractFirstText(doc, LocationInfoSelector.SIMPLE_DESCRIPTION);

        return summary.isEmpty() ? detail : summary;
    }

    private List<LocationTime> extractOperationData(Document doc, Location location) {
        List<String> opDay = getValuesFromSelector(doc, LocationListSelector.OPERATION_DAY);

        List<String> opTime = getValuesFromSelector(doc, LocationListSelector.OPERATION_TIME);

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

    private List<LocationContent> extractMenuData(Document doc, Location location,
                                                  LocationListSelector name, LocationListSelector price) {
        List<String> nameList = getValuesFromSelector(doc, name);
        List<String> priceList = getValuesFromSelector(doc, price);

        List<LocationContent> menuData = new ArrayList<>();

        for(int i=0;i<nameList.size();i++) {
            menuData.add(LocationContent.builder()
                            .location(location)
                            .content(nameList.get(i))
                            .price(priceList.get(i))
                        .build());
        }

        return menuData;
    }
}
