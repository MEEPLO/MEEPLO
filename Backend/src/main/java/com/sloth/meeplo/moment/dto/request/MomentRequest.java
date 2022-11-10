package com.sloth.meeplo.moment.dto.request;

import com.sloth.meeplo.moment.dto.response.MomentResponse;
import com.sloth.meeplo.moment.entity.MomentComment;
import com.sloth.meeplo.moment.type.MomentType;
import lombok.Builder;
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
        private Integer type;
    }

    @Getter
    @ToString
    @NoArgsConstructor
    public static class CreateMomentCommentInfo{
        private String comment;
        private MomentRequest.MomentCommentLocation location;

    }
    @Getter
    @ToString
    @NoArgsConstructor
    public static class MomentCommentLocation{
        private Double xpoint;
        private Double ypoint;
        private Double angle;

    }
}
