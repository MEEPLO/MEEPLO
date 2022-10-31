package com.sloth.meeplo.group.exception;

import com.sloth.meeplo.global.exception.code.ErrorCode;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class GroupException extends RuntimeException{
    private final ErrorCode errorCode;
}
