package com.sloth.meeplo.global.exception.data;

import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
@AllArgsConstructor
public enum CommonExceptionData implements ExceptionData{
    NOT_EXIST_RESOURCE(HttpStatus.NOT_FOUND, "This resource doesn't exist.");

    private final HttpStatus httpStatus;
    private final String message;
}
