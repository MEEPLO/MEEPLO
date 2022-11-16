package com.sloth.meeplo.group.service;

import com.sloth.meeplo.global.exception.MeeploException;
import com.sloth.meeplo.global.exception.code.CommonErrorCode;
import com.sloth.meeplo.global.type.Role;
import com.sloth.meeplo.global.util.JwtUtil;
import com.sloth.meeplo.group.dto.request.GroupRequest;
import com.sloth.meeplo.group.dto.response.GroupResponse;
import com.sloth.meeplo.group.entity.Group;
import com.sloth.meeplo.group.entity.GroupMember;
import com.sloth.meeplo.group.exception.code.GroupErrorCode;
import com.sloth.meeplo.group.repository.GroupMemberRepository;
import com.sloth.meeplo.group.repository.GroupRepository;
import com.sloth.meeplo.group.type.GroupMemberStatus;
import com.sloth.meeplo.member.entity.Member;
import com.sloth.meeplo.member.exception.code.MemberErrorCode;
import com.sloth.meeplo.member.repository.MemberRepository;
import com.sloth.meeplo.member.service.MemberService;
import com.sloth.meeplo.schedule.entity.Schedule;
import com.sloth.meeplo.schedule.entity.ScheduleMember;
import com.sloth.meeplo.schedule.repository.ScheduleRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Service
@Slf4j
public class GroupServiceImpl implements GroupService{

    private final GroupRepository groupRepository;
    private final GroupMemberRepository groupMemberRepository;
    private final ScheduleRepository scheduleRepository;

    private final MemberService memberService;

    private final JwtUtil jwtUtil;
    private final MemberRepository memberRepository;

    private final Integer GROUP_MEMBER_LIMIT = 10;

    private final LocalDate date = LocalDate.of(1111, 11,  11);
    private final LocalTime time = LocalTime.of(11,11,11);
    @Override
    @Transactional
    public Long makeGroup(String authorization, GroupRequest.GroupInput groupInput) {
        Group group = groupRepository.save(groupInput.toEntity());
        Member member = memberService.getMemberByAuthorization(authorization);
        joinGroup(group, member, Role.LEADER);
        return group.getId();
    }

    @Override
    @Transactional
    public void updateGroup(String authorization, Long groupId, GroupRequest.GroupInput groupInput) {
        Group group = getGroupEntityByGroupId(groupId);
        Member member = memberService.getMemberByAuthorization(authorization);

        if(!isGroupLeader(group, member))
            throw new MeeploException(GroupErrorCode.UNAUTHORIZED);
        String enterCode = group.getEnterCode();
        group = groupInput.toEntity();
        group.updateGroupId(groupId);
        group.updateEnterCode(enterCode);
        groupRepository.save(group);

    }

    @Override
    @Transactional
    public void deleteGroup(String authorization, Long groupId) {
        Group group = getGroupEntityByGroupId(groupId);
        Member member = memberService.getMemberByAuthorization(authorization);
        if(isGroupLeader(group, member)){
            groupRepository.delete(group);
        }
    }

    @Override
    public List<GroupResponse.JoinedGroupSummary> joinedGroupList(String authorization) {
        Member member = memberService.getMemberByAuthorization(authorization);

        List<GroupMember> groupMemberList = groupMemberRepository
                .findByMemberAndStatus(member, GroupMemberStatus.ACTIVATED);

        ArrayList<GroupResponse.JoinedGroupSummary> group = new ArrayList<>();
        for (GroupMember groupMember :  groupMemberList) {

            int count = groupMemberRepository.countByGroupAndStatus(groupMember.getGroup(),GroupMemberStatus.ACTIVATED);
            String leaderName = getGroupLeader(groupMember.getGroup()).getNickname();
            LocalDateTime lastSchedule = scheduleRepository.findFirstByGroupOrderByIdDesc(groupMember.getGroup())
                    .orElse(Schedule.EmptyBuilder()
                            .date(LocalDateTime.of(date,time))
                            .build())
                    .getDate();
            group.add(GroupResponse.JoinedGroupSummary.builder()
                    .id(groupMember.getGroup().getId())
                    .name(groupMember.getGroup().getName())
                    .photo(groupMember.getGroup().getGroupPhoto())
                    .memberCount(count)
                    .leaderName(leaderName)
                    .lastSchedule(lastSchedule)
                    .build()
            );
        }
        return group;
    }

    @Override
    public GroupResponse.JoinedGroupDetail getJoinedGroupDetail(String authorization, Long groupId) {
        Group group = getGroupEntityByGroupId(groupId);
        List<GroupMember> groupMembers = groupMemberRepository.findByGroupAndStatus(group, GroupMemberStatus.ACTIVATED);
        GroupMember leader = getGroupLeader(group);
        List<Schedule> schedules = scheduleRepository.findByGroup(group);

        return GroupResponse.JoinedGroupDetail.builder()
                .group(group)
                .leader(leader)
                .members(groupMembers.stream()
                        .map(m-> GroupResponse.GroupDetailMember.builder()
                                .groupMember(m)
                                .build())
                        .collect(Collectors.toList()))
                .schedules(schedules.stream()
                        .map(x-> GroupResponse.GroupDetailSchedule.builder()
                                .schedule(x)
                                .build())
                        .collect(Collectors.toList()))
                .build();

    }

    @Override
    public List<GroupResponse.GroupDetailMember> getGroupMembers(String authorization, Long groupId) {
        List<GroupMember> groupMember = groupMemberRepository
                .findByGroupAndStatus(getGroupEntityByGroupId(groupId), GroupMemberStatus.ACTIVATED);

        return groupMember.stream()
                .map(x-> GroupResponse.GroupDetailMember.builder()
                        .groupMember(x)
                        .build())
                .collect(Collectors.toList());
    }

    @Override
    @Transactional
    public void exitGroupMember(String authorization, Long groupId) {
        Member member = memberService.getMemberByAuthorization(authorization);
        Group group = getGroupEntityByGroupId(groupId);
        GroupMember groupMember= groupMemberRepository.findByGroupAndMember(group, member)
                .orElseThrow(()-> new MeeploException(GroupErrorCode.NOT_EXIST_GROUP_MEMBER));
        if(groupMember.getRole().equals(Role.LEADER)){
            throw new MeeploException(GroupErrorCode.EXIT_UNABLE);
        }
        groupMember.unactivateMember();
        groupMemberRepository.save(groupMember);
    }

    @Override
    @Transactional
    public GroupResponse.GroupJoinedResponse joinToGroup(String authorization, GroupRequest.GroupJoinCode groupJoinCode) {
        Member member = memberService.getMemberByAuthorization(authorization);
        Group group = groupRepository.findByEnterCode(groupJoinCode.getEnterCode())
                .orElseThrow(()-> new MeeploException(GroupErrorCode.NOT_EXIST_GROUP_CODE));

        if(groupMemberRepository.countByGroupAndStatus(group, GroupMemberStatus.ACTIVATED)>GROUP_MEMBER_LIMIT)
            throw new MeeploException(GroupErrorCode.NO_MORE_MEMBER);

        joinGroup(group, member, Role.MEMBER);

        return GroupResponse.GroupJoinedResponse.builder().group(group).build();
    }

    @Override
    @Transactional
    public void kickGroupMember(String authorization, Long groupId, Long targetId) {
        Member member = memberService.getMemberByAuthorization(authorization);
        Group group = getGroupEntityByGroupId(groupId);

        checkKickable(group, member, targetId);

        Member target = memberRepository.findById(targetId)
                .orElseThrow(() -> new MeeploException(MemberErrorCode.NOT_EXIST_MEMBER));

        GroupMember groupMember =  getActivatedGroupMemberByGroupAndMember(group,member);

        groupMember.unactivateMember();
        groupMemberRepository.save(groupMember);

    }

    private void checkKickable(Group group, Member member, Long targetId){
        if(!isGroupLeader(group, member)) throw new MeeploException(CommonErrorCode.UNAUTHORIZED);
        if(member.getId().equals(targetId)) throw new MeeploException(GroupErrorCode.KICK_UNABLE);
    }
    @Override
    public Group getGroupEntityByGroupId(Long groupId){
        return groupRepository.findById(groupId)
                .orElseThrow(()-> new MeeploException(GroupErrorCode.NOT_EXIST_GROUP));
    }

    @Override
    public List<GroupResponse.FeedMoment> getFeedMoments(String authorization, Long groupId) {
        Group group = getGroupEntityByGroupId(groupId);
        Member member = memberService.getMemberByAuthorization(authorization);
        checkMemberInGroup(member, group);

        return group.getSchedules().stream()
                .flatMap(s->s.getScheduleLocations().stream())
                .flatMap(sl->sl.getMoments().stream())
                .map(m-> GroupResponse.FeedMoment.builder().moment(m).build()).collect(Collectors.toList());
    }

    @Override
    public List<GroupResponse.MapMoment> getMapMoments(String authorization, Long groupId) {
        Group group = getGroupEntityByGroupId(groupId);
        Member member = memberService.getMemberByAuthorization(authorization);
        checkMemberInGroup(member, group);

        return group.getSchedules().stream()
                .flatMap(s->s.getScheduleLocations().stream())
                .flatMap(sl->sl.getMoments().stream())
                .map(m-> GroupResponse.MapMoment.builder().moment(m).build()).collect(Collectors.toList());
    }

    @Override
    public GroupMember getGroupMemberByGroupAndMemberId(Group group, Long memberId) {
        return groupMemberRepository.findByGroupAndMember(group, memberService.getMemberById(memberId))
                .filter(gm -> GroupMemberStatus.ACTIVATED.equals(gm.getStatus()))
                .orElseThrow(() -> new MeeploException(GroupErrorCode.NOT_EXIST_GROUP_MEMBER));
    }

    @Override
    public List<GroupResponse.GroupSchedule> getGroupSchedules(String authorization, Long groupId) {
        Member member = memberService.getMemberByAuthorization(authorization);
        Group group = getGroupEntityByGroupId(groupId);

        checkMemberInGroup(member, group);

        return group.getSchedules().stream()
                .filter(s-> s.getScheduleMembers().stream().map(ScheduleMember::getMember).anyMatch(m->m.getId().equals(member.getId())))
                .map(s-> GroupResponse.GroupSchedule.builder()
                        .schedule(s)
                        .build())
                .collect(Collectors.toList());

    }

    private boolean isGroupLeader(Group group, Member member){
        GroupMember groupMember = getActivatedGroupMemberByGroupAndMember(group,member);

        if(groupMember.getRole()==Role.LEADER){
            return true;
        }else{
            throw new MeeploException(CommonErrorCode.UNAUTHORIZED);
        }
    }

    @Override
    public void checkMemberInGroup(Member member, Group group){
        if(!groupMemberRepository.existsByMemberAndGroupAndStatus(member,group,GroupMemberStatus.ACTIVATED))
            throw new MeeploException(CommonErrorCode.UNAUTHORIZED);
    }
    private void joinGroup(Group group, Member member, Role role){
        GroupMember groupMember= groupMemberRepository.findByGroupAndMember(group, member)
                .orElse(GroupMember.builder()
                        .member(member)
                        .group(group)
                        .role(role)
                        .build()
                );

        if(groupMember.getStatus().equals(GroupMemberStatus.ACTIVATED)){
            throw new MeeploException(GroupErrorCode.ALREADY_JOINED);
        }
        groupMember.activateMember();
        groupMemberRepository.save(groupMember);
    }

    private GroupMember getGroupLeader(Group group){
        return groupMemberRepository
                .findByGroupAndRoleAndStatus(group, Role.LEADER, GroupMemberStatus.ACTIVATED)
                .orElseThrow(()-> new MeeploException(CommonErrorCode.NOT_EXIST_GROUP_LEADER));
    }

    private GroupMember getActivatedGroupMemberByGroupAndMember(Group group, Member member){
        return groupMemberRepository
                .findByGroupAndMemberAndStatus(group, member, GroupMemberStatus.ACTIVATED).
                orElseThrow(()-> new MeeploException(GroupErrorCode.NOT_EXIST_GROUP_MEMBER));
    }
}
