package com.sloth.meeplo.schedule.service;

import com.sloth.meeplo.global.exception.MeeploException;
import com.sloth.meeplo.global.exception.code.CommonErrorCode;
import com.sloth.meeplo.global.type.Role;
import com.sloth.meeplo.group.entity.Group;
import com.sloth.meeplo.group.repository.GroupMemberRepository;
import com.sloth.meeplo.group.service.GroupService;
import com.sloth.meeplo.group.type.GroupMemberStatus;
import com.sloth.meeplo.location.repository.LocationRepository;
import com.sloth.meeplo.location.service.LocationService;
import com.sloth.meeplo.member.entity.Member;
import com.sloth.meeplo.member.exception.code.MemberErrorCode;
import com.sloth.meeplo.member.repository.MemberRepository;
import com.sloth.meeplo.member.service.MemberService;
import com.sloth.meeplo.moment.dto.response.MomentResponse;
import com.sloth.meeplo.schedule.dto.request.ScheduleRequest;
import com.sloth.meeplo.schedule.dto.response.KeywordResponse;
import com.sloth.meeplo.schedule.dto.response.ScheduleResponse;
import com.sloth.meeplo.schedule.entity.Schedule;
import com.sloth.meeplo.schedule.entity.ScheduleKeyword;
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
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.time.format.DateTimeFormatterBuilder;
import java.time.temporal.ChronoField;
import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
public class ScheduleServiceImpl implements ScheduleService{

    private final MemberService memberService;
    private final GroupService groupService;
    private final LocationService locationService;

    private final ScheduleRepository scheduleRepository;
    private final ScheduleLocationRepository scheduleLocationRepository;
    private final MemberRepository memberRepository;
    private final ScheduleMemberRepository scheduleMemberRepository;
    private final ScheduleKeywordRepository scheduleKeywordRepository;
    private final GroupMemberRepository groupMemberRepository;

    @Override
    @Transactional
    public Long createSchedule(String authorization, ScheduleRequest.ScheduleCreateInput scheduleCreateInput) {

        Member member = memberService.getMemberByAuthorization(authorization);
        Group group = groupService.getGroupEntityByGroupId(scheduleCreateInput.getGroupId());
        Schedule newSchedule = scheduleRepository.save(Schedule.CreateSchedule()
                .name(scheduleCreateInput.getName())
                .date(scheduleCreateInput.getDate())
                .group(group)
                .location(locationService.getLocationById(scheduleCreateInput.getMeetLocationId()))
                .build()
        );

        scheduleKeywordRepository.saveAll(scheduleCreateInput.getKeywords().stream()
                .map(k->ScheduleKeyword.builder().keyword(k).schedule(newSchedule).build())
                .collect(Collectors.toList()));

        scheduleMemberRepository.save(ScheduleMember.builder().schedule(newSchedule).member(member).role(Role.LEADER).build());
        scheduleMemberRepository.saveAll(
                scheduleCreateInput.getMembers().stream()
                        .map(ScheduleRequest.ScheduleInputMember::getId)
                        .filter(id-> !id.equals(member.getId()))
                        .map(id -> ScheduleMember.builder()
                                .schedule(newSchedule)
                                .member(memberRepository.findById(id)
                                        .orElseThrow(()-> new MeeploException(MemberErrorCode.NOT_EXIST_MEMBER)))
                                .role(Role.MEMBER).build())
                        .collect(Collectors.toList())
        );

        scheduleCreateInput.getAmuses().stream().map(ScheduleRequest.ScheduleInputAmuse::getId)
                .map(locationService::getLocationById)
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
    public Long createTempSchedule(String authorization, ScheduleRequest.ScheduleTempCreateInput scheduleTempCreateInput) {
        Member member = memberService.getMemberByAuthorization(authorization);
        Group group = groupService.getGroupEntityByGroupId(scheduleTempCreateInput.getGroupId());

        Schedule newSchedule = scheduleRepository.save(Schedule.CreateSchedule()
                .name(scheduleTempCreateInput.getName())
                .date(scheduleTempCreateInput.getDate())
                .group(group)
                .location(locationService.getLocationById(scheduleTempCreateInput.getMeetLocationId()))
                .build()
        );

        scheduleMemberRepository.save(ScheduleMember.builder().schedule(newSchedule).member(member).role(Role.LEADER).build());

        scheduleLocationRepository
                .save(ScheduleLocation
                        .createScheduleLocation()
                        .schedule(newSchedule)
                        .location(locationService.getLocationById(scheduleTempCreateInput.getMeetLocationId()))
                        .build()
                );

        return newSchedule.getId();
    }

    @Override
    @Transactional
    public void updateSchedule(String authorization, ScheduleRequest.ScheduleUpdateInput scheduleUpdateInput) {
        Member member = memberService.getMemberByAuthorization(authorization);
        Schedule schedule = getScheduleByScheduleId(scheduleUpdateInput.getId());

        checkMemberScheduleLeader(member, schedule);
        checkAfterScheduleDate(schedule);

        schedule.updateName(scheduleUpdateInput.getName());
        schedule.updateLocation(locationService.getLocationById(scheduleUpdateInput.getMeetLocationId()));
        schedule.updateDate(scheduleUpdateInput.getDate());
        scheduleRepository.save(schedule);

        scheduleKeywordRepository.deleteAllBySchedule(schedule);
        scheduleKeywordRepository.saveAll(scheduleUpdateInput.getKeywords().stream()
                .map(k->ScheduleKeyword.builder().keyword(k).build())
                .collect(Collectors.toList()));


        List<ScheduleMember> scheduleMembers = scheduleMemberRepository.findBySchedule(schedule);
        // 기존에 가입했지만 나간 사람 중 다시 추가된 경우
        scheduleMembers.stream()
                .filter(sm -> scheduleUpdateInput.getMembers().stream()
                        .anyMatch(o-> o.getId().equals(sm.getMember().getId()) && sm.getStatus().equals(ScheduleMemberStatus.UNACTIVATED)))
                .forEach(ScheduleMember::joinStatus);
        // 기존에 존재 했지만 리더도 아니며 추가되지 않은 경우
        scheduleMembers.stream()
                .filter(sm -> scheduleUpdateInput.getMembers().stream()
                        .noneMatch(o-> o.getId().equals(sm.getMember().getId()) || sm.getRole().equals(Role.LEADER)))
                .forEach(ScheduleMember::unactivateStatus);

        // 기존에 없고 새로 추가된 경우
        scheduleMemberRepository.saveAll(
                scheduleUpdateInput.getMembers().stream()
                        .filter(i -> schedule.getScheduleMembers().stream()
                                .noneMatch(o->o.getMember().getId().equals(i.getId())))
                        .map(i -> ScheduleMember.builder()
                                .schedule(schedule)
                                .member(memberService.getMemberById(i.getId()))
                                .role(Role.MEMBER)
                                .build())
                        .collect(Collectors.toList())
        );

        scheduleLocationRepository.deleteAllBySchedule(schedule);
        scheduleUpdateInput.getAmuses().stream().map(ScheduleRequest.ScheduleInputAmuse::getId)
                .map(locationService::getLocationById)
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
        checkMemberScheduleLeader(member, schedule);
        checkAfterScheduleDate(schedule);
        scheduleRepository.delete(schedule);
    }

    @Override
    @Transactional(readOnly = true)
    public ScheduleResponse.ScheduleDetailInfo getScheduleDetail(String authorization, Long scheduleId) {
        Member member = memberService.getMemberByAuthorization(authorization);
        Schedule schedule = getScheduleByScheduleId(scheduleId);

        groupService.checkMemberInGroup(member, schedule.getGroup());

        return ScheduleResponse.ScheduleDetailInfo.builder().schedule(schedule).build();
    }

    @Override
    public Schedule getScheduleByScheduleId(Long scheduleId){
        return scheduleRepository.findById(scheduleId)
                .orElseThrow(()-> new MeeploException(ScheduleErrorCode.NOT_EXIST_SCHEDULE));
    }

    @Override
    public ScheduleLocation getScheduleLocationById(Long scheduleLocationId){
        return scheduleLocationRepository.findById(scheduleLocationId)
                .orElseThrow(()-> new MeeploException(ScheduleErrorCode.NOT_EXIST_SCHEDULE_LOCATION));
    }

    @Override
    public List<ScheduleResponse.ScheduleListInfo> getScheduleList(String authorization) {
        Member member = memberService.getMemberByAuthorization(authorization);
        return scheduleMemberRepository.findByMember(member).stream()
                .filter(sm-> sm.getStatus().equals(ScheduleMemberStatus.JOINED))
                .map(sm -> ScheduleResponse.ScheduleListInfo.builder()
                        .schedule(sm.getSchedule())
                        .build())
                .collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public List<String> getScheduleMonthList(String authorization, String yearMonth) {
        Member member = memberService.getMemberByAuthorization(authorization);
        DateTimeFormatter formatter = new DateTimeFormatterBuilder()
                .appendPattern("yyyy-MM")
                .parseDefaulting(ChronoField.DAY_OF_MONTH, 1)
                .toFormatter();
        LocalDate localDate = LocalDate.parse(yearMonth, formatter);
        LocalDateTime targetYearMonth = LocalDateTime.of(localDate,LocalDateTime.MIN.toLocalTime());
        return groupMemberRepository.findByMember(member).stream()
                .filter(gm-> gm.getStatus().equals(GroupMemberStatus.ACTIVATED))
                .flatMap(gm-> scheduleRepository
                        .findByGroupAndDateBetween(gm.getGroup(),targetYearMonth,targetYearMonth.plusMonths(1)).stream())
                .map(s->s.getDate().format(DateTimeFormatter.ofPattern("yyyy-MM-dd")))
                .distinct()
                .collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public List<ScheduleResponse.ScheduleListInfo> getScheduleDetailMonthList(String authorization, String yearMonth) {
        Member member = memberService.getMemberByAuthorization(authorization);
        DateTimeFormatter formatter = new DateTimeFormatterBuilder()
                .appendPattern("yyyy-MM")
                .parseDefaulting(ChronoField.DAY_OF_MONTH, 1)
                .toFormatter();
        LocalDate localDate = LocalDate.parse(yearMonth, formatter);
        LocalDateTime targetYearMonth = LocalDateTime.of(localDate,LocalDateTime.MIN.toLocalTime());
        return groupMemberRepository.findByMember(member).stream()
                .filter(gm-> gm.getStatus().equals(GroupMemberStatus.ACTIVATED))
                .flatMap(gm-> scheduleRepository
                        .findByGroupAndDateBetween(gm.getGroup(),targetYearMonth, targetYearMonth.plusMonths(1)).stream())
                .map(s -> ScheduleResponse.ScheduleListInfo.builder()
                        .schedule(s)
                        .build())
                .collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public List<ScheduleResponse.ScheduleListInfo> getScheduleDailyList(String authorization, String date) {
        Member member = memberService.getMemberByAuthorization(authorization);
        LocalDate localDate = LocalDate.parse(date, DateTimeFormatter.ofPattern("yyyy-MM-dd"));
        LocalDateTime targetDate = LocalDateTime.of(localDate,LocalDateTime.MIN.toLocalTime());
        return groupMemberRepository.findByMember(member).stream()
                .filter(gm-> gm.getStatus().equals(GroupMemberStatus.ACTIVATED))
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
    @Transactional(readOnly = true)
    public List<MomentResponse.MomentSimpleList> getMomentListBySchedule(String authorization, Long scheduleId) {
        Member member = memberService.getMemberByAuthorization(authorization);
        Schedule schedule = getScheduleByScheduleId(scheduleId);

        groupService.checkMemberInGroup(member, schedule.getGroup());

        return scheduleLocationRepository.findBySchedule(schedule).stream()
                .flatMap(sl->sl.getMoments().stream())
                .map(m-> MomentResponse.MomentSimpleList.builder()
                        .moment(m)
                        .build())
                .distinct()
                .collect(Collectors.toList());
    }

    @Override
    public void checkMemberScheduleLeader(Member member, Schedule schedule){
        if(scheduleMemberRepository.findBySchedule(schedule).stream().noneMatch(
                sm->sm.getRole().equals(Role.LEADER) && sm.getMember().getId().equals(member.getId())))
            throw new MeeploException(CommonErrorCode.UNAUTHORIZED);
    }

    @Override
    public void checkAfterScheduleDate(Schedule schedule){
        if(schedule.getDate().isBefore(LocalDateTime.now())) throw new MeeploException(ScheduleErrorCode.DUE_DATE_PASSED);
    }

    @Override
    public void checkMemberInSchedule(Schedule schedule, Member member) {
        if(!scheduleMemberRepository.existsByMemberAndScheduleAndStatus(member, schedule, ScheduleMemberStatus.JOINED))
            throw new MeeploException(CommonErrorCode.UNAUTHORIZED);
    }

    @Override
    @Transactional(readOnly = true)
    public List<ScheduleResponse.ScheduleListInfo> getScheduleByUpcoming(String authorization) {
        Member member = memberService.getMemberByAuthorization(authorization);
        return scheduleMemberRepository.findByMember(member).stream()
                .filter(sm-> sm.getStatus().equals(ScheduleMemberStatus.JOINED)
                        && sm.getSchedule().getDate().isAfter(LocalDateTime.now()))
                .map(sm-> ScheduleResponse.ScheduleListInfo.builder()
                        .schedule(sm.getSchedule())
                        .build()
                )
                .distinct()
                .sorted(Comparator.comparing(ScheduleResponse.ScheduleListInfo::getDate))
                .collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public List<ScheduleResponse.ScheduleListInfo> getScheduleByUnwritten(String authorization) {
        Member member = memberService.getMemberByAuthorization(authorization);
        return scheduleMemberRepository.findByMember(member).stream()
                .filter(sm-> sm.getStatus().equals(ScheduleMemberStatus.JOINED)
                        && sm.getSchedule().getDate().isBefore(LocalDateTime.now())
                        && sm.getSchedule().getScheduleLocations().stream().mapToLong(sl->sl.getMoments().size()).sum()==0)
                .map(sm-> ScheduleResponse.ScheduleListInfo.builder()
                        .schedule(sm.getSchedule())
                        .build()
                )
                .distinct()
                .sorted((s1,s2)->s2.getDate().compareTo(s1.getDate()))
                .collect(Collectors.toList());
    }

    @Override
    public List<ScheduleMember> getScheduleMemberByMember(Member member){
        return scheduleMemberRepository.findByMember(member);
    }

    @Override
    public List<ScheduleMember> getScheduleMemberBySchedule(Schedule schedule){
        return scheduleMemberRepository.findBySchedule(schedule);
    }
}
