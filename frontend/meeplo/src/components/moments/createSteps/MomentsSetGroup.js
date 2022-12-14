import React from 'react';
import { View, Dimensions, Alert } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { getGroupList } from '../../../redux/groupSlice';
import Toast from 'react-native-toast-message';

import { TOAST_MESSAGE } from '../../../assets/constant/string';
import StepButton from '../../stepper/StepButton';
import SelectDropdown from '../../common/SelectDropdown';

const MomentsSetGroup = ({ toNext, toPrev, onFinish, visible }) => {
  const dispatch = useDispatch();
  const groupNameList = useSelector(state =>
    state.groupList.map(({ id, name }) => {
      return { key: id, value: name };
    }),
  );

  const groupNameIndex = useSelector(state => {
    const groupNameIndexMap = new Map(state.groupList.map(({ id, name }) => [id, name]));
    return Object.fromEntries(groupNameIndexMap);
  });

  const [selectedGroup, setSelectedGroup] = React.useState();

  const windowHeight = Dimensions.get('window').height;

  React.useEffect(() => {
    dispatch(getGroupList());
  }, []);

  const onPressNext = () => {
    const actions = [
      {
        type: 'UPDATE_GROUPID',
        payload: selectedGroup,
      },
      {
        type: 'UPDATE_GROUPNAME',
        payload: groupNameIndex[selectedGroup],
      },
    ];
    !!selectedGroup
      ? toNext(actions)
      : Toast.show({
          type: 'error',
          text1: TOAST_MESSAGE.REQUIRED_FIELD_ERROR,
          text2: TOAST_MESSAGE.MOMENT_NO_GROUP,
        });
  };

  return visible ? (
    <View style={{ height: windowHeight - 200, marginHorizontal: 20 }}>
      <SelectDropdown setSelected={setSelectedGroup} type="모임" data={groupNameList} required={true} />
      <View
        style={{
          width: '100%',
          position: 'absolute',
          bottom: 0,
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
        <StepButton text="" />
        <StepButton text="다음 >" active={true} onPress={onPressNext} />
      </View>
    </View>
  ) : null;
};

export default MomentsSetGroup;
