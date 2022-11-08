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
import com.sloth.meeplo.moment.dto.response.MomentResponse;
import com.sloth.meeplo.schedule.dto.request.ScheduleRequest;
import com.sloth.meeplo.schedule.dto.response.KeywordResponse;
import com.sloth.meeplo.schedule.dto.response.ScheduleResponse;
import com.sloth.meeplo.schedule.entity.Schedule;
import com.sloth.meeplo.schedule.entity.ScheduleLocation;
import com.sloth.meeplo.schedule.entity.ScheduleMember;
import com.sloth.meeplo.schedule.exception.code.ScheduleErrorCode;
import com.sloth.meeplo.schedule.repository.ScheduleKeywordRepository;
import com.sloth.meeplo.schedule.repository.ScheduleLocationRepository;
import com.sloth.meeplo.schedule.repository.ScheduleMemberRepository;
import com.sloth.meeplo.schedule.repository.ScheduleRepository;
import com.sloth.meeplo.schedule.type.ScheduleMemberStatus;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.time.format.DateTimeFormatterBuilder;
import java.time.temporal.ChronoField;
import java.util.List;
import java.util.Map;
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

        isMemberScheduleLeader(member, schedule);
        isAfterScheduleDate(schedule);
        schedule.updateName(scheduleUpdateInput.getName());
        schedule.updateLocation(locationRepository.findById(scheduleUpdateInput.getMeetLocationId())
                .orElseThrow(()-> new MeeploException(CommonErrorCode.NOT_EXIST_RESOURCE)));
        schedule.updateDate(scheduleUpdateInput.getDate());
        scheduleRepository.save(schedule);

        schedule.getScheduleKeywords().clear();
        scheduleUpdateInput.getKeywords().stream()
                .map(ScheduleRequest.ScheduleInputKeyword::getId)
                .map(id -> scheduleKeywordRepository.findById(id)
                        .orElseThrow(()-> new MeeploException(CommonErrorCode.NOT_EXIST_RESOURCE)))
                .forEach(k-> schedule.getScheduleKeywords().add(k));

        // TODO: 2022-11-04 member삭제의 경우 unactivated로
        schedule.getScheduleMembers().stream()
                .filter(sm -> scheduleUpdateInput.getMembers().stream()
                        .anyMatch(o-> o.getId().equals(sm.getMember().getId()) && sm.getStatus().equals(ScheduleMemberStatus.UNACTIVATED)))
                .forEach(ScheduleMember::pendingStatus);
        schedule.getScheduleMembers().stream()
                .filter(sm -> scheduleUpdateInput.getMembers().stream()
                        .noneMatch(o-> o.getId().equals(sm.getMember().getId()) || sm.getRole().equals(Role.LEADER)))
                .forEach(ScheduleMember::unactivateStatus);
        scheduleUpdateInput.getMembers().stream()
                .filter(i -> schedule.getScheduleMembers().stream()
                        .noneMatch(o->o.getMember().getId().equals(i.getId())))
                .map(i -> memberRepository.findById(i.getId())
                        .orElseThrow(()-> new MeeploException(CommonErrorCode.NOT_EXIST_RESOURCE)))
                .forEach(m -> scheduleMemberRepository.save(ScheduleMember.builder()
                        .schedule(schedule)
                        .member(m)
                        .role(Role.MEMBER)
                        .build())
                );

        scheduleLocationRepository.deleteAllBySchedule(schedule);
        scheduleUpdateInput.getAmuses().stream().map(ScheduleRequest.ScheduleInputAmuse::getId)
                .map(id -> locationRepository.findById(id)
                        .orElseThrow(()-> new MeeploException(CommonErrorCode.NOT_EXIST_RESOURCE)))
                .forEach(location -> scheduleLocationRepository
                        .save(ScheduleLocation
                                .createScheduleLocation()
                                .schedule(schedule)
                                .location(location)
                                .build()
                        )
                );
    }

    @Override
    @Transactional
    public void deleteSchedule(String authorization, Long scheduleId) {
        Member member = memberService.getMemberByAuthorization(authorization);
        Schedule schedule = getScheduleByScheduleId(scheduleId);
        isMemberScheduleLeader(member, schedule);
        isAfterScheduleDate(schedule);
        scheduleRepository.delete(schedule);
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

    public ScheduleLocation getScheduleLocationById(Long scheduleLocationId){
        return scheduleLocationRepository.findById(scheduleLocationId)
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
        DateTimeFormatter formatter = new DateTimeFormatterBuilder()
                .appendPattern("yyyy-MM")
                .parseDefaulting(ChronoField.DAY_OF_MONTH, 1)
                .toFormatter();
        LocalDate localDate = LocalDate.parse(yearMonth, formatter);
        LocalDateTime targetYearMonth = LocalDateTime.of(localDate,LocalDateTime.MIN.toLocalTime());
        return member.getGroupMembers().stream()
                .flatMap(gm-> scheduleRepository
                        .findByGroupAndDateBetween(gm.getGroup(),targetYearMonth,targetYearMonth.plusMonths(1)).stream())
                .map(s->s.getDate().format(DateTimeFormatter.ofPattern("yyyy-MM-dd")))
                .distinct()
                .collect(Collectors.toList());
    }

    @Override
    public List<ScheduleResponse.ScheduleListInfo> getScheduleDailyList(String authorization, String date) {
        Member member = memberService.getMemberByAuthorization(authorization);
        LocalDate localDate = LocalDate.parse(date, DateTimeFormatter.ofPattern("yyyy-MM-dd"));
        LocalDateTime targetDate = LocalDateTime.of(localDate,LocalDateTime.MIN.toLocalTime());
        log.info(targetDate.toString());
        return member.getGroupMembers().stream()
                .flatMap(gm-> scheduleRepository
                        .findByGroupAndDateBetween(gm.getGroup(),targetDate, targetDate.plusDays(1)).stream())
                .map(s -> ScheduleResponse.ScheduleListInfo.builder()
                        .schedule(s)
                        .build())
                .collect(Collectors.toList());
    }

    @Override
    public List<KeywordResponse.KeyWordListInfo> getKeywordList() {
        return scheduleKeywordRepository.findAll().stream()
                .map(sk-> KeywordResponse.KeyWordListInfo.builder()
                        .scheduleKeyword(sk)
                        .build())
                .collect(Collectors.toList());
    }

    @Override
    public List<MomentResponse.MomentSimpleList> getMomentListBySchedule(String authorization, Long scheduleId) {
        return getScheduleByScheduleId(scheduleId)
                .getScheduleLocations().stream()
                .flatMap(sl->sl.getMoments().stream())
                .map(m-> MomentResponse.MomentSimpleList.builder()
                        .moment(m)
                        .build())
                .collect(Collectors.toList());
    }

    public void isMemberScheduleLeader(Member member, Schedule schedule){
        if(schedule.getScheduleMembers().stream().noneMatch(
                sm->sm.getRole().equals(Role.LEADER) && sm.getMember().getId().equals(member.getId())))
            throw new MeeploException(CommonErrorCode.UNAUTHORIZED);
    }

    public void isAfterScheduleDate(Schedule schedule){
        if(schedule.getDate().isBefore(LocalDateTime.now())) throw new MeeploException(ScheduleErrorCode.DUE_DATE_PASSED);
    }
}
