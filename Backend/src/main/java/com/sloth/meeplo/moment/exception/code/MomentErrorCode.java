package com.sloth.meeplo.moment.exception.code;

import com.sloth.meeplo.global.exception.code.ErrorCode;
import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
@AllArgsConstructor
public enum MomentErrorCode implements ErrorCode {

    ALREADY_REACTED(HttpStatus.UNPROCESSABLE_ENTITY, "이미 표기했습니다."),
    NOT_YET_REACTED(HttpStatus.UNPROCESSABLE_ENTITY, "표기되지 않은 상태입니다."),
    ALREADY_COMMENTED(HttpStatus.UNPROCESSABLE_ENTITY, "이미 입력했습니다."),
    NO_MORE_DATA(HttpStatus.UNPROCESSABLE_ENTITY, "더 이상 요소가 없습니다."),
    NO_MOMENT_TYPE(HttpStatus.UNPROCESSABLE_ENTITY, "없는 추억 타입입니다."),
    NOT_EXIST_MOMENT(HttpStatus.NOT_FOUND, "존재하지 않는 추억입니다."),
    ;
    private final HttpStatus httpStatus;
    private final String message;
}
