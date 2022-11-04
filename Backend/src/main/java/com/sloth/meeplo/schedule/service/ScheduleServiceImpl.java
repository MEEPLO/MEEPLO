package com.sloth.meeplo.schedule.service;

import com.sloth.meeplo.global.exception.MeeploException;
import com.sloth.meeplo.global.exception.code.CommonErrorCode;
import com.sloth.meeplo.global.type.Role;
import com.sloth.meeplo.group.entity.Group;
import com.sloth.meeplo.group.service.GroupService;
import com.sloth.meeplo.location.repository.LocationRepository;
import com.sloth.meeplo.member.entity.Member;
import com.sloth.meeplo.member.repository.MemberRepository;
import com.sloth.meeplo.member.service.MemberService;
import com.sloth.meeplo.schedule.dto.request.ScheduleRequest;
import com.sloth.meeplo.schedule.entity.Schedule;
import com.sloth.meeplo.schedule.entity.ScheduleKeyword;
import com.sloth.meeplo.schedule.entity.ScheduleLocation;
import com.sloth.meeplo.schedule.entity.ScheduleMember;
import com.sloth.meeplo.schedule.repository.ScheduleKeywordRepository;
import com.sloth.meeplo.schedule.repository.ScheduleLocationRepository;
import com.sloth.meeplo.schedule.repository.ScheduleMemberRepository;
import com.sloth.meeplo.schedule.repository.ScheduleRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
public class ScheduleServiceImpl implements ScheduleService{

    private final MemberService memberService;
    private final GroupService groupService;
    private final ScheduleRepository scheduleRepository;
    private final ScheduleLocationRepository scheduleLocationRepository;
    private final MemberRepository memberRepository;
    private final ScheduleMemberRepository scheduleMemberRepository;
    private final ScheduleKeywordRepository scheduleKeywordRepository;
    private final LocationRepository locationRepository;
    @Override
    @Transactional
    public Long createSchedule(String authorization, ScheduleRequest.ScheduleCreateInput scheduleCreateInput) {

        Member member = memberService.getMemberByAuthorization(authorization);
        Group group = groupService.getGroupEntityByGroupId(scheduleCreateInput.getGroupId());
        Schedule newSchedule = scheduleRepository.save(Schedule.CreateSchedule()
                .name(scheduleCreateInput.getName())
                .date(scheduleCreateInput.getDate())
                .group(group)
                .location(locationRepository.findById(scheduleCreateInput.getMeetLocationId())
                        .orElseThrow(()-> new MeeploException(CommonErrorCode.NOT_EXIST_RESOURCE)))
                .build()
        );
        scheduleCreateInput.getKeywords().stream().map(ScheduleRequest.ScheduleCreateInputKeyword::getId)
                .map(id -> scheduleKeywordRepository.findById(id)
                        .orElseThrow(()-> new MeeploException(CommonErrorCode.NOT_EXIST_RESOURCE)))
                .forEach(k-> newSchedule.getScheduleKeywords().add(k));

        scheduleMemberRepository.save(ScheduleMember.builder().schedule(newSchedule).member(member).role(Role.LEADER).build());
        scheduleCreateInput.getMembers().stream().map(ScheduleRequest.ScheduleCreateInputMember::getId)
                .map(id -> memberRepository.findById(id)
                        .orElseThrow(()-> new MeeploException(CommonErrorCode.NOT_EXIST_RESOURCE)))
                .forEach(m -> scheduleMemberRepository
                        .save(ScheduleMember
                                .builder()
                                .schedule(newSchedule)
                                .member(m)
                                .role(Role.MEMBER)
                                .build()
                        )
                );

        scheduleCreateInput.getAmuses().stream().map(ScheduleRequest.ScheduleCreateInputAmuse::getId)
                .map(id -> locationRepository.findById(id)
                        .orElseThrow(()-> new MeeploException(CommonErrorCode.NOT_EXIST_RESOURCE)))
                .forEach(location -> scheduleLocationRepository
                        .save(ScheduleLocation
                                .createScheduleLocation()
                                .schedule(newSchedule)
                                .location(location)
                                .build()
                        )
                );
        return newSchedule.getId();
    }
}
