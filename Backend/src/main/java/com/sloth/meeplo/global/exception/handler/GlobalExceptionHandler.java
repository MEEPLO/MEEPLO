package com.sloth.meeplo.global.exception.handler;

import com.sloth.meeplo.global.exception.MeeploException;
import com.sloth.meeplo.global.exception.dto.ErrorResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@Slf4j
@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(MeeploException.class)
    public ResponseEntity<?> handleMeeploException(MeeploException e){
        return ErrorResponse.convertResponseEntity(e.getErrorCode());
    }
}
