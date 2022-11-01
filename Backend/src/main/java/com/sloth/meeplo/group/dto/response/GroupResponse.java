package com.sloth.meeplo.group.dto.response;

import lombok.Builder;
import lombok.Getter;
import lombok.ToString;
import org.springframework.lang.Nullable;

import java.time.LocalDateTime;

public class GroupResponse {

    @Getter
    @ToString
    @Builder
    public static class JoinedGroupSummary {
        private Long id;
        private String name;
        private String photo;
        private int memberCount;
        private String leaderName;
        @Nullable
        private LocalDateTime lastSchedule;


    }
}
