package com.sloth.meeplo.global.util;

import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import com.sloth.meeplo.member.dto.request.MemberRequest;
import org.springframework.stereotype.Component;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;

@Component
public class ExternalAPIRequest {

    public MemberRequest.MemberInfo getKakaoMemberInfo(String token) throws IOException {
        URL url = new URL("https://kapi.kakao.com/v2/user/me");
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

        JsonObject response = JsonParser.parseString(sb.toString()).getAsJsonObject();
        JsonObject kakaoAccount = response.get("kakao_account").getAsJsonObject();
        JsonObject profile = kakaoAccount.get("profile").getAsJsonObject();
        String id = response.get("id").toString();
        String nickname = profile.get("nickname").toString().replaceAll("\"","");
        String profileImageUrl = profile.get(("profile_image_url")).toString().replaceAll("\"", "");

        return MemberRequest.MemberInfo.builder()
                .username(nickname)
                .profilePhoto(profileImageUrl)
                .provider("kakao")
                .providerId(id)
                .build();
    }
}
