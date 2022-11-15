package com.sloth.meeplo.group.dto.response;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.sloth.meeplo.group.entity.Group;
import com.sloth.meeplo.group.entity.GroupMember;
import com.sloth.meeplo.location.entity.Location;
import com.sloth.meeplo.member.entity.Member;
import com.sloth.meeplo.moment.entity.Moment;
import com.sloth.meeplo.schedule.entity.Schedule;
import com.sloth.meeplo.schedule.entity.ScheduleLocation;
import com.sloth.meeplo.schedule.type.ScheduleMemberStatus;
import lombok.Builder;
import lombok.Getter;
import lombok.ToString;
import org.springframework.lang.Nullable;

import java.time.LocalDateTime;
import java.util.List;

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
            this.leader = leader.getNickname();
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

        @Builder
        GroupDetailMember(GroupMember groupMember){
            this.id = groupMember.getMember().getId();
            this.nickname = groupMember.getNickname();
            this.photo = groupMember.getMember().getProfilePhoto();
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
            this.memberCount = schedule.getScheduleMembers().stream().filter(sm -> sm.getStatus().equals(ScheduleMemberStatus.JOINED)).count();
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

        @Builder
        GroupSchedule(Schedule schedule){
            this.id = schedule.getId();
            this.name = schedule.getName();
            this.date = schedule.getDate();
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
