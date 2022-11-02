package com.sloth.meeplo.member.entity;

import com.sloth.meeplo.common.GeoDataEntity;
import com.sloth.meeplo.location.entity.Location;
import com.sloth.meeplo.member.dto.request.MemberRequest;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class MemberLocation extends GeoDataEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(length = 10)
    private String name;

    @ManyToOne
    @JoinColumn(name = "member_id", referencedColumnName = "id")
    private Member member;

    @Builder
    public MemberLocation(MemberRequest.MemberLocationAddInfo memberLocationAddInfo, Member member){
        this.member = member;
        this.name = memberLocationAddInfo.getName();
        this.address= memberLocationAddInfo.getAddress();
        this.lat = memberLocationAddInfo.getLat();
        this.lng = memberLocationAddInfo.getLng();

    }
}
