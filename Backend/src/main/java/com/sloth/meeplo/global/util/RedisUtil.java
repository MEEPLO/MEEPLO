package com.sloth.meeplo.global.util;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.stereotype.Component;

import java.time.Duration;

@Component
public class RedisUtil {

    @Autowired
    private StringRedisTemplate stringRedisTemplate;

    public String getData(String key) {
        return stringRedisTemplate.opsForValue().get(key);
    }

    public void setData(String key, String value) {
        stringRedisTemplate.opsForValue().set(key, value);
    }

    public void setDataWithExpiration(String key, String value, long expiration) {
        Duration timeout = Duration.ofMillis(expiration);
        stringRedisTemplate.opsForValue().set(key, value, timeout);
    }

    public void deleteData(String key) {
        stringRedisTemplate.delete(key);
    }
}
