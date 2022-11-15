package com.sloth.meeplo.schedule.dto.request;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.sloth.meeplo.schedule.type.ScheduleMemberStatus;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;
import org.springframework.format.annotation.DateTimeFormat;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.time.LocalDateTime;
import java.util.List;

public class ScheduleRequest {

    @Getter
    @ToString
    @NoArgsConstructor
    public static class ScheduleCreateInput{
        @NotNull
        @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm", timezone = "Asia/Seoul")
        private LocalDateTime date;
        @NotBlank
        private String name;
        @NotNull
        private Long groupId;
        @NotNull
        private Long meetLocationId;
        private List<String> keywords;
        private List<ScheduleInputMember> members;
        private List<ScheduleInputAmuse> amuses;

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
        @NotNull
        private Long id;
        @NotNull
        @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm", timezone = "Asia/Seoul")
        private LocalDateTime date;
        @NotBlank
        private String name;
        @NotNull
        private Long groupId;
        @NotNull
        private Long meetLocationId;
        private List<String> keywords;
        private List<ScheduleInputMember> members;
        private List<ScheduleInputAmuse> amuses;
    }


}
