package com.sloth.meeplo.group.service;

import com.sloth.meeplo.group.dto.request.GroupRequest;
import com.sloth.meeplo.group.dto.response.GroupResponse;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestHeader;

import java.util.List;
import java.util.Map;

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
}
