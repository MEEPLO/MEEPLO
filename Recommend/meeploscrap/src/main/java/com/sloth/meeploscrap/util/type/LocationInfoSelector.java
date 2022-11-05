package com.sloth.meeploscrap.util.type;

import lombok.Getter;

import static com.sloth.meeploscrap.util.Scraper.DETAIL_DATA_CSS_SELECTOR;

@Getter
public enum LocationInfoSelector implements LocationSelector {
    PHONE_NUMBER(DETAIL_DATA_CSS_SELECTOR + "li.SF_Mq.SjF5j > div > span.dry01"),
    SIMPLE_DESCRIPTION(DETAIL_DATA_CSS_SELECTOR + "li.SF_Mq.I5Ypx > div > div > span"),
    DETAIL_DESCRIPTION(DETAIL_DATA_CSS_SELECTOR + "li.SF_Mq.I5Ypx > div > a > span.zPfVt"),
    LINK(DETAIL_DATA_CSS_SELECTOR + "li.SF_Mq.nKpE4 > div > div > a");

    LocationInfoSelector(String selector) {
        this.selector = selector;
    }
    final String selector;
}
