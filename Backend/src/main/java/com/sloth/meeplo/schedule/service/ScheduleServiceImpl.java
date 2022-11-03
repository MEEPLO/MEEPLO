package com.sloth.meeplo.schedule.service;

import com.sloth.meeplo.member.entity.Member;
import com.sloth.meeplo.member.service.MemberService;
import com.sloth.meeplo.schedule.dto.request.ScheduleRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ScheduleServiceImpl implements ScheduleService{

    private final MemberService memberService;
    @Override
    public Long createSchedule(String authorization, ScheduleRequest.ScheduleCreateInput scheduleCreateInput) {

        Member member = memberService.getMemberByAuthorization(authorization);

        return null;
    }
}
