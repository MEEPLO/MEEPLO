package com.sloth.meeplo.location.entity;

import com.sloth.meeplo.common.GeoDataEntity;
import com.sloth.meeplo.location.type.LocationType;
import com.sloth.meeplo.schedule.entity.Schedule;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.List;
import java.util.Set;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Location extends GeoDataEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(length = 50)
    private String name;

    private LocationType type;

    @Column(length = 200)
    private String category;


    @OneToMany(mappedBy = "location")
    private Set<LocationPhoto> locationPhotos;

    @OneToMany(mappedBy = "location")
    private Set<LocationTime> locationTimes;

    @OneToMany(mappedBy = "location")
    private Set<LocationKeyword> locationKeywords;

    @OneToMany(mappedBy = "location")
    private Set<LocationContent> locationContents;

    @OneToMany(mappedBy = "location")
    private Set<Schedule> schedules;

    @OneToOne(mappedBy = "location")
    private LocationInfo locationInfo;


    @Builder
    Location(LocationType type){
        this.id = 0L;
        this.name = "";
        this.category = "";
        this.address = "";
        this.lng = 0.0;
        this.lat = 0.0;
        this.type = type;
    }


}
