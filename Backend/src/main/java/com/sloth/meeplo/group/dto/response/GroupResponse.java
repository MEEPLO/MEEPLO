package com.sloth.meeplo.group.dto.response;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.sloth.meeplo.global.exception.MeeploException;
import com.sloth.meeplo.group.entity.Group;
import com.sloth.meeplo.group.entity.GroupMember;
import com.sloth.meeplo.group.service.GroupService;
import com.sloth.meeplo.location.entity.Location;
import com.sloth.meeplo.location.exception.code.LocationErrorCode;
import com.sloth.meeplo.member.entity.Member;
import com.sloth.meeplo.member.entity.MemberLocation;
import com.sloth.meeplo.member.exception.code.MemberErrorCode;
import com.sloth.meeplo.moment.entity.Moment;
import com.sloth.meeplo.schedule.dto.response.ScheduleResponse;
import com.sloth.meeplo.schedule.entity.Schedule;
import com.sloth.meeplo.schedule.entity.ScheduleLocation;
import com.sloth.meeplo.schedule.service.ScheduleService;
import com.sloth.meeplo.schedule.type.ScheduleMemberStatus;
import lombok.Builder;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.ToString;
import lombok.extern.slf4j.Slf4j;
import org.springframework.lang.Nullable;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;
@Slf4j
public class GroupResponse {


    @Getter
    @ToString
    @Builder
    public static class JoinedGroupSummary {
        private Long id;
        private String name;
        private String photo;
        private int memberCount;
        private String leaderName;
        @Nullable
        @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm", timezone = "Asia/Seoul")
        private LocalDateTime lastSchedule;
    }

    @Getter
    @ToString
    public static class JoinedGroupDetail{
        private Long id;
        private String name;
        private String description;
        private String photo;
        private String leader;
        private String enterCode;
        private Long leaderMemberId;
        private List<GroupDetailMember> members;
        private List<GroupDetailSchedule> schedules;

        @Builder
        JoinedGroupDetail(Group group, GroupMember leader, List<GroupDetailMember> members, List<GroupDetailSchedule> schedules){
            this.id = group.getId();
            this.name = group.getName();
            this.description = group.getDescription();
            this.photo = group.getGroupPhoto();
            this.enterCode = group.getEnterCode();
            this.leader = leader.getMember().getUsername();
            this.leaderMemberId = leader.getMember().getId();
            this.members=members;
            this.schedules=schedules;
        }
    }

    @Getter
    @ToString
    public static class GroupDetailMember{
        private Long id;
        private String nickname;
        private String photo;
        private String locationName;
        private String locationAddress;
        private Double lat;
        private Double lng;

        @Builder
        GroupDetailMember(GroupMember groupMember){
            this.id = groupMember.getMember().getId();
            this.nickname = groupMember.getMember().getUsername();
            this.photo = groupMember.getMember().getProfilePhoto();
            MemberLocation memberLocation = groupMember.getMember().getMemberLocations().stream()
                    .filter(MemberLocation::getDefaultLocation)
                    .findFirst().orElseThrow(()->new MeeploException(MemberErrorCode.NO_DEFAULT_LOCATION));
            this.locationName = memberLocation.getName();
            this.locationAddress = memberLocation.getAddress();
            this.lat = memberLocation.getLat();
            this.lng = memberLocation.getLng();
        }
    }

    @Getter
    @ToString
    public static class GroupDetailSchedule{
        private Long id;
        private String name;
        @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm", timezone = "Asia/Seoul")
        private LocalDateTime date;
        private Long memberCount;
        private GroupDetailScheduleLocation location;

        @Builder
        GroupDetailSchedule(Schedule schedule){
            this.id = schedule.getId();
            this.name = schedule.getName();
            this.date = schedule.getDate();
            this.memberCount = schedule.getScheduleMembers().stream()
                    .filter(sm -> sm.getStatus().equals(ScheduleMemberStatus.JOINED))
                    .distinct()
                    .count();
            this.location = GroupDetailScheduleLocation.builder().schedule(schedule).build();
        }
    }

    @Getter
    @ToString
    public static class GroupDetailScheduleLocation{
        private String meetName;
        private String amuseName;

        @Builder
        GroupDetailScheduleLocation(Schedule schedule){
            this.meetName = schedule.getLocation().getName();
            this.amuseName = schedule.getScheduleLocations().stream().findFirst()
                    .orElseGet(() -> ScheduleLocation.EmptyScheduleLocation()
                            .location(Location.builder().name("미정").build())
                            .build())
                    .getLocation().getName();
        }
    }

    @Getter
    @ToString
    public static class FeedMoment {
        private Long id;
        private String photo;

        @Builder
        FeedMoment(Moment moment){
            this.id = moment.getId();
            this.photo = moment.getMomentPhoto();
        }

        @Override
        public boolean equals(Object x) {
            if(!(x instanceof FeedMoment))
                return false;
            FeedMoment fm = ((FeedMoment)x);

            return Objects.equals(this.id, fm.id);
        }

        @Override
        public int hashCode() {
            return id.hashCode();
        }
    }

    @Getter
    @ToString
    public static class MapMoment{
        private Long id;
        private String photo;

        private MapMomentLocation location;

        @Builder
        MapMoment(Moment moment){
            this.id = moment.getId();
            this.photo = moment.getMomentPhoto();
            this.location = MapMomentLocation.builder().location(moment.getScheduleLocation().getLocation()).build();
        }

        @Override
        public boolean equals(Object x) {
            if(!(x instanceof MapMoment))
                return false;
            MapMoment fm = ((MapMoment)x);

            return Objects.equals(this.id, fm.id);
        }

        @Override
        public int hashCode() {
            return id.hashCode();
        }
    }

    @Getter
    @ToString
    public static class MapMomentLocation{
        private Double lat;
        private Double lng;

        @Builder
        MapMomentLocation(Location location){
            this.lat = location.getLat();
            this.lng = location.getLng();
        }
    }
    @Getter
    @ToString
    public static class GroupSchedule {
        private Long id;
        private String name;
        @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm", timezone = "Asia/Seoul")
        private LocalDateTime date;

        private List<GroupScheduleLocation> scheduleLocations;

        @Builder
        GroupSchedule(Schedule schedule){
            this.id = schedule.getId();
            this.name = schedule.getName();
            this.date = schedule.getDate();
            this.scheduleLocations = schedule.getScheduleLocations().stream()
                    .map(sl->GroupScheduleLocation.builder().scheduleLocation(sl).build())
                    .distinct()
                    .collect(Collectors.toList());
        }

        @Override
        public boolean equals(Object x) {
            if(!(x instanceof GroupSchedule))
                return false;
            GroupSchedule fm = ((GroupSchedule)x);

            return Objects.equals(this.id, fm.id);
        }

        @Override
        public int hashCode() {
            return id.hashCode();
        }
    }

    @Getter
    @ToString
    public static class GroupScheduleLocation {
        private Long scheduleLocationId;
        private String name;

        @Builder
        GroupScheduleLocation(ScheduleLocation scheduleLocation){
            this.scheduleLocationId = scheduleLocation.getId();
            this.name = scheduleLocation.getLocation().getName();
        }

        @Override
        public boolean equals(Object x) {
            if(!(x instanceof GroupScheduleLocation))
                return false;
            GroupScheduleLocation gsl = ((GroupScheduleLocation)x);

            return Objects.equals(this.scheduleLocationId, gsl.scheduleLocationId);
        }

        @Override
        public int hashCode() {
            return scheduleLocationId.hashCode();
        }
    }

    @Getter
    @ToString
    public static class GroupJoinedResponse {
        private Long id;
        private String groupName;

        @Builder
        GroupJoinedResponse(Group group){
            this.id = group.getId();
            this.groupName = group.getName();
        }
    }

}
