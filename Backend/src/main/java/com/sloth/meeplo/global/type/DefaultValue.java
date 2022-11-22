package com.sloth.meeplo.global.type;

import lombok.Getter;

@Getter
public enum DefaultValue {

    AMUSE_REPRESENTATIVE_PHOTO("https://meeplo-bucket.s3.ap-northeast-2.amazonaws.com/defaultImage.png"),

    STATION_AVERAGE_TIME("-1"),
    STATION_SEARCH_RADIUS("2"),
    STATION_LIMIT("2"),

    AMUSE_SEARCH_RADIUS("0.5"),
    AMUSE_SEARCH_CATEGORY("음식"),

    NO_TOKEN("NO_TOKEN")
    ;

    private final String value;

    DefaultValue(String value) {
        this.value = value;
    }
}
