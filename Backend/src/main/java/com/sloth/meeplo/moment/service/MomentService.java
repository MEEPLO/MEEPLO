package com.sloth.meeplo.moment.service;

import com.sloth.meeplo.moment.dto.request.MomentRequest;
import com.sloth.meeplo.moment.dto.response.MomentResponse;
import com.sloth.meeplo.moment.entity.Moment;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;

public interface MomentService {
    MomentResponse.MomentDetail getMomentDetail(String authorization, Long momentId);

    Long createMoment(String authorization, MomentRequest.CreateMomentInfo createMomentInfo);

    Long createReaction(String authorization, Long momentId);

    Long deleteReaction(String authorization, Long momentId);

    Moment getMomentByMomentId(Long momentId);

}
