package com.sloth.meeplo.moment.service;

import com.sloth.meeplo.moment.dto.request.MomentRequest;
import com.sloth.meeplo.moment.dto.response.MomentResponse;
import com.sloth.meeplo.moment.entity.Moment;
import com.sloth.meeplo.schedule.dto.response.ScheduleResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;

import java.util.List;

public interface MomentService {
    MomentResponse.MomentDetail getMomentDetail(String authorization, Long momentId);

    Long createMoment(String authorization, MomentRequest.CreateMomentInfo createMomentInfo);

    Long createReaction(String authorization, Long momentId);

    Long deleteReaction(String authorization, Long momentId);

    List<MomentResponse.MomentDetailComment> createComment(String authorization, Long momentId, MomentRequest.CreateMomentCommentInfo createMomentCommentInfo);

    Moment getMomentByMomentId(Long momentId);

    void deleteMoment(String authorization, Long momentId);

    List<MomentResponse.MomentDetailComment> getComments(String authorization, Long momentId);

    List<ScheduleResponse.JoinedScheduleMoment> getCalenderMoments(String authorization, String month);


}
