package com.sloth.meeplo.schedule.entity;

import com.sloth.meeplo.schedule.type.ScheduleKeywordClassification;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class ScheduleKeyword {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(length = 6)
    private String keyword;

    private ScheduleKeywordClassification classification;


}
