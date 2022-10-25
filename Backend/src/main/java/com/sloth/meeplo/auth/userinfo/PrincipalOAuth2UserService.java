package com.sloth.meeplo.auth.userinfo;

import com.sloth.meeplo.auth.PrincipalDetails;
import com.sloth.meeplo.member.entity.Member;
import com.sloth.meeplo.member.repository.MemberRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;

@Service
public class PrincipalOAuth2UserService extends DefaultOAuth2UserService {

    @Autowired
    private MemberRepository memberRepository;

    @Override
    public OAuth2User loadUser(OAuth2UserRequest userRequest) throws OAuth2AuthenticationException {

        OAuth2User oAuth2User = super.loadUser(userRequest);

        OAuth2UserInfo oAuth2UserInfo = null;
        String provider = userRequest.getClientRegistration().getRegistrationId();

        if(provider.equals("kakao")) {
            oAuth2UserInfo = new KakaoUserInfo(oAuth2User.getAttributes());
        }

        String providerId = oAuth2UserInfo.getProviderId();
        String username = provider + "_" + providerId;
        String profilePhoto = (String)oAuth2UserInfo.getAttributes().get("profile_image_url");

        Member member = memberRepository.findByUsername(username).orElse(null);

        if(member == null) {
            member = Member.oAuth2Register()
                    .username(username)
                    .profilePhoto(profilePhoto)
                    .provider(provider)
                    .providerId(providerId)
                    .build();

            memberRepository.save(member);
        }

        return new PrincipalDetails(member, oAuth2UserInfo.getAttributes());
    }

}
