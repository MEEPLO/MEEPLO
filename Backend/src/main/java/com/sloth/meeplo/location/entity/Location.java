package com.sloth.meeplo.location.entity;

import com.sloth.meeplo.common.GeoDataEntity;
import com.sloth.meeplo.location.type.LocationType;
import com.sloth.meeplo.schedule.entity.Schedule;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.List;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Location extends GeoDataEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(length = 10)
    private String name;

    private LocationType type;

    @Column(length = 13)
    private String phoneNumber;

    @OneToMany(mappedBy = "location")
    private List<LocationPhoto> locationPhotos;

    @OneToMany(mappedBy = "location")
    private List<LocationKeyword> locationKeywords;

    @OneToMany(mappedBy = "location")
    private List<LocationContent> locationContents;

    @OneToOne(mappedBy = "location")
    private LocationCategory locationCategory;

    @OneToOne(mappedBy = "location")
    private Schedule schedule;



}
