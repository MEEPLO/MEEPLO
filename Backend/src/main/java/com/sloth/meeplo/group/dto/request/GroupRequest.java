package com.sloth.meeplo.group.dto.request;

import com.sloth.meeplo.group.entity.Group;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

public class GroupRequest {

    @Getter
    @ToString
    @NoArgsConstructor
    public static class GroupInput {
        private String name;
        private String description;
        private String photo;

        @Builder
        public GroupInput(String name, String description, String photo){
            this.name=name;
            this.description=description;
            this.photo=photo;
        }

        public Group toEntity(){
            return Group.builder()
                    .name(name)
                    .description(description)
                    .groupPhoto(photo)
                    .build();
        }
    }
}
