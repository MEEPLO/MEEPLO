package com.sloth.meeplo.moment.dto.response;

import com.sloth.meeplo.moment.entity.Moment;
import lombok.Builder;

public class MomentResponse {

    public static class MomentSimpleList{
        private Long id;
        private String photo;
        private Long reactionCount;

        @Builder
        MomentSimpleList(Moment moment){
            this.id = moment.getId();
            this.photo = moment.getMomentPhoto();
            this.reactionCount = moment.getMomentComments().stream().count();
        }
    }
}
