package com.sloth.meeplo.moment.dto.response;

import com.sloth.meeplo.member.entity.Member;
import com.sloth.meeplo.moment.entity.Moment;
import com.sloth.meeplo.moment.entity.MomentComment;
import com.sloth.meeplo.moment.type.MomentType;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

import java.util.List;
import java.util.stream.Collectors;

public class MomentResponse {
    @Getter
    @ToString
    @NoArgsConstructor
    public static class MomentSimpleList{
        private Long id;
        private String photo;
        private Long reactionCount;

        @Builder
        MomentSimpleList(Moment moment){
            this.id = moment.getId();
            this.photo = moment.getMomentPhoto();
            this.reactionCount = (long) moment.getMembers().size();
        }
    }
    @Getter
    @ToString
    @NoArgsConstructor
    public static class MomentDetail{
        private MomentDetailInfo moment;
        private MomentDetailReaction reaction;
        private List<MomentDetailComment> comments;

        @Builder
        MomentDetail(Moment moment, Member member){
            this.moment = MomentDetailInfo.builder().moment(moment).build();
            this.reaction =MomentDetailReaction.builder()
                    .member(member)
                    .moment(moment)
                    .build();
            this.comments = moment.getMomentComments().stream()
                    .map(mc -> MomentDetailComment.builder()
                            .momentComment(mc)
                            .build())
                    .collect(Collectors.toList());
        }

    }
    @Getter
    @ToString
    @NoArgsConstructor
    public static class MomentDetailInfo{
        private Long id;
        private String photoUrl;
        private Long writer;
        private MomentType type;

        @Builder
        MomentDetailInfo(Moment moment){
            this.id = moment.getId();
            this.photoUrl = moment.getMomentPhoto();
            this.writer = moment.getMember().getId();
            this.type = moment.getType();
        }

    }
    @Getter
    @ToString
    @NoArgsConstructor
    public static class MomentDetailReaction{
        private Long count;
        private Boolean liked;
        @Builder
        MomentDetailReaction(Moment moment, Member member){
            this.count = (long) moment.getMembers().size();
            this.liked = moment.getMembers().stream().anyMatch(m -> m.getId().equals(member.getId()));
        }

    }
    @Getter
    @ToString
    @NoArgsConstructor
    public static class MomentDetailComment{
        private String comment;
        private MomentCommentLocation location;

        @Builder
        MomentDetailComment(MomentComment momentComment){
            this.comment = momentComment.getComment();
            this.location = MomentCommentLocation.builder().momentComment(momentComment).build();
        }
    }
    @Getter
    @ToString
    @NoArgsConstructor
    public static class MomentCommentLocation{
        private Double xPoint;
        private Double yPoint;
        private Double angle;

        @Builder
        MomentCommentLocation(MomentComment momentComment){
            this.xPoint = momentComment.getX();
            this.yPoint = momentComment.getY();
            this.angle = momentComment.getAngle();
        }
    }
}
