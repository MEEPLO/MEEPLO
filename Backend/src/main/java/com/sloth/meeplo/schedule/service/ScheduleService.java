package com.sloth.meeplo.schedule.service;

import com.sloth.meeplo.schedule.dto.request.ScheduleRequest;
import org.springframework.web.bind.annotation.RequestBody;

public interface ScheduleService {

    Long createSchedule(String authorization, ScheduleRequest.ScheduleCreateInput scheduleCreateInput);
}
