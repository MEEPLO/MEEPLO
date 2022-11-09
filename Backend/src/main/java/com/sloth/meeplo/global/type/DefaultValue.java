package com.sloth.meeplo.global.type;

import lombok.Getter;

@Getter
public enum DefaultValue {

    AMUSE_REPRESENTATIVE_PHOTO("https://popcat.click/twitter-card.jpg")
    ;

    private String value;

    DefaultValue(String value) {
        this.value = value;
    }
}
