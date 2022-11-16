package com.sloth.meeplo.schedule.dto.response;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.sloth.meeplo.global.exception.MeeploException;
import com.sloth.meeplo.global.exception.code.CommonErrorCode;
import com.sloth.meeplo.group.entity.Group;
import com.sloth.meeplo.location.entity.Location;
import com.sloth.meeplo.moment.entity.Moment;
import com.sloth.meeplo.schedule.entity.Schedule;
import com.sloth.meeplo.schedule.entity.ScheduleKeyword;
import com.sloth.meeplo.schedule.entity.ScheduleLocation;
import com.sloth.meeplo.schedule.entity.ScheduleMember;
import com.sloth.meeplo.schedule.type.ScheduleMemberStatus;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;
import org.springframework.format.annotation.DateTimeFormat;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

public class ScheduleResponse {
    @Getter
    @ToString
    @NoArgsConstructor
    public static class ScheduleDetailInfo{
        @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm", timezone = "Asia/Seoul")
        private LocalDateTime date;
        private String name;
        private ScheduleDetailGroupInfo group;
        private List<String> keywords;
        private List<ScheduleDetailMemberInfo> members;
        private ScheduleDetailMeetLocationInfo meetLocation;
        private List<ScheduleDetailAmuseLocationInfo> amuseLocations;

        @Builder
        ScheduleDetailInfo(Schedule schedule){
            this.date = schedule.getDate();
            this.name = schedule.getName();
            this.keywords = schedule.getScheduleKeywords().stream().map(ScheduleKeyword::getKeyword).collect(Collectors.toList());
            this.group = ScheduleDetailGroupInfo.builder()
                    .group(schedule.getGroup())
                    .build();
            this.members = schedule.getScheduleMembers().stream()
                    .map(sm -> ScheduleDetailMemberInfo.builder()
                            .scheduleMember(sm)
                            .build())
                    .collect(Collectors.toList());
            this.meetLocation = ScheduleDetailMeetLocationInfo.builder()
                    .location(schedule.getLocation())
                    .build();
            this.amuseLocations = schedule.getScheduleLocations().stream()
                    .map(sl -> ScheduleDetailAmuseLocationInfo.builder()
                            .scheduleLocation(sl)
                            .build())
                    .collect(Collectors.toList());

        }
    }
    @Getter
    @ToString
    @NoArgsConstructor
    public static class ScheduleDetailGroupInfo{
        private Long id;
        private String name;

        @Builder
        ScheduleDetailGroupInfo(Group group){
            this.id = group.getId();
            this.name = group.getName();
        }
    }

    @Getter
    @ToString
    @NoArgsConstructor
    public static class ScheduleDetailMemberInfo{
        private Long id;
        private String nickname;
        private String photo;
        private ScheduleMemberStatus status;

        @Builder
        ScheduleDetailMemberInfo(ScheduleMember scheduleMember){
            this.id = scheduleMember.getId();
            this.nickname = scheduleMember.getMember().getGroupMembers().stream()
                    .filter(gm -> gm.getMember().getId().equals(scheduleMember.getMember().getId()))
                    .findFirst().orElseThrow(()-> new MeeploException(CommonErrorCode.NOT_EXIST_RESOURCE))
                    .getNickname();
            this.photo = scheduleMember.getMember().getProfilePhoto();
            this.status = scheduleMember.getStatus();
        }
    }

    @Getter
    @ToString
    @NoArgsConstructor
    public static class ScheduleDetailMeetLocationInfo{
        private Long id;
        private String name;
        private String address;
        private Double lat;
        private Double lng;

        @Builder
        ScheduleDetailMeetLocationInfo(Location location){
            this.id = location.getId();
            this.name = location.getName();
            this.address = location.getAddress();
            this.lat = location.getLat();
            this.lng = location.getLng();
        }
    }

    @Getter
    @ToString
    @NoArgsConstructor
    public static class ScheduleDetailAmuseLocationInfo{
        private Long id;
        private String name;
        private String address;
        private Double lat;
        private Double lng;

        @Builder
        ScheduleDetailAmuseLocationInfo(ScheduleLocation scheduleLocation){
            this.id = scheduleLocation.getId();
            this.name = scheduleLocation.getLocation().getName();
            this.address = scheduleLocation.getLocation().getAddress();
            this.lat = scheduleLocation.getLocation().getLat();
            this.lng = scheduleLocation.getLocation().getLng();
        }
    }

    @Getter
    @ToString
    @NoArgsConstructor
    public static class ScheduleListInfo{
        private Long id;
        private String name;
        @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm", timezone = "Asia/Seoul")
        private LocalDateTime date;
        private String groupName;
        private Long memberCount;
        private Boolean momentRecorded;
        private ScheduleListLocationInfo location;

        @Builder
        ScheduleListInfo(Schedule schedule){
            this.id = schedule.getId();
            this.name = schedule.getName();
            this.date = schedule.getDate();
            this.groupName = schedule.getGroup().getName();
            this.memberCount = schedule.getScheduleMembers().stream()
                    .filter(sm -> sm.getStatus().equals(ScheduleMemberStatus.JOINED))
                    .count();
            this.momentRecorded = schedule.getScheduleLocations().stream()
                    .map(sl -> (long) sl.getMoments().size())
                    .anyMatch(c -> c > 0);
            this.location = ScheduleListLocationInfo.builder().schedule(schedule).build();
        }

    }
    @Getter
    @ToString
    @NoArgsConstructor
    public static class ScheduleListLocationInfo{
        private String meetName;
        private String amuseName;

        @Builder
        ScheduleListLocationInfo(Schedule schedule){
            this.meetName = schedule.getLocation().getName();
            this.amuseName = schedule.getScheduleLocations().stream()
                    .findFirst().orElse(ScheduleLocation.EmptyScheduleLocation()
                            .location(Location.builder()
                                    .name("미정")
                                    .build())
                            .build())
                    .getLocation()
                    .getName();
        }
    }
    @Getter
    @ToString
    @NoArgsConstructor
    public static class JoinedScheduleMoment{
        private Long id;
        private String photo;
        @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm", timezone = "Asia/Seoul")
        LocalDateTime date;

        @Builder
        JoinedScheduleMoment(Moment moment){
            this.id = moment.getId();
            this.photo = moment.getMomentPhoto();
            this.date = moment.getScheduleLocation().getSchedule().getDate();
        }
    }

}
