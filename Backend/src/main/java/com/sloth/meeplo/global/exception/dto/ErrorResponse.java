package com.sloth.meeplo.global.exception.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.sloth.meeplo.global.exception.code.ErrorCode;
import com.sloth.meeplo.global.exception.code.ValidationErrorCode;
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
    private String parameter;

    public static ResponseEntity<ErrorResponse> convertResponseEntity(ErrorCode errorCode) {
        return ResponseEntity
                .status(errorCode.getHttpStatus())
                .body(ErrorResponse.builder()
                        .name(errorCode.name())
                        .message(errorCode.getMessage())
                        .build());
    }

    public static ResponseEntity<ErrorResponse> toResponseEntity(ValidationErrorCode errorCode) {
        return ResponseEntity
                .status(errorCode.getHttpStatus())
                .body(ErrorResponse.builder()
                        .name(errorCode.name())
                        .parameter(errorCode.getParameter())
                        .message(errorCode.getMessage())
                        .build());
    }
}
