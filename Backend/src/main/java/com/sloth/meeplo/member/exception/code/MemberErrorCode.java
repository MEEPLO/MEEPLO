package com.sloth.meeplo.member.exception.code;

import com.sloth.meeplo.global.exception.code.ErrorCode;
import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
@AllArgsConstructor
public enum MemberErrorCode implements ErrorCode {

    UPDATE_FAIL(HttpStatus.BAD_REQUEST, "닉네임 또는 사진이 없습니다.");

    private final HttpStatus httpStatus;
    private final String message;
}







