package com.sloth.meeplo.recommendation.dto.response;

import lombok.Getter;
import lombok.ToString;

import java.util.List;

@ToString
@Getter
public class KeywordVectorResponse {
    private List<String> tags;
}
