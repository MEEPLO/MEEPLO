package com.sloth.meeplo.location.exception.code;

import com.sloth.meeplo.global.exception.code.ErrorCode;
import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
@AllArgsConstructor
public enum LocationErrorCode implements ErrorCode{

    NOT_EXIST_LOCATION(HttpStatus.ACCEPTED, "존재하지 않는 장소입니다."),
    ;

    private final HttpStatus httpStatus;
    private final String message;
}


