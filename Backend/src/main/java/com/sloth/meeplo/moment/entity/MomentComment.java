package com.sloth.meeplo.moment.entity;

import com.sloth.meeplo.common.BaseTimeEntity;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class MomentComment extends BaseTimeEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(length = 50)
    private String comment;

    private Double x;
    private Double y;
    private Double angle;

    @ManyToOne
    @JoinColumn(name = "moment_id", referencedColumnName = "id")
    private Moment moment;

}
