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
        scheduleCreateInput.getKeywords().stream().map(ScheduleRequest.ScheduleInputKeyword::getId)
                .map(id -> scheduleKeywordRepository.findById(id)
                        .orElseThrow(()-> new MeeploException(CommonErrorCode.NOT_EXIST_RESOURCE)))
                .forEach(k-> newSchedule.getScheduleKeywords().add(k));

        scheduleMemberRepository.save(ScheduleMember.builder().schedule(newSchedule).member(member).role(Role.LEADER).build());
        scheduleCreateInput.getMembers().stream().map(ScheduleRequest.ScheduleInputMember::getId)
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

        scheduleCreateInput.getAmuses().stream().map(ScheduleRequest.ScheduleInputAmuse::getId)
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

    @Override
    @Transactional
    public void updateSchedule(String authorization, ScheduleRequest.ScheduleUpdateInput scheduleUpdateInput) {
        Member member = memberService.getMemberByAuthorization(authorization);
        Group group = groupService.getGroupEntityByGroupId(scheduleUpdateInput.getGroupId());
        Schedule schedule = scheduleRepository.findById(scheduleUpdateInput.getId())
                .orElseThrow(()-> new MeeploException(CommonErrorCode.NOT_EXIST_RESOURCE));


        //내부값 수정
//        schedule
//                .name(scheduleCreateInput.getName())
//                .date(scheduleCreateInput.getDate())
//        // TODO: 2022-11-04 리더인경우만 수정가능하도록
////        if(scheduleMemberRepository.)
//
//        // TODO: 2022-11-04 clear로 삭제 가능한가 확인
//        schedule.getScheduleKeywords().clear();
//        scheduleUpdateInput.getKeywords().stream().map(ScheduleRequest.ScheduleInputKeyword::getId)
//                .map(id -> scheduleKeywordRepository.findById(id)
//                        .orElseThrow(()-> new MeeploException(CommonErrorCode.NOT_EXIST_RESOURCE)))
//                .forEach(k-> schedule.getScheduleKeywords().add(k));
//
//        // TODO: 2022-11-04 member삭제의 경우 unactivated로
//        scheduleUpdateInput.getMembers().stream().map(ScheduleRequest.ScheduleInputMember::getId)
//                .map(id -> memberRepository.findById(id)
//                        .orElseThrow(()-> new MeeploException(CommonErrorCode.NOT_EXIST_RESOURCE)))
//                .forEach(m -> scheduleMemberRepository
//                        .save(ScheduleMember
//                                .builder()
//                                .schedule(newSchedule)
//                                .member(m)
//                                .role(Role.MEMBER)
//                                .build()
//                        )
//                );
//// TODO: 2022-11-04
//        scheduleUpdateInput.getAmuses().stream().map(ScheduleRequest.ScheduleInputAmuse::getId)
//                .map(id -> locationRepository.findById(id)
//                        .orElseThrow(()-> new MeeploException(CommonErrorCode.NOT_EXIST_RESOURCE)))
//                .forEach(location -> scheduleLocationRepository
//                        .save(ScheduleLocation
//                                .createScheduleLocation()
//                                .schedule(newSchedule)
//                                .location(location)
//                                .build()
//                        )
//                );
//
        scheduleRepository.save(schedule);
    }
}
