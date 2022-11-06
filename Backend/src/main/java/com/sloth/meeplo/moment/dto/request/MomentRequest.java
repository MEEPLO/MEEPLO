package com.sloth.meeplo.moment.dto.request;

import com.sloth.meeplo.moment.type.MomentType;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

public class MomentRequest {

    @Getter
    @ToString
    @NoArgsConstructor
    public static class CreateMomentInfo {
        private Long groupId;
        private Long schedulePlaceId;
        private String photoUrl;
        private String content;
        private MomentType type;
    }
}
