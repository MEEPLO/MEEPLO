package com.sloth.meeplo.moment.exception.code;

import com.sloth.meeplo.global.exception.code.ErrorCode;
import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
@AllArgsConstructor
public enum MomentErrorCode implements ErrorCode {

    ALREADY_REACTED(HttpStatus.ACCEPTED, "이미 표기했습니다."),
    NOT_YET_REACTED(HttpStatus.ACCEPTED, "표기되지 않은 상태입니다."),
    ALREADY_COMMENTED(HttpStatus.ACCEPTED, "이미 입력했습니다.");

    private final HttpStatus httpStatus;
    private final String message;
}
