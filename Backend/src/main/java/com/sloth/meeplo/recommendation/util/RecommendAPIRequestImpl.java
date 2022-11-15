package com.sloth.meeplo.recommendation.util;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.sloth.meeplo.global.exception.MeeploException;
import com.sloth.meeplo.global.exception.code.CommonErrorCode;
import com.sloth.meeplo.global.type.DefaultValue;
import com.sloth.meeplo.global.util.ExternalAPIRequest;
import com.sloth.meeplo.recommendation.dto.common.Coordinate;
import com.sloth.meeplo.recommendation.dto.response.MiddlePointResponse;
import lombok.RequiredArgsConstructor;
import lombok.SneakyThrows;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.net.MalformedURLException;
import java.net.URL;
import java.util.List;
import java.util.Map;

@RequiredArgsConstructor
@Component
public class RecommendAPIRequestImpl implements RecommendAPIRequest {

    private final ExternalAPIRequest externalAPIRequest;

    @Value("${FastApiAccess.address}")
    private String fastApiBaseAddress;

    @Override
    @SneakyThrows(JsonProcessingException.class)
    public Coordinate callMiddlePointAPI(List<MiddlePointResponse.RouteCoordinate> coordinates){

        URL url;
        try {
            url = new URL(fastApiBaseAddress + "/center");
        } catch (MalformedURLException e) {
            throw new MeeploException(CommonErrorCode.WRONG_URL);
        }

        return new ObjectMapper().readValue(externalAPIRequest.postHttpResponse(url, DefaultValue.NO_TOKEN.getValue(), Map.of("coordinates", coordinates)),
                Coordinate.class);
    }
}
