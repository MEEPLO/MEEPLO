package com.sloth.meeploscrap.util.type;

import lombok.Getter;

@Getter
public enum LocationListSelector implements LocationSelector {

    PHOTO(".K0PDV"),
    KEYWORD(".sJgQj"),
    OPERATION_DAY(".kGc0c"),
    OPERATION_TIME(".qo7A2")

    ;
    LocationListSelector(String selector) {
        this.selector = selector;
    }

    final String selector;
}
