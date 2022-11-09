package com.sloth.meeploscrap.util.type;

import lombok.Getter;

@Getter
public enum LocationListSelector implements LocationSelector {

    PHOTO(".K0PDV"),
    KEYWORD(".sJgQj"),
    REVIEW_TAG(".nWiXa"),
    REVIEW_MENU_KEYWORD(".YwgDA > .PaWWQ:nth-child(1) .cbqXB span:nth-child(1)"),
    OPERATION_DAY(".kGc0c"),
    OPERATION_TIME(".qo7A2"),
    MENU_NAME(".ihmWt"),
    MENU_PRICE(".awlpp"),
    MENU_NAME_WITH_PHOTO(".MENyI"),
    MENU_PRICE_WITH_PHOTO(".gl2cc"),

    ;
    LocationListSelector(String selector) {
        this.selector = selector;
    }

    private final String selector;
}
