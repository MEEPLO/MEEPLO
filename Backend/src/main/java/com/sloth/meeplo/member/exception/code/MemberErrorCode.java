package com.sloth.meeplo.member.exception.code;

import com.sloth.meeplo.global.exception.code.ErrorCode;
import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
@AllArgsConstructor
public enum MemberErrorCode implements ErrorCode {

    UPDATE_FAIL(HttpStatus.BAD_REQUEST, "닉네임 또는 사진이 없습니다."),
    NOT_EXIST_MEMBER(HttpStatus.NOT_FOUND, "존재하지 않는 멤버입니다."),
    NOT_EXIST_MEMBER_LOCATION(HttpStatus.NOT_FOUND, "존재하지 멤버 장소입니다."),
    CANT_DELETE_DEFAULT_LOCATION(HttpStatus.UNPROCESSABLE_ENTITY, "기본장소는 삭제할 수 없습니다."),
    OTHER_MEMBER_LOCATION(HttpStatus.UNPROCESSABLE_ENTITY, "다른 사용자의 출발지에 접근할 수 없습니다."),
    NO_DEFAULT_LOCATION(HttpStatus.UNPROCESSABLE_ENTITY, "기본 출발지가 없습니다."),
    ;

    private final HttpStatus httpStatus;
    private final String message;
}







