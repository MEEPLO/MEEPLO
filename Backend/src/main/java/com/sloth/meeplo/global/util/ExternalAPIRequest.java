package com.sloth.meeplo.global.util;

import com.google.gson.JsonArray;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import com.sloth.meeplo.global.exception.MeeploException;
import com.sloth.meeplo.global.exception.code.CommonErrorCode;
import com.sloth.meeplo.member.dto.request.MemberRequest;
import com.sloth.meeplo.recommendation.dto.common.Coordinate;
import lombok.extern.slf4j.Slf4j;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.io.*;
import java.net.HttpURLConnection;
import java.net.URL;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.util.HashMap;
import java.util.Map;

@Component
@Slf4j
public class ExternalAPIRequest {

    @Value("${kakao.restapikey}")
    private String kakaoRestApiKey;
    @Value("${OpenRouterService.api_key}")
    private String ORSApiKey;

    public String getHttpResponse(URL url, String token) {
        try {
            HttpURLConnection conn = (HttpURLConnection) url.openConnection();
            conn.setRequestMethod("GET");
            conn.setRequestProperty("Authorization", token);

            // log 관련 처리
//        int responseCode = conn.getResponseCode();

            BufferedReader br = new BufferedReader(new InputStreamReader(conn.getInputStream()));
            StringBuilder sb = new StringBuilder();

            String line = null;
            while((line = br.readLine()) != null) {
                sb.append(line);
            }

            return sb.toString();
        } catch(IOException e) {
            throw new MeeploException(CommonErrorCode.HTTP_RESPONSE_ERROR);
        }
    }

    public String postHttpResponse(URL url, String token, Map<String, Object> requestMap) {
        try {
            HttpURLConnection conn = (HttpURLConnection) url.openConnection();
            conn.setRequestMethod("POST");
            conn.setRequestProperty("Authorization", token);
            conn.setRequestProperty("Content-Type", "application/json; utf-8");
            conn.setDoOutput(true);
            String requestBody = new JSONObject(requestMap).toString();

            // log 관련 처리
//        int responseCode = conn.getResponseCode();

            BufferedWriter bw = new BufferedWriter(new OutputStreamWriter(conn.getOutputStream()));
            bw.write(requestBody);
            bw.flush();
            bw.close();

            BufferedReader br = new BufferedReader(new InputStreamReader(conn.getInputStream()));
            StringBuilder sb = new StringBuilder();

            String line = null;
            while((line = br.readLine()) != null) {
                sb.append(line);
            }

            return sb.toString();
        } catch(IOException e) {
            throw new MeeploException(CommonErrorCode.HTTP_RESPONSE_ERROR);
        }
    }

    public MemberRequest.MemberInfo getKakaoMemberInfo(String token) {
        URL url;
        try {
            url = new URL("https://kapi.kakao.com/v2/user/me");
        } catch(IOException e) {
            throw new MeeploException(CommonErrorCode.WRONG_URL);
        }

        String response = getHttpResponse(url, token);

        JsonObject fullResponse = JsonParser.parseString(response).getAsJsonObject();
        JsonObject kakaoAccount = fullResponse.get("kakao_account").getAsJsonObject();
        JsonObject profile = kakaoAccount.get("profile").getAsJsonObject();

        String id = fullResponse.get("id").toString();
        String nickname = profile.get("nickname").toString().replaceAll("\"","");
        String profileImageUrl = profile.get(("profile_image_url")).toString().replaceAll("\"", "");
        final String provider = "kakao";

        return MemberRequest.MemberInfo.builder()
                .username(nickname)
                .profilePhoto(profileImageUrl)
                .provider(provider)
                .providerId(id)
                .build();
    }

    public MemberRequest.ConvertedCoordinate getKakaoCoordinateInfo(String location) {
        String parameter =  String.format("query=%s", URLEncoder.encode(location, StandardCharsets.UTF_8));
        URL url;
        try {
            url = new URL("https://dapi.kakao.com/v2/local/search/address.json?"+parameter);
        } catch(IOException e) {
            throw new MeeploException(CommonErrorCode.WRONG_URL);
        }
        String header = " KakaoAK "+ kakaoRestApiKey;
        String response = getHttpResponse(url, header);
//        log.info(response);
        JsonObject fullResponse = JsonParser.parseString(response).getAsJsonObject();
        JsonArray documents = fullResponse.get("documents").getAsJsonArray();
        String y = documents.get(0).getAsJsonObject().get("y").getAsString();
        String x = documents.get(0).getAsJsonObject().get("x").getAsString();

        return MemberRequest.ConvertedCoordinate.builder()
                .lat(Double.parseDouble(y))
                .lng(Double.parseDouble(x))
                .build();
    }

    public String getKakaoAddressInfo(Double lng, Double lat) {

        String parameter =  String.format("x=%s&y=%s", URLEncoder.encode(lng.toString(), StandardCharsets.UTF_8), URLEncoder.encode(lat.toString(), StandardCharsets.UTF_8));
//        log.info(parameter);
        URL url;
        try {
            url = new URL("https://dapi.kakao.com/v2/local/geo/coord2regioncode.json?"+parameter);
        } catch(IOException e) {
            throw new MeeploException(CommonErrorCode.WRONG_URL);
        }
        String header = " KakaoAK "+ kakaoRestApiKey;
        String response = getHttpResponse(url, header);
//        log.info(response);
        JsonObject fullResponse = JsonParser.parseString(response).getAsJsonObject();
        JsonArray documents = fullResponse.get("documents").getAsJsonArray();
        String address = documents.get(0).getAsJsonObject().get("address_name").getAsString();

        return address;
    }

    public MemberRequest.ConvertedCoordinate getTimeAndRouteInfo(Coordinate start, Coordinate dest) {
        URL url;
        try {
            url = new URL("https://api.openrouteservice.org/v2/directions/driving-car/json");
        } catch(IOException e) {
            throw new MeeploException(CommonErrorCode.WRONG_URL);
        }
        String header = " "+ ORSApiKey;
        Map<String, Object> requestMap = new HashMap<>();
        requestMap.put("coordinates",new Double[][] {{start.getLng(),start.getLat()},{dest.getLng(), dest.getLat()}});

        String response = postHttpResponse(url, header, requestMap);
        log.info(response);
        JsonObject fullResponse = JsonParser.parseString(response).getAsJsonObject();

        //시간
        JsonArray routes = fullResponse.get("routes").getAsJsonArray();
        JsonObject summary = routes.get(0).getAsJsonObject().get("summary").getAsJsonObject();
        Double duration = summary.getAsJsonObject().get("duration").getAsDouble();
        log.info(duration.toString());
        String geometry = routes.get(0).getAsJsonObject().get("geometry").getAsString();
        log.info(geometry);
        log.info(GeometryDecoder.decodeGeometry(geometry, true).toString());
        return null;
    }
}
