package com.sloth.meeploscrap.util.exception;

import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@Slf4j
@RestControllerAdvice
public class ScrapExceptionHandler {

    @ExceptionHandler(Exception.class)
    public void handleMeeploException(Exception e){
        log.error("{} occurred", e.getMessage());
    }

}
