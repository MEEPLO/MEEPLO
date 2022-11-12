package com.sloth.meeplo.global.util;

import com.google.gson.JsonArray;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import com.sloth.meeplo.global.exception.MeeploException;
import com.sloth.meeplo.global.exception.code.CommonErrorCode;
import com.sloth.meeplo.member.dto.request.MemberRequest;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;

@Component
@Slf4j
public class ExternalAPIRequest {

    @Value("${kakao.restapikey}")
    private String restapikey;

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
        String header = " KakaoAK "+restapikey;
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
}
