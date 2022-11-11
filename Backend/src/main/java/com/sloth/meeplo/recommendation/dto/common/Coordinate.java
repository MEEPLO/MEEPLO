package com.sloth.meeplo.recommendation.dto.common;

import lombok.*;
import lombok.experimental.SuperBuilder;

@ToString
@Getter
@NoArgsConstructor
@AllArgsConstructor(access = AccessLevel.PROTECTED)
public class Coordinate {
    private double lat;
    private double lng;
}
