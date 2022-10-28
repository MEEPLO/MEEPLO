package com.sloth.meeplo.global.exception;

import com.sloth.meeplo.global.exception.code.ErrorCode;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class MeeploException extends RuntimeException{
    private final ErrorCode errorCode;
}
