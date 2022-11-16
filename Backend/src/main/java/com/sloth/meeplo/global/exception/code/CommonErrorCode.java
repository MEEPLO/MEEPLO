package com.sloth.meeplo.global.exception.code;

import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
@AllArgsConstructor
public enum CommonErrorCode implements ErrorCode {
    NOT_EXIST_RESOURCE(HttpStatus.NOT_FOUND, "존재하지 않는 자원입니다."),
    UNAUTHORIZED(HttpStatus.UNAUTHORIZED, "접근할 권한이 없습니다."),
    HTTP_RESPONSE_ERROR(HttpStatus.REQUEST_TIMEOUT, "외부 API 호출 중 문제가 발생했습니다."),
    WRONG_TOKEN(HttpStatus.BAD_REQUEST, "잘못된 토큰입니다."),
    WRONG_URL(HttpStatus.BAD_REQUEST, "잘못된 URL입니다."),
    MEMBER_NOT_FOUND(HttpStatus.NOT_FOUND, "없는 멤버입니다."),
    INVALID_TOKEN(HttpStatus.UNAUTHORIZED, "존재하지 않는 로그인 정보입니다."),
    NOT_EXIST_GROUP_LEADER(HttpStatus.ACCEPTED, "그룹 리더가 존재하지 않습니다."),

    ;

    private final HttpStatus httpStatus;
    private final String message;
}
