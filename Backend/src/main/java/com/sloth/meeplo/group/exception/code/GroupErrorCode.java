package com.sloth.meeplo.group.exception.code;

import com.sloth.meeplo.global.exception.code.ErrorCode;
import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
@AllArgsConstructor
public enum GroupErrorCode implements ErrorCode {

    ALREADY_JOINED(HttpStatus.UNPROCESSABLE_ENTITY, "이미 참가된 맴버입니다."),
    EXIT_UNABLE(HttpStatus.UNPROCESSABLE_ENTITY, "방장은 탈퇴할 수 없습니다."),
    KICK_UNABLE(HttpStatus.UNPROCESSABLE_ENTITY, "자신을 내보낼 수 없습니다."),
    UNAUTHORIZED(HttpStatus.UNAUTHORIZED, "방장만 수정가능 합니다."),
    NO_MORE_MEMBER(HttpStatus.UNPROCESSABLE_ENTITY, "모임이 가득 찼습니다."),
    NOT_EXIST_GROUP_MEMBER(HttpStatus.NOT_FOUND, "그룹에 존재하지 않는 멤버입니다."),
    NOT_EXIST_GROUP_CODE(HttpStatus.NOT_FOUND, "존재하지 않는 그룹 코드입니다."),
    NOT_EXIST_GROUP(HttpStatus.NOT_FOUND, "존재하지 않는 그룹입니다."),
    ;

    private final HttpStatus httpStatus;
    private final String message;
}
