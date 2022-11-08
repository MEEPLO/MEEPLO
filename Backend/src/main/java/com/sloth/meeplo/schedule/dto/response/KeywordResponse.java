package com.sloth.meeplo.schedule.dto.response;

import com.sloth.meeplo.schedule.entity.ScheduleKeyword;
import com.sloth.meeplo.schedule.type.ScheduleKeywordClassification;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

public class KeywordResponse {

    @Getter
    @ToString
    @NoArgsConstructor
    public static class KeyWordListInfo {
        private ScheduleKeywordClassification classification;
        private String keyword;
        private Long id;

        @Builder
        KeyWordListInfo(ScheduleKeyword scheduleKeyword){
            this.classification = scheduleKeyword.getClassification();
            this.keyword = scheduleKeyword.getKeyword();
            this.id = scheduleKeyword.getId();
        }
    }

}
