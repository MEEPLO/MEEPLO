import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import { getGroupList, getGroupMembers } from '../../../redux/groupSlice';

import StepButton from '../../../components/stepper/StepButton';
import SelectDropdown from '../../../components/common/SelectDropdown';
import GroupMemberSelectList from '../../../components/Group/GroupMemberSelectList';

const ScheduleCreateMemberScreen = ({ state, toNext, toPrev, onFinish, visible }) => {
  const dispatch = useDispatch();
  const groupNameList = useSelector(state => {
    if (!state || !Array.isArray(state.groupList)) return [];

    return state.groupList.map(({ id, name }) => {
      return { key: id, value: name };
    });
  });

  const groupMemberList = useSelector(state => {
    if (!state || !state.group || !Array.isArray(state.group.members)) return [];

    return state.group.members;
  });

  const userInfo = useSelector(state => state.user.info);

  const [selectedGroup, setSelectedGroup] = useState();
  const [selectedMembers, setSelectedMembers] = useState([]);

  useEffect(() => {
    dispatch(getGroupList());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getGroupMembers({ groupId: selectedGroup }));
  }, [dispatch, selectedGroup]);

  useEffect(() => {
    setSelectedMembers([...selectedMembers, userInfo]);
  }, [userInfo]);

  const onSelectMember = member => {
    if (selectedMembers.find(selectedMember => selectedMember.id === member.id)) {
      setSelectedMembers(selectedMembers.filter(selectedMember => selectedMember.id !== member.id));
    } else {
      setSelectedMembers([...selectedMembers, member]);
    }
  };

  return visible ? (
    <View style={styles.screenStyle}>
      <View style={styles.inputViewStyle}>
        <SelectDropdown setSelected={setSelectedGroup} type="모임" data={groupNameList} required={true} />
      </View>

      {Number.isInteger(selectedGroup) ? (
        <View style={styles.inputViewStyle}>
          <GroupMemberSelectList
            type="모임 멤버 초대"
            members={groupMemberList}
            selectedMembers={selectedMembers}
            onSelect={onSelectMember}
          />
        </View>
      ) : null}
      <View style={styles.navigateViewStyle}>
        <StepButton text="< 이전" active={false} onPress={toPrev} />
        <StepButton text="다음 >" active={true} onPress={toNext} />
      </View>
    </View>
  ) : null;
};

const styles = StyleSheet.create({
  screenStyle: {
    width: '100%',
    height: '100%',
  },
  inputViewStyle: {
    marginBottom: 20,
  },
  navigateViewStyle: {
    width: '100%',

    position: 'absolute',
    bottom: 150,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default ScheduleCreateMemberScreen;
