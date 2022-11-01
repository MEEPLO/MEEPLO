package com.sloth.meeplo.group.service;

import com.sloth.meeplo.global.exception.MeeploException;
import com.sloth.meeplo.global.exception.code.CommonErrorCode;
import com.sloth.meeplo.global.type.Role;
import com.sloth.meeplo.group.dto.request.GroupRequest;
import com.sloth.meeplo.group.dto.response.GroupResponse;
import com.sloth.meeplo.group.entity.Group;
import com.sloth.meeplo.group.entity.GroupMember;
import com.sloth.meeplo.group.repository.GroupMemberRepository;
import com.sloth.meeplo.group.repository.GroupRepository;
import com.sloth.meeplo.group.type.GroupMemberStatus;
import com.sloth.meeplo.member.entity.Member;
import com.sloth.meeplo.schedule.entity.Schedule;
import com.sloth.meeplo.schedule.repository.ScheduleRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@RequiredArgsConstructor
@Service
public class GroupServiceImpl implements GroupService{

    private final GroupRepository groupRepository;
    private final GroupMemberRepository groupMemberRepository;
    private final ScheduleRepository scheduleRepository;


    private final LocalDate date = LocalDate.of(1111, 11,  11);
    private final LocalTime time = LocalTime.of(11,11,11);
    @Override
    public Long makeGroup(Map<String, Object> token, GroupRequest.GroupInput groupInput) {
        Group group = groupRepository.save(groupInput.toEntity());
        Member member = null;
        // TODO: 2022-10-31 jwt token 인식 이후 member데이터 접근 추가
        joinGroup(group, member, Role.LEADER);
        return group.getId();
    }

    @Override
    public void updateGroup(Map<String, Object> token, Long groupId, GroupRequest.GroupInput groupInput) {
        Group group = groupRepository.findById(groupId).
                orElseThrow(()-> new MeeploException(CommonErrorCode.NOT_EXIST_RESOURCE));
        Member member = null;


        if(isGroupLeader(group, member)){
            group = groupRepository.save(groupInput.toEntity());
        }
    }

    @Override
    public void deleteGroup(Map<String, Object> token, Long groupId) {
        Group group = groupRepository.findById(groupId).
                orElseThrow(()-> new MeeploException(CommonErrorCode.NOT_EXIST_RESOURCE));
        Member member = null;
        if(isGroupLeader(group, member)){
            groupRepository.delete(group);
        }
    }

    @Override
    public List<GroupResponse.JoinedGroupSummary> joinedGroupList(Map<String, Object> token) {
        Member member = null;

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
            group.add(GroupResponse.JoinedGroupSummary.builder().
                    id(groupMember.getGroup().getId()).
                    name(groupMember.getGroup().getName()).
                    photo(groupMember.getGroup().getGroupPhoto()).
                    memberCount(count).
                    leaderName(ln).
                    lastSchedule(lastschedule).
                    build()
            );
        }
        return group;
    }

    private boolean isGroupLeader(Group group, Member member){
        GroupMember groupMember = groupMemberRepository.findByGroupAndMember(group, member).
                orElseThrow(()-> new MeeploException(CommonErrorCode.NOT_EXIST_RESOURCE));

        if(groupMember.getRole()==Role.LEADER){
            return true;
        }else{
            throw new MeeploException(CommonErrorCode.UNAUTHORIZED);
        }
    }
    private void joinGroup(Group group, Member member, Role role){
        groupMemberRepository.save(
                GroupMember.builder().
                        member(member).
                        group(group).
                        role(role).
                        build()
        );
    }
}
