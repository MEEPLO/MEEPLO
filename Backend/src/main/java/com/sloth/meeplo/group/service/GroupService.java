package com.sloth.meeplo.group.service;

import com.sloth.meeplo.group.dto.request.GroupRequest;
import com.sloth.meeplo.group.dto.response.GroupResponse;
import com.sloth.meeplo.group.entity.Group;
import com.sloth.meeplo.member.entity.Member;

import java.util.List;

public interface GroupService {

    Long makeGroup(String authorization, GroupRequest.GroupInput groupInput);

    void updateGroup(String authorization, Long groupId, GroupRequest.GroupInput groupInput);

    void deleteGroup(String authorization, Long groupId);

    List<GroupResponse.JoinedGroupSummary> joinedGroupList (String authorization);

    GroupResponse.JoinedGroupDetail getJoinedGroupDetail (String authorization,  Long groupId);

    List<GroupResponse.GroupDetailMember> getGroupMembers (String authorization,  Long groupId);

    void exitGroupMember(String authorization, Long groupId);

    void joinToGroup(String authorization, Long groupId);

    void kickGroupMember(String authorization, Long groupId, Long memberId);

    Group getGroupEntityByGroupId(Long groupId);

    void checkMemberInGroup(Member member, Group group);
    List<GroupResponse.FeedMoment> getFeedMoments(String authorization, Long groupId);
    List<GroupResponse.MapMoment> getMapMoments(String authorization, Long groupId);
}
