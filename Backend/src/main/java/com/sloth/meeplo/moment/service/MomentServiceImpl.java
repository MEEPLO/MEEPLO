package com.sloth.meeplo.moment.service;

import com.sloth.meeplo.global.exception.MeeploException;
import com.sloth.meeplo.global.exception.code.CommonErrorCode;
import com.sloth.meeplo.group.service.GroupService;
import com.sloth.meeplo.member.entity.Member;
import com.sloth.meeplo.member.service.MemberService;
import com.sloth.meeplo.moment.dto.request.MomentRequest;
import com.sloth.meeplo.moment.dto.response.MomentResponse;
import com.sloth.meeplo.moment.entity.Moment;
import com.sloth.meeplo.moment.entity.MomentComment;
import com.sloth.meeplo.moment.exception.code.MomentErrorCode;
import com.sloth.meeplo.moment.repository.MomentCommentRepository;
import com.sloth.meeplo.moment.repository.MomentRepository;
import com.sloth.meeplo.schedule.dto.response.ScheduleResponse;
import com.sloth.meeplo.schedule.entity.ScheduleLocation;
import com.sloth.meeplo.schedule.service.ScheduleService;
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
import java.util.stream.Collectors;

@Slf4j
@Service
@RequiredArgsConstructor
public class MomentServiceImpl implements MomentService{

    private final MemberService memberService;
    private final ScheduleService scheduleService;
    private final GroupService groupService;

    private final MomentRepository momentRepository;
    private final MomentCommentRepository momentCommentRepository;

    @Override
    public MomentResponse.MomentDetail getMomentDetail(String authorization, Long momentId) {
        Member member = memberService.getMemberByAuthorization(authorization);
        Moment moment = getMomentByMomentId(momentId);
        scheduleService.checkMemberInSchedule(moment.getScheduleLocation().getSchedule(),member);
        return MomentResponse.MomentDetail.builder().moment(moment).member(member).build();
    }

    @Override
    @Transactional
    public Long createMoment(String authorization, MomentRequest.CreateMomentInfo createMomentInfo) {
        Member member = memberService.getMemberByAuthorization(authorization);
        ScheduleLocation scheduleLocation = scheduleService.getScheduleLocationById(createMomentInfo.getSchedulePlaceId());
        Moment moment = momentRepository.save(Moment.builder()
                .createMomentInfo(createMomentInfo)
                .member(member)
                .scheduleLocation(scheduleLocation)
                .build());
        return moment.getId();
    }

    @Override
    @Transactional
    public Long createReaction(String authorization, Long momentId) {
        Member member = memberService.getMemberByAuthorization(authorization);
        Moment moment = getMomentByMomentId(momentId);
        if(moment.getMembers().contains(member)) throw new MeeploException(MomentErrorCode.ALREADY_REACTED);
        moment.getMembers().add(member);
        momentRepository.save(moment);
        return (long) moment.getMembers().size();
    }

    @Override
    @Transactional
    public Long deleteReaction(String authorization, Long momentId) {
        Member member = memberService.getMemberByAuthorization(authorization);
        Moment moment = getMomentByMomentId(momentId);
        int idx = moment.getMembers().indexOf(member);
        if(idx<0){
            throw new MeeploException(MomentErrorCode.NOT_YET_REACTED);
        }
        moment.getMembers().remove(member);
        momentRepository.save(moment);
        return (long) moment.getMembers().size();
    }

    @Override
    @Transactional
    public List<MomentResponse.MomentDetailComment> createComment(String authorization, Long momentId, MomentRequest.CreateMomentCommentInfo createMomentCommentInfo) {
        Member member = memberService.getMemberByAuthorization(authorization);
        Moment moment = getMomentByMomentId(momentId);

        groupService.checkMemberInGroup(member, moment.getScheduleLocation().getSchedule().getGroup());

        if (momentCommentRepository.existsByMemberAndMoment(member,moment))
            throw new MeeploException(MomentErrorCode.ALREADY_COMMENTED);
        momentCommentRepository.save(MomentComment.builder()
                .createMomentCommentInfo(createMomentCommentInfo)
                .moment(moment)
                .member(member)
                .build());
        return moment.getMomentComments().stream()
                .map(mc -> MomentResponse.MomentDetailComment.builder()
                        .momentComment(mc)
                        .build())
                .collect(Collectors.toList());
    }

    @Override
    public Moment getMomentByMomentId(Long momentId){
        return momentRepository.findById(momentId)
                .orElseThrow(()-> new MeeploException(CommonErrorCode.NOT_EXIST_RESOURCE));
    }

    @Override
    @Transactional
    public void deleteMoment(String authorization, Long momentId) {
        Member member = memberService.getMemberByAuthorization(authorization);
        Moment moment = getMomentByMomentId(momentId);

        if(!moment.getMember().getId().equals(member.getId())) throw new MeeploException(CommonErrorCode.UNAUTHORIZED);

        momentRepository.delete(moment);
    }

    @Override
    public List<MomentResponse.MomentDetailComment> getComments(String authorization, Long momentId) {
        Moment moment = getMomentByMomentId(momentId);
        Member member = memberService.getMemberByAuthorization(authorization);

        groupService.checkMemberInGroup(member, moment.getScheduleLocation().getSchedule().getGroup());

        return moment.getMomentComments().stream().map(mc -> MomentResponse.MomentDetailComment.builder().momentComment(mc).build()).collect(Collectors.toList());
    }

    @Override
    public List<ScheduleResponse.JoinedScheduleMoment> getCalenderMoments(String authorization, String month) {
        Member member = memberService.getMemberByAuthorization(authorization);
        DateTimeFormatter formatter = new DateTimeFormatterBuilder()
                .appendPattern("yyyy-MM")
                .parseDefaulting(ChronoField.DAY_OF_MONTH, 1)
                .toFormatter();
        LocalDate localDate = LocalDate.parse(month, formatter);
        LocalDateTime targetDate = LocalDateTime.of(localDate,LocalDateTime.MIN.toLocalTime());
        // TODO: 2022-11-08 native query 적용 고려 
        return member.getScheduleMembers().stream()
                .filter(sm->sm.getSchedule().getDate().isBefore(targetDate.plusMonths(1)) && sm.getSchedule().getDate().isAfter(targetDate))
                .flatMap(sm -> sm.getSchedule().getScheduleLocations().stream())
                .flatMap(sl->sl.getMoments().stream())
                .map(m-> ScheduleResponse.JoinedScheduleMoment.builder().moment(m).build())
                .collect(Collectors.toList());

    }
}
