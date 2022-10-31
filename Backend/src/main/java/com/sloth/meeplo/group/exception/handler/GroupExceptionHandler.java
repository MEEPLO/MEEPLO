package com.sloth.meeplo.group.exception.handler;

import com.sloth.meeplo.global.exception.dto.ErrorResponse;
import com.sloth.meeplo.group.exception.GroupException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@Slf4j
@RestControllerAdvice
public class GroupExceptionHandler {

    @ExceptionHandler(GroupException.class)
    public ResponseEntity<?> handleGroupException(GroupException e){
        return ErrorResponse.convertResponseEntity(e.getErrorCode());
    }
}
