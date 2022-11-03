package com.sloth.meeploscrap.util.scraper;

import lombok.extern.slf4j.Slf4j;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.select.Elements;
import org.springframework.stereotype.Component;

import java.util.Map;
import java.util.stream.Collectors;

@Slf4j
@Component
public class JsoupScraper implements Scraper{

    public void scrapDetailData(String html) {
        Document parsedHTML = Jsoup.parse(html);

        Elements elements = parsedHTML.select(DETAIL_DATA_CSS_SELECTOR + "li.SF_Mq.SjF5j > div > span.dry01");

        if(!elements.isEmpty()) {
            log.info(elements.first().text());
        }
    }

    private Map<String, String> initAccessibleMap() {
        return Map.ofEntries(
                Map.entry("phoneNumber", "li.SF_Mq.SjF5j > div > span.dry01"),
                Map.entry("simpleDescription", "li.SF_Mq.I5Ypx > div > div > span"),
                Map.entry("detailDescription", "li.SF_Mq.I5Ypx > div > a > span.zPfVt"),
                Map.entry("link", "li.SF_Mq.nKpE4 > div > div > a")
        );
    }

}
