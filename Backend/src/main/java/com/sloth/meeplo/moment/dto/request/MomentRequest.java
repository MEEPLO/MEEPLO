package com.sloth.meeplo.moment.dto.request;

import com.sloth.meeplo.moment.dto.response.MomentResponse;
import com.sloth.meeplo.moment.entity.MomentComment;
import com.sloth.meeplo.moment.type.MomentType;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.validation.constraints.NotBlank;

public class MomentRequest {

    @Getter
    @ToString
    @NoArgsConstructor
    public static class CreateMomentInfo {
        @NotBlank
        private Long groupId;
        @NotBlank
        private Long schedulePlaceId;
        @NotBlank
        private String photoUrl;
        @NotBlank
        private String content;
        @NotBlank
        private Integer type;
    }

    @Getter
    @ToString
    @NoArgsConstructor
    public static class CreateMomentCommentInfo{
        @NotBlank
        private String comment;
        @NotBlank
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
