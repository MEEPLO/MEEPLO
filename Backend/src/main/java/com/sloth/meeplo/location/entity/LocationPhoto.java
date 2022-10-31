package com.sloth.meeplo.location.entity;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class LocationPhoto {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String photo;

    @ManyToOne
    @JoinColumn(name = "location_id", referencedColumnName = "id")
    private  Location location;
}
