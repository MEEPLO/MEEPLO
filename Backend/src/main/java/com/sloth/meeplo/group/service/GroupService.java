package com.sloth.meeplo.group.service;

import com.sloth.meeplo.group.dto.request.GroupRequest;
import com.sloth.meeplo.group.dto.response.GroupResponse;

import java.util.List;
import java.util.Map;

public interface GroupService {

    Long makeGroup(Map<String, Object> token, GroupRequest.GroupInput groupInput);

    void updateGroup(Map<String, Object> token, Long groupId, GroupRequest.GroupInput groupInput);

    void deleteGroup(Map<String, Object> token, Long groupId);

    List<GroupResponse.JoinedGroupSummary> joinedGroupList (Map<String, Object> token);
}
