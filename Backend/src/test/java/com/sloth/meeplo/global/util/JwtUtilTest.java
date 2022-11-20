//package com.sloth.meeplo.global.util;
//
//import com.sloth.meeplo.global.type.TokenType;
//import com.sloth.meeplo.member.entity.Member;
//import io.jsonwebtoken.Claims;
//import io.jsonwebtoken.Jwts;
//import org.junit.jupiter.api.Test;
//import org.junit.jupiter.api.extension.ExtendWith;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.beans.factory.annotation.Value;
//import org.springframework.boot.test.context.SpringBootTest;
//import org.springframework.test.context.junit.jupiter.SpringExtension;
//
//import java.util.Date;
//
//import static org.junit.jupiter.api.Assertions.assertEquals;
//
//@SpringBootTest(classes = {JwtUtil.class})
//@ExtendWith(SpringExtension.class)
//public class JwtUtilTest {
//
//    @Autowired
//    private JwtUtil jwtUtil;
////    @Value("${jwt.secret}")
//    private String secretKey = "";
//
//    @Test
//    void generateJwtToken_Test() {
//        Member member = Member.builder().build();
//        String accessToken = jwtUtil.generateJwtToken(member, TokenType.ACCESS_TOKEN);
//        String refreshToken = jwtUtil.generateJwtToken(member, TokenType.REFRESH_TOKEN);
//
//        Claims accessTokenClaims = Jwts.parser().setSigningKey(secretKey).parseClaimsJws(accessToken).getBody();
//        Claims refreshTokenClaims = Jwts.parser().setSigningKey(secretKey).parseClaimsJws(refreshToken).getBody();
//
//        Date accessTokenExpiration = accessTokenClaims.getExpiration();
//        Date accessTokenIssuedAt = accessTokenClaims.getIssuedAt();
//        Date refreshTokenExpiration = refreshTokenClaims.getExpiration();
//        Date refreshTokenIssuedAt = refreshTokenClaims.getIssuedAt();
//
//        long accessTokenLife = accessTokenExpiration.getTime() -  accessTokenIssuedAt.getTime();
//        long refreshTokenLife = refreshTokenExpiration.getTime() - refreshTokenIssuedAt.getTime();
//
//        assertEquals(accessTokenLife, 60 * 60 * 1000L);
//        assertEquals(refreshTokenLife, 30 * 24 * 60 * 60 * 1000L);
//    }
//}
