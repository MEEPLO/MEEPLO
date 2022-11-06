package com.sloth.meeploscrap.util;

import com.sloth.meeploscrap.location.entity.Location;
import com.sloth.meeploscrap.location.entity.LocationInfo;
import com.sloth.meeploscrap.location.entity.LocationKeyword;
import com.sloth.meeploscrap.location.entity.LocationPhoto;
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
import org.springframework.stereotype.Component;

import javax.transaction.Transactional;
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



        log.info(parsedHTML.select(LocationListSelector.OPERATION_DAY.getSelector()).text());
        log.info(parsedHTML.select(LocationListSelector.OPERATION_TIME.getSelector()).text());
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
}
