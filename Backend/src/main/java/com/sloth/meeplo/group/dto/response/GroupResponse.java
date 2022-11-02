package com.sloth.meeplo.group.dto.response;

import com.sloth.meeplo.group.entity.Group;
import com.sloth.meeplo.group.entity.GroupMember;
import com.sloth.meeplo.group.type.GroupMemberStatus;
import com.sloth.meeplo.location.entity.Location;
import com.sloth.meeplo.member.entity.Member;
import com.sloth.meeplo.schedule.entity.Schedule;
import com.sloth.meeplo.schedule.entity.ScheduleLocation;
import com.sloth.meeplo.schedule.type.ScheduleMemberStatus;
import lombok.Builder;
import lombok.Getter;
import lombok.ToString;
import org.springframework.lang.Nullable;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

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

        private List<GroupDetailMember> members;
        private List<GroupDetailSchedule> schedules;

        @Builder
        JoinedGroupDetail(Group group, String leader, List<GroupDetailMember> members, List<GroupDetailSchedule> schedules){
            this.id = group.getId();
            this.name = group.getName();
            this.description = group.getDescription();
            this.photo = group.getGroupPhoto();
            this.leader = leader;
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
                    .orElseGet(() -> ScheduleLocation.builder()
                            .location(Location.builder().name("미정").build())
                            .build())
                    .getLocation().getName();
        }
    }

}
