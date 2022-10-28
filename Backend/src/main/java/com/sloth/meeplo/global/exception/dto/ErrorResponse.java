package com.sloth.meeplo.global.exception.dto;

import com.sloth.meeplo.global.exception.code.ErrorCode;
import lombok.Builder;
import lombok.Getter;
import org.springframework.http.ResponseEntity;

import java.time.LocalDateTime;

@Getter
@Builder
public class ErrorResponse {
    private final LocalDateTime occurredTime = LocalDateTime.now();
    private final String name;
    private final String message;

    public static ResponseEntity<ErrorResponse> convertResponseEntity(ErrorCode errorCode) {
        return ResponseEntity
                .status(errorCode.getHttpStatus())
                .body(ErrorResponse.builder()
                        .name(errorCode.name())
                        .message(errorCode.getMessage())
                        .build());
    }
}
