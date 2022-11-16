package com.sloth.meeplo.recommendation.util;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.sloth.meeplo.global.exception.MeeploException;
import com.sloth.meeplo.global.exception.code.CommonErrorCode;
import com.sloth.meeplo.global.type.DefaultValue;
import com.sloth.meeplo.global.util.ExternalAPIRequest;
import com.sloth.meeplo.recommendation.dto.common.Coordinate;
import com.sloth.meeplo.recommendation.dto.request.AmuseRecommendRequest;
import com.sloth.meeplo.recommendation.dto.response.KeywordVectorResponse;
import com.sloth.meeplo.recommendation.dto.response.MiddlePointResponse;
import lombok.RequiredArgsConstructor;
import lombok.SneakyThrows;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.net.MalformedURLException;
import java.net.URL;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Component
public class RecommendAPIRequestImpl implements RecommendAPIRequest {

    private final ExternalAPIRequest externalAPIRequest;

    @Value("${FastApiAccess.address}")
    private String fastApiBaseAddress;

    @Override
    @SneakyThrows(JsonProcessingException.class)
    public Coordinate callMiddlePointAPI(List<MiddlePointResponse.RouteCoordinate> coordinates){

        return new ObjectMapper().readValue(postToFastAPI("/center","coordinates", coordinates), Coordinate.class);
    }

    @Override
    @SneakyThrows(JsonProcessingException.class)
    public KeywordVectorResponse callWord2VecAPI(List<AmuseRecommendRequest.Keyword> keywords) {
        return new ObjectMapper().readValue(postToFastAPI("/amuse", "tags",
                keywords.stream().map(AmuseRecommendRequest.Keyword::getContent).collect(Collectors.toList())), KeywordVectorResponse.class);
    }


    private String postToFastAPI(String uri, String mapKey, Object values) {
        URL url;

        try {
            url = new URL(fastApiBaseAddress + uri);
        } catch (MalformedURLException e) {
            throw new MeeploException(CommonErrorCode.WRONG_URL);
        }

        return externalAPIRequest.postHttpResponse(url, DefaultValue.NO_TOKEN.getValue(), Map.of(mapKey, values));
    }
}
