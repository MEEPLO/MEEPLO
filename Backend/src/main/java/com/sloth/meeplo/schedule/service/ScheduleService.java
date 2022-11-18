package com.sloth.meeplo.schedule.service;

import com.sloth.meeplo.member.entity.Member;
import com.sloth.meeplo.moment.dto.response.MomentResponse;
import com.sloth.meeplo.schedule.dto.request.ScheduleRequest;
import com.sloth.meeplo.schedule.dto.response.KeywordResponse;
import com.sloth.meeplo.schedule.dto.response.ScheduleResponse;
import com.sloth.meeplo.schedule.entity.Schedule;
import com.sloth.meeplo.schedule.entity.ScheduleLocation;
import com.sloth.meeplo.schedule.entity.ScheduleMember;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import springfox.documentation.annotations.ApiIgnore;

import java.util.List;
import java.util.Map;

public interface ScheduleService {

    Long createSchedule(String authorization, ScheduleRequest.ScheduleCreateInput scheduleCreateInput);

    Long createTempSchedule(String authorization, ScheduleRequest.ScheduleTempCreateInput scheduleTempCreateInput);

    void updateSchedule(String authorization, ScheduleRequest.ScheduleUpdateInput scheduleUpdateInput);

    void deleteSchedule(String authorization, Long scheduleId);

    ScheduleResponse.ScheduleDetailInfo getScheduleDetail(String authorization, Long scheduleId);


    Schedule getScheduleByScheduleId(Long scheduleId);

    ScheduleLocation getScheduleLocationById(Long scheduleLocationId);

    List<ScheduleResponse.ScheduleListInfo> getScheduleList(String authorization);

    List<String> getScheduleMonthList(String authorization, String yearMonth);

    List<ScheduleResponse.ScheduleListInfo> getScheduleDetailMonthList(String authorization, String yearMonth);
    List<ScheduleResponse.ScheduleListInfo> getScheduleDailyList(String authorization, String date);

    List<KeywordResponse.KeyWordListInfo> getKeywordList();

    List<MomentResponse.MomentSimpleList> getMomentListBySchedule(String authorization, Long scheduleId);

    void checkMemberScheduleLeader(Member member, Schedule schedule);

    void checkAfterScheduleDate(Schedule schedule);

    void checkMemberInSchedule(Schedule schedule, Member member);
    List<ScheduleResponse.ScheduleListInfo> getScheduleByUpcoming(String authorization);
    List<ScheduleResponse.ScheduleListInfo> getScheduleByUnwritten(String authorization);

    List<ScheduleMember> getScheduleMemberByMember(Member member);

    List<ScheduleMember> getScheduleMemberBySchedule(Schedule schedule);


}
