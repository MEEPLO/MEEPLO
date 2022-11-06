package com.sloth.meeplo.moment.entity;

import com.sloth.meeplo.common.BaseTimeEntity;
import com.sloth.meeplo.moment.dto.request.MomentRequest;
import lombok.AccessLevel;
import lombok.Builder;
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

    @Builder
    public MomentComment(MomentRequest.CreateMomentCommentInfo createMomentCommentInfo, Moment moment){
        this.comment = createMomentCommentInfo.getComment();
        this.x = createMomentCommentInfo.getLocation().getXPoint();
        this.y = createMomentCommentInfo.getLocation().getYPoint();
        this.angle = createMomentCommentInfo.getLocation().getAngle();
        this.moment = moment;
    }

}
