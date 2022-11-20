package com.sloth.meeplo.recommendation.dto.response;

import com.sloth.meeplo.global.type.DefaultValue;
import com.sloth.meeplo.location.entity.Location;
import com.sloth.meeplo.location.entity.LocationPhoto;
import com.sloth.meeplo.recommendation.dto.common.Coordinate;
import lombok.Builder;
import lombok.Getter;
import lombok.ToString;

import java.util.List;

public class AmuseRecommendResponse {

    @ToString
    @Getter
    public static class AmuseList {
        private List<AmuseSummary> amuses;

        @Builder
        AmuseList(List<AmuseSummary> amuses) {
            this.amuses = amuses;
        }
    }


    @ToString
    @Getter
    public static class AmuseSummary extends Coordinate {
        private Long id;
        private String name;
        private String address;
        private String photo;
        private String category;

        @Builder
        AmuseSummary(Location location) {
            super(location.getLat(), location.getLng());

            this.id = location.getId();
            this.name = location.getName();
            this.address = location.getAddress();
            this.category = location.getCategory();
            this.photo = location.getLocationPhotos().stream()
                    .findFirst()
                    .map(LocationPhoto::getPhoto)
                    .orElse(DefaultValue.AMUSE_REPRESENTATIVE_PHOTO.getValue());
        }
    }

}
