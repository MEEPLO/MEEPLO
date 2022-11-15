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

  const [group, setGroup] = useState();
  const [members, setMembers] = useState([]);

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

  useEffect(() => {
    setGroup(state.group);
    setMembers(state.members);
  }, [state]);

  useEffect(() => {
    dispatch(getGroupList());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getGroupMembers({ groupId: group }));
  }, [dispatch, group]);

  useEffect(() => {
    setMembers([...members, userInfo]);
  }, [userInfo]);

  const onSelectGroup = group => {
    setGroup(group);
  };

  const onSelectMember = member => {
    if (members.find(m => m.id === member.id)) {
      setMembers(members.filter(m => m.id !== member.id));
    } else {
      setMembers([...members, member]);
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
    } else if (!Array.isArray(members) || members.length === 0) {
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
          payload: members,
        },
      ];

      toNext(actions);
    }
  };

  return visible ? (
    <View style={styles.screenStyle}>
      <View style={styles.inputViewStyle}>
        <SelectDropdown setSelected={onSelectGroup} type="모임" data={groupNameList} required={true} />
      </View>

      {Number.isInteger(group) ? (
        <View style={styles.inputViewStyle}>
          <GroupMemberSelectList
            type="모임 멤버 초대"
            members={groupMemberList}
            members={members}
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
