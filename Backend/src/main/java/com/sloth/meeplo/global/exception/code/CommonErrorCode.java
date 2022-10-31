package com.sloth.meeplo.global.exception.code;

import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
@AllArgsConstructor
public enum CommonErrorCode implements ErrorCode {
    NOT_EXIST_RESOURCE(HttpStatus.NOT_FOUND, "This resource doesn't exist."),
    UNAUTHORIZED(HttpStatus.UNAUTHORIZED, "접근할 권한이 없습니다.");

    private final HttpStatus httpStatus;
    private final String message;
}
