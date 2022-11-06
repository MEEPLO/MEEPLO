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
import com.sloth.meeplo.schedule.dto.response.ScheduleResponse;
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

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
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
        Schedule schedule = getScheduleByScheduleId(scheduleUpdateInput.getId());


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

    @Override
    @Transactional
    public void deleteSchedule(String authorization, Long scheduleId) {
        // TODO: 2022-11-05 약속 삭제시cascade? 또는 시작하지 않은 약속만? 
    }

    @Override
    public ScheduleResponse.ScheduleDetailInfo getScheduleDetail(String authorization, Long scheduleId) {
        Schedule schedule = getScheduleByScheduleId(scheduleId);
        return ScheduleResponse.ScheduleDetailInfo.builder().schedule(schedule).build();
    }

    public Schedule getScheduleByScheduleId(Long scheduleId){
        return scheduleRepository.findById(scheduleId)
                .orElseThrow(()-> new MeeploException(CommonErrorCode.NOT_EXIST_RESOURCE));
    }

    @Override
    public List<ScheduleResponse.ScheduleListInfo> getScheduleList(String authorization) {
        Member member = memberService.getMemberByAuthorization(authorization);
        return member.getScheduleMembers().stream()
                .map(sm -> ScheduleResponse.ScheduleListInfo.builder()
                        .schedule(sm.getSchedule())
                        .build())
                .collect(Collectors.toList());
    }

    @Override
    public List<String> getScheduleMonthList(String authorization, String yearMonth) {
        Member member = memberService.getMemberByAuthorization(authorization);
        LocalDateTime targetYearMonth = LocalDateTime.parse(yearMonth, DateTimeFormatter.ofPattern("yyyy-MM"));
        // TODO: 2022-11-06  성능 질문 (영속성을 사용해 java단에서 크기비교가 좋을까? 여러번 DB접근은 하지만 DB에서 비교해 가져오는게 좋을까)
//        member.getGroupMembers().stream().flatMap(gm-> scheduleRepository.findByGroupAndDateBetween(gm.getGroup(),targetYearMonth,targetYearMonth.plusMonths(1)))
        return null;
    }

    @Override
    public List<ScheduleResponse.ScheduleListInfo> getScheduleDailyList(String authorization, String date) {
        Member member = memberService.getMemberByAuthorization(authorization);
        LocalDateTime targetDate = LocalDateTime.parse(date, DateTimeFormatter.ofPattern("yyyy-MM-dd"));
        return member.getGroupMembers().stream()
                .flatMap(gm-> scheduleRepository
                        .findByGroupAndDate(gm.getGroup(),targetDate).stream())
                .map(s -> ScheduleResponse.ScheduleListInfo.builder()
                        .schedule(s)
                        .build())
                .collect(Collectors.toList());
    }
}
