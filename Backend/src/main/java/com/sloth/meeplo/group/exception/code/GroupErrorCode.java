package com.sloth.meeplo.group.exception.code;

import com.sloth.meeplo.global.exception.code.ErrorCode;
import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
@AllArgsConstructor
public enum GroupErrorCode implements ErrorCode {

    ALREADY_JOINED(HttpStatus.ACCEPTED, "이미 참가된 맴버입니다."),
    EXIT_UNABLE(HttpStatus.ACCEPTED, "방장은 탈퇴할 수 없습니다."),
    KICK_UNABLE(HttpStatus.ACCEPTED, "자신을 내보낼 수 없습니다."),
    UNAUTHORIZED(HttpStatus.ACCEPTED, "방장만 수정가능 합니다."),
    NO_MORE_MEMBER(HttpStatus.ACCEPTED, "모임이 가득 찼습니다.");

    private final HttpStatus httpStatus;
    private final String message;
}
