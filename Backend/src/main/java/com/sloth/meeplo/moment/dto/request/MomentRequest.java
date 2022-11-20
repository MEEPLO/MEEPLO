package com.sloth.meeplo.moment.dto.request;

import com.sloth.meeplo.moment.dto.response.MomentResponse;
import com.sloth.meeplo.moment.entity.MomentComment;
import com.sloth.meeplo.moment.type.MomentType;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

public class MomentRequest {

    @Getter
    @ToString
    @NoArgsConstructor
    public static class CreateMomentInfo {
        @NotNull
        private Long groupId;
        @NotNull
        private Long schedulePlaceId;
        @NotBlank
        private String photoUrl;
        @NotBlank
        private String content;
        @NotNull
        private Integer type;
    }

    @Getter
    @ToString
    @NoArgsConstructor
    public static class CreateMomentCommentInfo{
        @NotBlank
        private String comment;
        @NotNull
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
