package com.sloth.meeplo.moment.service;

import com.sloth.meeplo.moment.dto.request.MomentRequest;
import com.sloth.meeplo.moment.dto.response.MomentResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;

public interface MomentService {
    MomentResponse.MomentDetail getMomentDetail(String authorization, Long momentId);

    Long createMoment(String authorization, MomentRequest.CreateMomentInfo createMomentInfo);
}
