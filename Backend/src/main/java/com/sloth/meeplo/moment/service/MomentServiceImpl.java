package com.sloth.meeplo.moment.service;

import com.sloth.meeplo.global.exception.MeeploException;
import com.sloth.meeplo.global.exception.code.CommonErrorCode;
import com.sloth.meeplo.member.entity.Member;
import com.sloth.meeplo.member.service.MemberService;
import com.sloth.meeplo.moment.dto.request.MomentRequest;
import com.sloth.meeplo.moment.dto.response.MomentResponse;
import com.sloth.meeplo.moment.entity.Moment;
import com.sloth.meeplo.moment.repository.MomentRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Slf4j
@Service
@RequiredArgsConstructor
public class MomentServiceImpl implements MomentService{

    private final MemberService memberService;

    private final MomentRepository momentRepository;

    @Override
    public MomentResponse.MomentDetail getMomentDetail(String authorization, Long momentId) {
        Member member = memberService.getMemberByAuthorization(authorization);
        Moment moment = getMomentByMomentId(momentId);

        return MomentResponse.MomentDetail.builder().moment(moment).member(member).build();
    }

    // TODO: 2022-11-06 group과 연결된 schedule 생성 요소들 재확인필요 
    @Override
    @Transactional
    public Long createMoment(String authorization, MomentRequest.CreateMomentInfo createMomentInfo) {
//        Moment moment = momentRepository.save(Moment.)
        return null;
    }

    @Override
    @Transactional
    public Long createReaction(String authorization, Long momentId) {
        Member member = memberService.getMemberByAuthorization(authorization);
        Moment moment = getMomentByMomentId(momentId);

        moment.getMembers().add(member);
        momentRepository.save(moment);
        return (long) moment.getMembers().size();
    }

    @Override
    public Moment getMomentByMomentId(Long momentId){
        return momentRepository.findById(momentId)
                .orElseThrow(()-> new MeeploException(CommonErrorCode.NOT_EXIST_RESOURCE));
    }
}
