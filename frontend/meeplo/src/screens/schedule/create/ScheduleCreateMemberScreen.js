import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import Toast from 'react-native-toast-message';

import { getGroupList, getGroupMembers } from '../../../redux/groupSlice';
import { TOAST_MESSAGE } from '../../../assets/constant/string';

import StepButton from '../../../components/stepper/StepButton';
import SelectDropdown from '../../../components/common/SelectDropdown';
import GroupMemberSelectList from '../../../components/Group/GroupMemberSelectList';

const ScheduleCreateMemberScreen = ({ state, toNext, toPrev, onFinish, visible }) => {
  const dispatch = useDispatch();

  const [selectedMembers, setSelectedMembers] = useState([]);
  const [groupNameList, setGroupNameList] = useState([]);
  const [group, setGroup] = useState();

  const groupList = useSelector(state => state.groupList);

  useEffect(() => {
    console.log('member', state.members);
    setGroup(state.group);
    setSelectedMembers(state.members);
    dispatch(getGroupList());
  }, []);

  useEffect(() => {
    if (Array.isArray(groupList)) {
      setGroupNameList(
        groupList.map(({ id, name }) => {
          return { key: id, value: name };
        }),
      );
    }
  }, [groupList]);

  const groupMemberList = useSelector(state => {
    if (!state || !state.group || !Array.isArray(state.group.members)) return [];
    return state.group.members;
  });

  const userInfo = useSelector(state => state.user.info);

  useEffect(() => {
    setSelectedMembers([...selectedMembers, userInfo]);
  }, [userInfo]);

  useEffect(() => {}, [selectedMembers]);

  useEffect(() => {
    if (group && group.id) {
      dispatch(getGroupMembers({ groupId: group.id }));
    }
  }, [group]);

  const onSelectGroup = groupId => {
    if (group.id !== groupId) {
      setSelectedMembers([userInfo]);
    }
    setGroup(groupList.find(g => g.id === groupId));
  };

  const onSelectMember = member => {
    if (selectedMembers.find(m => m.id === member.id)) {
      setSelectedMembers(selectedMembers.filter(m => m.id !== member.id));
    } else {
      setSelectedMembers([...selectedMembers, member]);
    }
  };

  const validateInput = () => {
    if (!group || !group.id) {
      Toast.show({
        type: 'error',
        text1: TOAST_MESSAGE.REQUIRED_FIELD_ERROR,
        text2: TOAST_MESSAGE.SCHEDULE_NO_GROUP,
      });
      return false;
    } else if (!Array.isArray(selectedMembers) || selectedMembers.length === 0) {
      Toast.show({
        type: 'error',
        text1: TOAST_MESSAGE.REQUIRED_FIELD_ERROR,
        text2: TOAST_MESSAGE.SCHEDULE_NO_MEMBERS,
      });
      return false;
    }

    return true;
  };

  const onPressNext = () => {
    if (validateInput()) {
      const actions = [
        {
          type: 'UPDATE_GROUP',
          payload: group,
        },
        {
          type: 'UPDATE_MEMBERS',
          payload: selectedMembers.filter(member => member.id !== userInfo.id),
        },
      ];

      toNext(actions);
    }
  };

  return visible ? (
    <View style={styles.screenStyle}>
      <View style={styles.inputViewStyle}>
        <SelectDropdown
          setSelected={onSelectGroup}
          type="그룹"
          data={groupNameList}
          required={true}
          defaultOption={{ key: group?.id, value: group?.name }}
        />
      </View>

      {group && group.id ? (
        <View style={styles.inputViewStyle}>
          <GroupMemberSelectList
            type="그룹 멤버 초대"
            members={groupMemberList}
            selectedMembers={selectedMembers}
            user={userInfo}
            required
            onSelect={onSelectMember}
          />
        </View>
      ) : null}
      <View style={styles.navigateViewStyle}>
        <StepButton text="< 이전" active={false} onPress={toPrev} />
        <StepButton text="다음 >" active={true} onPress={onPressNext} />
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
    bottom: 100,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default ScheduleCreateMemberScreen;
