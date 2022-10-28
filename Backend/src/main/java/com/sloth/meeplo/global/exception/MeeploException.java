package com.sloth.meeplo.global.exception;

import com.sloth.meeplo.global.exception.data.ExceptionData;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class MeeploException extends RuntimeException{
    private final ExceptionData exceptionData;
}
