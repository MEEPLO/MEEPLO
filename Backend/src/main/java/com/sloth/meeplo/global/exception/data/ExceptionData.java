package com.sloth.meeplo.global.exception.data;

import org.springframework.http.HttpStatus;

public interface ExceptionData {
    String name();
    HttpStatus getHttpStatus();
    String getMessage();
}
