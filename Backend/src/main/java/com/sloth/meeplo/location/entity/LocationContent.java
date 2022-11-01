package com.sloth.meeplo.location.entity;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class LocationContent {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(length = 200)
    private String content;

    private Integer price;

    @ManyToOne
    @JoinColumn(name = "location_id", referencedColumnName = "id")
    private  Location location;
}
