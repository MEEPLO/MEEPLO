package com.sloth.meeplo.global.type;

public enum TokenType {

    ACCESS_TOKEN(60 * 60 * 1000L),
    REFRESH_TOKEN(7 * 24 * 60 * 60 * 1000L);

    private long expiration;
    TokenType(long expiration) {
        this.expiration = expiration;
    }
    public long getExpiration() {
        return this.expiration;
    }
}
