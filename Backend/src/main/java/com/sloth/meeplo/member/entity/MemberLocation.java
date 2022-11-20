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

    private Boolean defaultLocation;

    @ManyToOne
    @JoinColumn(name = "member_id", referencedColumnName = "id")
    private Member member;


    public void updateDefaultLocation(Boolean defaultLocation) {
        this.defaultLocation = defaultLocation;
    }

    @Builder
    public MemberLocation(MemberRequest.MemberLocationAddInfo memberLocationAddInfo, Member member, MemberRequest.ConvertedCoordinate convertedCoordinate){
        this.member = member;
        this.name = memberLocationAddInfo.getName();
        this.defaultLocation = false;
        this.address= memberLocationAddInfo.getAddress();
        this.lat = convertedCoordinate.getLat();
        this.lng = convertedCoordinate.getLng();

    }

    @Builder(builderClassName = "emptyMemberLocation", builderMethodName = "emptyMemberLocation")
    public MemberLocation(Boolean empty){
        this.name = "빈 값";
        this.defaultLocation = false;
        this.address= "빈 값";
        this.lat = 0.0;
        this.lng = 0.0;

    }
}
