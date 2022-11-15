package com.sloth.meeplo.global.type;

import lombok.Getter;

@Getter
public enum DefaultValue {

    AMUSE_REPRESENTATIVE_PHOTO("https://meeplo-bucket.s3.ap-northeast-2.amazonaws.com/defaultImage.png"),
    STATION_AVERAGE_TIME("-1"),

    STATION_SEARCH_RADIUS("1")
    ;

    private String value;

    DefaultValue(String value) {
        this.value = value;
    }
}
