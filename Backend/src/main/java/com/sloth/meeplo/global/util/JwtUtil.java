package com.sloth.meeplo.global.util;

import com.sloth.meeplo.global.type.TokenType;
import com.sloth.meeplo.member.entity.Member;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.util.Date;

@Component
@RequiredArgsConstructor
public class JwtUtil {

    @Value("${jwt.secret}")
    private String secretKey;

    private final long ACCESS_TOKEN_VALIDITY = 60 * 60L;
    private final long REFRESH_TOKEN_VALIDITY = 30 * 24 * 60 * 60L;

    public String generateJwtToken(Member member, TokenType tokenType) {
        Date now = new Date();
        Date expiration = new Date(now.getTime() + tokenType.getExpiration());
        Claims claims = null;
        if(tokenType.equals(TokenType.ACCESS_TOKEN)) claims = Jwts.claims().setSubject(member.getId().toString());

        return Jwts.builder()
                .setClaims(claims)
                .setIssuedAt(now)
                .setExpiration(expiration)
                .signWith(SignatureAlgorithm.HS256, secretKey)
                .compact();
    }

    public long getUserIdFromToken(String token) {
        try {
            return Long.parseLong(Jwts.parser().setSigningKey(secretKey).parseClaimsJws(token).getBody().getSubject());
        } catch(Exception e) {
            e.printStackTrace();
        }

        return -1L;
    }
}
