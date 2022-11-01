package com.sloth.meeplo.group.service;

import com.sloth.meeplo.global.exception.MeeploException;
import com.sloth.meeplo.global.exception.code.CommonErrorCode;
import com.sloth.meeplo.global.type.Role;
import com.sloth.meeplo.global.util.JwtUtil;
import com.sloth.meeplo.group.dto.request.GroupRequest;
import com.sloth.meeplo.group.dto.response.GroupResponse;
import com.sloth.meeplo.group.entity.Group;
import com.sloth.meeplo.group.entity.GroupMember;
import com.sloth.meeplo.group.repository.GroupMemberRepository;
import com.sloth.meeplo.group.repository.GroupRepository;
import com.sloth.meeplo.group.type.GroupMemberStatus;
import com.sloth.meeplo.member.entity.Member;
import com.sloth.meeplo.member.repository.MemberRepository;
import com.sloth.meeplo.schedule.entity.Schedule;
import com.sloth.meeplo.schedule.repository.ScheduleRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Service
public class GroupServiceImpl implements GroupService{

    private final GroupRepository groupRepository;
    private final GroupMemberRepository groupMemberRepository;
    private final ScheduleRepository scheduleRepository;

    private final JwtUtil jwtUtil;
    private final MemberRepository memberRepository;


    private final LocalDate date = LocalDate.of(1111, 11,  11);
    private final LocalTime time = LocalTime.of(11,11,11);
    @Override
    public Long makeGroup(String authorization, GroupRequest.GroupInput groupInput) {
        Group group = groupRepository.save(groupInput.toEntity());
        Member member = null;
        joinGroup(group, member, Role.LEADER);
        return group.getId();
    }

    @Override
    public void updateGroup(String authorization, Long groupId, GroupRequest.GroupInput groupInput) {
        Group group = getGroupEntityByGroupId(groupId);
        Member member = getMemberByAuthorization(authorization);
// TODO: 2022-11-01 ID만 바꿔서 가능한지 확인필요
        if(isGroupLeader(group, member)){
            group = groupInput.toEntity();
            group.updateGroupId(groupId);
            groupRepository.save(group);
        }
    }

    @Override
    public void deleteGroup(String authorization, Long groupId) {
        Group group = getGroupEntityByGroupId(groupId);
        Member member = getMemberByAuthorization(authorization);
        if(isGroupLeader(group, member)){
            groupRepository.delete(group);
        }
    }

    @Override
    public List<GroupResponse.JoinedGroupSummary> joinedGroupList(String authorization) {
        Member member = getMemberByAuthorization(authorization);

        List<GroupMember> groupMemberList = groupMemberRepository.findByMemberAndStatus(member, GroupMemberStatus.ACTIVATED);

        ArrayList<GroupResponse.JoinedGroupSummary> group = new ArrayList<>();
        for (GroupMember groupMember :  groupMemberList) {

            int count = groupMemberRepository.countByGroupAndStatus(groupMember.getGroup(),GroupMemberStatus.ACTIVATED);
            String ln = groupMemberRepository.findByGroupAndRoleAndStatus(groupMember.getGroup(), Role.LEADER, GroupMemberStatus.ACTIVATED)
                    .orElseThrow(()-> new MeeploException(CommonErrorCode.NOT_EXIST_RESOURCE)).getNickname();
            LocalDateTime lastschedule = scheduleRepository.findFirstByGroupOrderByIdDesc(groupMember.getGroup())
                    .orElse(Schedule.builder()
                            .date(LocalDateTime.of(date,time))
                            .build())
                    .getDate();
            group.add(GroupResponse.JoinedGroupSummary.builder()
                    .id(groupMember.getGroup().getId())
                    .name(groupMember.getGroup().getName())
                    .photo(groupMember.getGroup().getGroupPhoto())
                    .memberCount(count)
                    .leaderName(ln)
                    .lastSchedule(lastschedule)
                    .build()
            );
        }
        return group;
    }

    @Override
    public GroupResponse.JoinedGroupDetail getJoinedGroupDetail(String authorization, Long groupId) {
        Group group = getGroupEntityByGroupId(groupId);
        List<GroupMember> groupMembers = groupMemberRepository.findByGroupAndStatus(group, GroupMemberStatus.ACTIVATED);
        GroupMember leader = groupMemberRepository.findByGroupAndRoleAndStatus(group, Role.LEADER, GroupMemberStatus.ACTIVATED)
                .orElseThrow(()-> new MeeploException(CommonErrorCode.NOT_EXIST_RESOURCE));
        List<Schedule> schedules = scheduleRepository.findByGroup(group);

        return GroupResponse.JoinedGroupDetail.builder()
                .group(group)
                .leader(leader.getNickname())
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
        List<GroupMember> groupMember = groupMemberRepository.findByGroupAndStatus(getGroupEntityByGroupId(groupId), GroupMemberStatus.ACTIVATED);

        return groupMember.stream()
                .map(x-> GroupResponse.GroupDetailMember.builder()
                        .groupMember(x)
                        .build())
                .collect(Collectors.toList());
    }

    @Override
    public void exitGroupMember(String authorization, Long groupId) {
        Member member = getMemberByAuthorization(authorization);
        Group group = getGroupEntityByGroupId(groupId);
        GroupMember groupMember= groupMemberRepository.findByGroupAndMember(group, member)
                .orElseThrow(()-> new MeeploException(CommonErrorCode.NOT_EXIST_RESOURCE));
        groupMember.unactivateMember();
    }

    private Group getGroupEntityByGroupId(Long groupId){
        return groupRepository.findById(groupId)
                .orElseThrow(()-> new MeeploException(CommonErrorCode.NOT_EXIST_RESOURCE));
    }

    private Member getMemberByAuthorization(String authorization){

        return memberRepository.findById(jwtUtil.getUserIdFromToken(authorization))
                .orElseThrow(()-> new MeeploException(CommonErrorCode.NOT_EXIST_RESOURCE));
    }

    private boolean isGroupLeader(Group group, Member member){
        GroupMember groupMember = groupMemberRepository.findByGroupAndMemberAndStatus(group, member, GroupMemberStatus.ACTIVATED).
                orElseThrow(()-> new MeeploException(CommonErrorCode.NOT_EXIST_RESOURCE));

        if(groupMember.getRole()==Role.LEADER){
            return true;
        }else{
            throw new MeeploException(CommonErrorCode.UNAUTHORIZED);
        }
    }
    private void joinGroup(Group group, Member member, Role role){
        GroupMember groupMember= groupMemberRepository.findByGroupAndMember(group, member)
                .orElse(GroupMember.builder()
                        .member(member)
                        .group(group)
                        .role(role)
                        .build()
                );
        groupMember.activateMember();
        groupMemberRepository.save(groupMember);
    }
}
