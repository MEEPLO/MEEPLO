package com.sloth.meeplo.global.exception.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.sloth.meeplo.global.exception.code.ErrorCode;
import lombok.Builder;
import lombok.Getter;
import org.springframework.http.ResponseEntity;

import java.time.LocalDateTime;

@Getter
@Builder
public class ErrorResponse {
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm:ss", timezone = "Asia/Seoul")
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
