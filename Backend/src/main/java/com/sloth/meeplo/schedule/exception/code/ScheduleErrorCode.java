package com.sloth.meeplo.schedule.exception.code;

import com.sloth.meeplo.global.exception.code.ErrorCode;
import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
@AllArgsConstructor
public enum ScheduleErrorCode implements ErrorCode{

    DUE_DATE_PASSED(HttpStatus.ACCEPTED, "기한이 지나 변경이 불가합니다.");

    private final HttpStatus httpStatus;
    private final String message;
}




