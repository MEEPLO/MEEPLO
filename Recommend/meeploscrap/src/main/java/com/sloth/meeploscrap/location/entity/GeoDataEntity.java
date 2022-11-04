package com.sloth.meeploscrap.location.entity;

import lombok.Getter;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.Column;
import javax.persistence.EntityListeners;
import javax.persistence.MappedSuperclass;

@Getter
@MappedSuperclass
@EntityListeners(AuditingEntityListener.class)
public abstract class GeoDataEntity {

    protected Double lat;

    protected Double lng;

    @Column(length = 200)
    protected String address;

}
