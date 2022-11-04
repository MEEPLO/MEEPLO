package com.sloth.meeploscrap.util.scraper;

import lombok.extern.slf4j.Slf4j;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.select.Elements;
import org.springframework.stereotype.Component;

import java.util.Arrays;
import java.util.Map;
import java.util.StringTokenizer;
import java.util.regex.Pattern;
import java.util.stream.Collectors;

@Slf4j
@Component
public class JsoupScraper implements Scraper{

    public void scrapDetailData(String html) {
        Document parsedHTML = Jsoup.parse(html);

        Elements elements = parsedHTML.select(DETAIL_DATA_CSS_SELECTOR + "li.SF_Mq.SjF5j > div > span.dry01");

        Elements photos = parsedHTML.select(".K0PDV");

        log.info(photos.stream().map(p ->  p.attr("style"))
                .map(s -> Arrays.stream(s.split(";"))
                            .filter(element -> element.startsWith("background-image"))
                            .map(b -> b.replace("background-image:url(", "").replace(")", ""))
                            .findFirst().orElse(null))
                .filter(url -> url != null)
                .collect(Collectors.toList()).toString());

        Elements keywords = parsedHTML.select(".sJgQj");

        log.info(keywords.stream().map(k -> k.text().replace(", ", "")).collect(Collectors.toList()).toString());

        if(!elements.isEmpty()) {
            log.info(elements.first().text());
        }
    }

    private Map<String, String> initAccessibleMap() {
        return Map.ofEntries(
                Map.entry("phoneNumber", "li.SF_Mq.SjF5j > div > span.dry01"),
                Map.entry("simpleDescription", "li.SF_Mq.I5Ypx > div > div > span"),
                Map.entry("detailDescription", "li.SF_Mq.I5Ypx > div > a > span.zPfVt"),
                Map.entry("link", "li.SF_Mq.nKpE4 > div > div > a"),
                Map.entry("photos", ".K0PDV"),
                Map.entry("keywords", ".sJgQj")
        );
    }

}
