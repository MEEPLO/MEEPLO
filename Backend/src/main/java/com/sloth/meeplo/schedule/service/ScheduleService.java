package com.sloth.meeplo.schedule.service;

import com.sloth.meeplo.schedule.dto.request.ScheduleRequest;
import com.sloth.meeplo.schedule.dto.response.ScheduleResponse;
import com.sloth.meeplo.schedule.entity.Schedule;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.List;

public interface ScheduleService {

    Long createSchedule(String authorization, ScheduleRequest.ScheduleCreateInput scheduleCreateInput);

    void updateSchedule(String authorization, ScheduleRequest.ScheduleUpdateInput scheduleUpdateInput);

    void deleteSchedule(String authorization, Long scheduleId);

    ScheduleResponse.ScheduleDetailInfo getScheduleDetail(String authorization, Long scheduleId);


    Schedule getScheduleByScheduleId(Long scheduleId);

    List<ScheduleResponse.ScheduleListInfo> getScheduleList(String authorization);

    List<String> getScheduleMonthList(String authorization, String yearMonth);

    List<ScheduleResponse.ScheduleListInfo> getScheduleDailyList(String authorization, String date);

}
