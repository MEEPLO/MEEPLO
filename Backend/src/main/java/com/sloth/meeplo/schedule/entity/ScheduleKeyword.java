package com.sloth.meeplo.schedule.entity;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.Objects;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class ScheduleKeyword {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(length = 6)
    private String keyword;

    @ManyToOne
    @JoinColumn(name = "schedule_id", referencedColumnName = "id")
    private Schedule schedule;

    @Builder
    ScheduleKeyword(String keyword, Schedule schedule){
        this.keyword = keyword;
        this.schedule = schedule;
    }

    @Override
    public boolean equals(Object x) {
        if(!(x instanceof ScheduleKeyword))
            return false;
        ScheduleKeyword sk = ((ScheduleKeyword)x);

        return Objects.equals(this.id, sk.id);
    }

    @Override
    public int hashCode() {
        return id.hashCode();
    }

}
