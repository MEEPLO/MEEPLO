package com.sloth.meeplo.location.dto.response;

import com.sloth.meeplo.location.entity.Location;
import com.sloth.meeplo.location.entity.LocationPhoto;
import com.sloth.meeplo.location.type.LocationType;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

public class LocationResponse {

    @Getter
    @ToString
    @NoArgsConstructor
    public static class pointNearLocation{
        private Long id;
        private String name;
        private Double lat;
        private Double lng;
        private String address;
        private LocationType type;
        private String category;
        private String photo;

        @Builder
        pointNearLocation(Location location){
            this.id = location.getId();
            this.name = location.getName();
            this.lat = location.getLat();
            this.lng = location.getLng();
            this.address = location.getAddress();
            this.type = location.getType();
            this.category = location.getCategory();
            this.photo = location.getLocationPhotos().stream()
                    .findFirst().orElse(LocationPhoto
                            .EmptyLocationPhotoBuilder()
                            .photo("https://popcat.click/twitter-card.jpg")
                            .build())
                    .getPhoto();
        }
    }
}
