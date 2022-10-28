package com.sloth.meeplo.global.exception.code;

import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
@AllArgsConstructor
public enum CommonErrorCode implements ErrorCode {
    NOT_EXIST_RESOURCE(HttpStatus.NOT_FOUND, "This resource doesn't exist.");

    private final HttpStatus httpStatus;
    private final String message;
}
