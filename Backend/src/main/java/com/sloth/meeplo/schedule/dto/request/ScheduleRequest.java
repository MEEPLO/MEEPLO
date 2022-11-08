package com.sloth.meeplo.schedule.dto.request;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.sloth.meeplo.schedule.type.ScheduleMemberStatus;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;
import org.springframework.format.annotation.DateTimeFormat;

import java.time.LocalDateTime;
import java.util.List;

public class ScheduleRequest {

    @Getter
    @ToString
    @NoArgsConstructor
    public static class ScheduleCreateInput{
        @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm", timezone = "Asia/Seoul")
        private LocalDateTime date;
        private String name;
        private Long groupId;
        private Long meetLocationId;
        private List<ScheduleInputKeyword> keywords;
        private List<ScheduleInputMember> members;
        private List<ScheduleInputAmuse> amuses;

    }

    @Getter
    @ToString
    @NoArgsConstructor
    public static class ScheduleInputKeyword{
        private Long id;
    }
    @Getter
    @ToString
    @NoArgsConstructor
    public static class ScheduleInputMember{
        private Long id;
    }
    @Getter
    @ToString
    @NoArgsConstructor
    public static class ScheduleInputAmuse{
        private Long id;
    }

    @Getter
    @ToString
    @NoArgsConstructor
    public static class ScheduleUpdateInput{
        private Long id;
        @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm", timezone = "Asia/Seoul")
        private LocalDateTime date;
        private String name;
        private Long groupId;
        private Long meetLocationId;
        private List<ScheduleInputKeyword> keywords;
        private List<ScheduleInputMember> members;
        private List<ScheduleInputAmuse> amuses;
    }


}
