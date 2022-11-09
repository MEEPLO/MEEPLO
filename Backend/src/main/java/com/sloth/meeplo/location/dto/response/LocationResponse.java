package com.sloth.meeplo.location.dto.response;

import com.sloth.meeplo.location.entity.*;
import com.sloth.meeplo.location.type.LocationType;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

import java.util.List;
import java.util.stream.Collectors;

public class LocationResponse {

    @Getter
    @ToString
    @NoArgsConstructor
    public static class PointNearLocation {
        private Long id;
        private String name;
        private Double lat;
        private Double lng;
        private String address;
        private LocationType type;
        private String category;
        private String photo;

        @Builder
        PointNearLocation(Location location){
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

    @Getter
    @ToString
    @NoArgsConstructor
    public static class LocationDetail {
        private String name;
        private String address;
        private LocationType type;
        private String category;
        private Double lat;
        private Double lng;
        private LocationDetailInfo info;

        private List<LocationDetailKeyword> keywords;
        private List<LocationDetailPhoto> photos;
        private List<LocationDetailMenu> menus;
        private List<LocationDetailTime> times;

        @Builder
        LocationDetail(Location location){
            this.name = location.getName();
            this.address = location.getAddress();
            this.type = location.getType();
            this.category = location.getCategory();
            this.lat = location.getLat();
            this.lng = location.getLng();
            if(location.getLocationInfo()!=null)
                this.info = LocationDetailInfo.builder().locationInfo(location.getLocationInfo()).build();
            this.keywords=location.getLocationKeywords().stream()
                    .map(lk->LocationDetailKeyword.builder().locationKeyword(lk).build())
                    .collect(Collectors.toList());
            this.photos=location.getLocationPhotos().stream()
                    .map(lp-> LocationDetailPhoto.builder().locationPhoto(lp).build())
                    .collect(Collectors.toList());
            this.menus=location.getLocationContents().stream()
                    .map(lc->LocationDetailMenu.builder().locationContent(lc).build())
                    .collect(Collectors.toList());
            this.times=location.getLocationTimes().stream()
                    .map(lt-> LocationDetailTime.builder().locationTime(lt).build())
                    .collect(Collectors.toList());
        }
    }
    @Getter
    @ToString
    @NoArgsConstructor
    public static class LocationDetailInfo {
        private String phoneNumber;
        private String description;
        private String link;

        @Builder
        LocationDetailInfo(LocationInfo locationInfo){
            this.phoneNumber = locationInfo.getPhoneNumber();
            this.description = locationInfo.getDescription();
            this.link = locationInfo.getLink();
        }
    }

    @Getter
    @ToString
    @NoArgsConstructor
    public static class LocationDetailKeyword {
        private String content;

        @Builder
        LocationDetailKeyword(LocationKeyword locationKeyword){
            this.content = locationKeyword.getKeyword();
        }
    }

    @Getter
    @ToString
    @NoArgsConstructor
    public static class LocationDetailPhoto {
        private String url;
        @Builder
        LocationDetailPhoto(LocationPhoto locationPhoto){
            this.url = locationPhoto.getPhoto();
        }
    }

    @Getter
    @ToString
    @NoArgsConstructor
    public static class LocationDetailMenu {
        private String content;
        private String price;
        @Builder
        LocationDetailMenu(LocationContent locationContent){
            this.content = locationContent.getContent();
            this.price = locationContent.getPrice();
        }
    }

    @Getter
    @ToString
    @NoArgsConstructor
    public static class LocationDetailTime {
        private String content;
        private String day;
        @Builder
        LocationDetailTime(LocationTime locationTime){
            this.content = locationTime.getContent();
            this.day = locationTime.getDay();
        }
    }
    @Getter
    @ToString
    @NoArgsConstructor
    public static class StationAutoSearch {
        private Long id;
        private String name;
        private Double lat;
        private Double lng;

        @Builder
        StationAutoSearch(Location location){
            this.id = location.getId();
            this.name = location.getName();
            this.lat= location.getLat();
            this.lng = location.getLng();
        }
    }
}
