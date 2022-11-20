package com.sloth.meeplo.global.exception;

import com.sloth.meeplo.global.exception.code.ErrorCode;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
public class MeeploException extends RuntimeException{
    private final ErrorCode errorCode;

    public MeeploException(ErrorCode errorCode) {
        super(errorCode.getMessage());
        this.errorCode = errorCode;
    }
}
