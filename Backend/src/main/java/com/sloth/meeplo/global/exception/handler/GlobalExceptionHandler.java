package com.sloth.meeplo.global.exception.handler;

import com.sloth.meeplo.global.exception.MeeploException;
import com.sloth.meeplo.global.exception.dto.ExceptionResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(Exception.class)
    public ResponseEntity<?> handleMeeploException(MeeploException e){
        return ResponseEntity.status(e.getExceptionData().getHttpStatus())
                .body(ExceptionResponse.builder()
                        .name(e.getExceptionData().name())
                        .message(e.getExceptionData().getMessage()));
    }
}
