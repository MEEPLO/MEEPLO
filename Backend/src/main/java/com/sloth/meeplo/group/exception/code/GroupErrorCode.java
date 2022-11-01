package com.sloth.meeplo.group.exception.code;

import com.sloth.meeplo.global.exception.code.ErrorCode;
import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
@AllArgsConstructor
public enum GroupErrorCode implements ErrorCode {

    ;

    private final HttpStatus httpStatus;
    private final String message;
}
