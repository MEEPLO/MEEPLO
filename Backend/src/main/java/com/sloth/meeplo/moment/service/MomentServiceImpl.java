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
import java.util.ArrayList;
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
    @Transactional(readOnly = true)
    public MomentResponse.MomentDetail getMomentDetail(String authorization, Long momentId) {
        Member member = memberService.getMemberByAuthorization(authorization);
        Moment moment = getMomentByMomentId(momentId);

        return MomentResponse.MomentDetail.builder()
                .moment(moment)
                .member(member)
                .comments(momentCommentRepository.findByMomentId(momentId))
                .commentCreated(momentCommentRepository.existsByMemberAndMoment(member,moment))
                .build();
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
        if(moment.getMomentReactions().contains(member)) throw new MeeploException(MomentErrorCode.ALREADY_REACTED);
        moment.getMomentReactions().add(member);
        momentRepository.save(moment);
        return (long) moment.getMomentReactions().size();
    }

    @Override
    @Transactional
    public Long deleteReaction(String authorization, Long momentId) {
        Member member = memberService.getMemberByAuthorization(authorization);
        Moment moment = getMomentByMomentId(momentId);

        if(!moment.getMomentReactions().remove(member)){
            throw new MeeploException(MomentErrorCode.NOT_YET_REACTED);
        }

        momentRepository.save(moment);
        return (long) moment.getMomentReactions().size();
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
        return momentCommentRepository.findByMomentId(momentId).stream()
                .map(mc -> MomentResponse.MomentDetailComment.builder()
                        .momentComment(mc)
                        .build())
                .collect(Collectors.toList());
    }

    @Override
    public Moment getMomentByMomentId(Long momentId){
        return momentRepository.findById(momentId)
                .orElseThrow(()-> new MeeploException(MomentErrorCode.NOT_EXIST_MOMENT));
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
    @Transactional(readOnly = true)
    public List<MomentResponse.MomentDetailComment> getComments(String authorization, Long momentId) {
        Moment moment = getMomentByMomentId(momentId);
        Member member = memberService.getMemberByAuthorization(authorization);

        groupService.checkMemberInGroup(member, moment.getScheduleLocation().getSchedule().getGroup());

        return momentCommentRepository.findByMomentId(momentId).stream()
                .map(mc -> MomentResponse.MomentDetailComment.builder()
                        .momentComment(mc)
                        .build())
                .collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public List<ScheduleResponse.JoinedScheduleMoment> getCalenderMoments(String authorization, String month) {
        Member member = memberService.getMemberByAuthorization(authorization);
        DateTimeFormatter formatter = new DateTimeFormatterBuilder()
                .appendPattern("yyyy-MM")
                .parseDefaulting(ChronoField.DAY_OF_MONTH, 1)
                .toFormatter();
        LocalDate localDate = LocalDate.parse(month, formatter);
        LocalDateTime targetDate = LocalDateTime.of(localDate,LocalDateTime.MIN.toLocalTime());

        return member.getScheduleMembers().stream()
                .filter(sm->sm.getSchedule().getDate().isBefore(targetDate.plusMonths(1))
                        && sm.getSchedule().getDate().isAfter(targetDate))
                .flatMap(sm -> sm.getSchedule().getScheduleLocations().stream())
                .flatMap(sl->sl.getMoments().stream())
                .map(m-> ScheduleResponse.JoinedScheduleMoment.builder()
                        .moment(m)
                        .build())
                .distinct()
                .collect(Collectors.toList());

    }

    @Override
    @Transactional(readOnly = true)
    public MomentResponse.MomentFeedTwoList getFeedMoment(String authorization, Integer page, Integer size, Long group, Integer leftSize, Integer rightSize, Boolean writer) {
        Member member = memberService.getMemberByAuthorization(authorization);

        List<Moment> momentList=member.getScheduleMembers().stream()
                .filter(sm -> (group == null) || sm.getSchedule().getGroup().getId().equals(group))
                .filter(sm->sm.getStatus().equals(ScheduleMemberStatus.JOINED))
                .flatMap(sm->sm.getSchedule().getScheduleLocations().stream())
                .flatMap(sl->momentRepository.findByScheduleLocation(sl).stream())
                .filter(m-> !writer || m.getMember().getId().equals(member.getId()))
                .distinct()
                .sorted((o1, o2) -> o2.getCreatedDate().compareTo(o1.getCreatedDate()))
                .collect(Collectors.toList());


        if(momentList.size()<page*size) throw new MeeploException(MomentErrorCode.NO_MORE_DATA);
        List<Moment> subList = momentList.subList(page*size, Math.min(momentList.size(), (page+1) *size));


        List<Moment> momentsLeft = new ArrayList<>();
        List<Moment> momentsRight = new ArrayList<>();
        int leftLength = leftSize;
        int rightLength = rightSize;
        for (Moment m: subList) {
            if(leftLength>rightLength){
                rightLength += m.getType().getSize();
                momentsRight.add(m);
            }else{
                leftLength += m.getType().getSize();
                momentsLeft.add(m);
            }
        }

        return MomentResponse.MomentFeedTwoList.builder()
                .momentsLeft(momentsLeft)
                .momentsRight(momentsRight)
                .leftSize(leftLength)
                .rightSize(rightLength)
                .moreData(momentList.size()> (page+1) *size)
                .build();
    }
}
