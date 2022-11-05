package com.sloth.meeploscrap.location.entity;

import com.sloth.meeploscrap.location.entity.type.LocationType;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.*;

@Entity
@Getter
@ToString
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Location extends GeoDataEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(length = 10)
    private String name;

    private LocationType type;

    @Column(length = 200)
    private String category;

}

