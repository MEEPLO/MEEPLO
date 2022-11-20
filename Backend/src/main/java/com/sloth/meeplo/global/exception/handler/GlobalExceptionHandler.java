package com.sloth.meeplo.global.exception.handler;

import com.sloth.meeplo.global.exception.MeeploException;
import com.sloth.meeplo.global.exception.code.ValidationErrorCode;
import com.sloth.meeplo.global.exception.dto.ErrorResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.net.BindException;

@Slf4j
@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(MeeploException.class)
    public ResponseEntity<ErrorResponse> handleMeeploException(MeeploException e){
        return ErrorResponse.convertResponseEntity(e.getErrorCode());
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ErrorResponse> handleValidationException(MethodArgumentNotValidException e){
        BindingResult bindingResult = e.getBindingResult();

        int lastIndex = bindingResult.getAllErrors().size() - 1;
        FieldError fieldError = (FieldError) bindingResult.getAllErrors().get(lastIndex);
        ValidationErrorCode validationErrorCode = ValidationErrorCode.builder()
                .message(fieldError.getDefaultMessage())
                .parameter(fieldError.getField())
                .build();
        log.info("[Binding Error] : Field = {}, Message = {}", fieldError.getDefaultMessage(), fieldError.getField());

        return ErrorResponse.toResponseEntity(validationErrorCode);
    }
}
