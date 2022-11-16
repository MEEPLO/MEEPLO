package com.sloth.meeplo.schedule.exception.code;

import com.sloth.meeplo.global.exception.code.ErrorCode;
import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
@AllArgsConstructor
public enum ScheduleErrorCode implements ErrorCode{

    DUE_DATE_PASSED(HttpStatus.ACCEPTED, "기한이 지나 변경이 불가합니다."),
    NOT_EXIST_SCHEDULE_MEMBER(HttpStatus.ACCEPTED, "해당 멤버가 약속에 존재하지 않습니다."),
    NOT_EXIST_SCHEDULE(HttpStatus.ACCEPTED, "존재하지 않는 약속입니다."),
    NOT_EXIST_SCHEDULE_LOCATION(HttpStatus.ACCEPTED, "존재하지 않는 약속장소입니다."),
    ;

    private final HttpStatus httpStatus;
    private final String message;
}




