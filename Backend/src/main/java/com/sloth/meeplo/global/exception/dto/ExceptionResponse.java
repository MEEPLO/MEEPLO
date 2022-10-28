package com.sloth.meeplo.global.exception.dto;

import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
@Builder
public class ExceptionResponse {
    private final LocalDateTime occurredTime = LocalDateTime.now();
    private String name;
    private String message;
}
