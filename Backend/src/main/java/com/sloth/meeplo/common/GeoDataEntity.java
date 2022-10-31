package com.sloth.meeplo.common;

import lombok.Builder;
import lombok.Getter;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.Column;
import javax.persistence.EntityListeners;
import javax.persistence.MappedSuperclass;

@Getter
@MappedSuperclass
@EntityListeners(AuditingEntityListener.class)
public abstract class GeoDataEntity {

    private Double lat;

    private Double lng;

    @Column(length = 200)
    private String address;

}
