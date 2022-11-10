package com.sloth.meeplo.location.entity;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class LocationInfo {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(length = 20)
    private String phoneNumber;

    @Column(length = 10000)
    private String description;

    @Column(length = 300)
    private String link;

    @OneToOne
    @JoinColumn(name = "location_id", referencedColumnName = "id")
    private  Location location;
}
