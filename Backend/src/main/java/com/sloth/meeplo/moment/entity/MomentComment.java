package com.sloth.meeplo.moment.entity;

import com.sloth.meeplo.common.BaseTimeEntity;
import com.sloth.meeplo.member.entity.Member;
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

    @ManyToOne
    @JoinColumn(name = "member_id", referencedColumnName = "id")
    private Member member;

    @Builder
    public MomentComment(MomentRequest.CreateMomentCommentInfo createMomentCommentInfo, Moment moment, Member member){
        this.comment = createMomentCommentInfo.getComment();
        this.x = createMomentCommentInfo.getLocation().getXpoint();
        this.y = createMomentCommentInfo.getLocation().getYpoint();
        this.angle = createMomentCommentInfo.getLocation().getAngle();
        this.moment = moment;
        this.member = member;
    }

}
