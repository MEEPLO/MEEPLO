import React from 'react';
import { View, Dimensions } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { getGroupList } from '../../../redux/groupSlice';

import StepButton from '../../stepper/StepButton';
import SelectDropdown from '../../common/SelectDropdown';

const MomentsSetGroup = ({ toNext, toPrev, onFinish, visible }) => {
  const dispatch = useDispatch();
  const groupList = useSelector(state => state.groupList);

  const [selectedGroup, setSelectedGroup] = React.useState('');
  const [groupsData, setGroupsData] = React.useState([]);

  const windowHeight = Dimensions.get('window').height;

  React.useEffect(() => {
    dispatch(getGroupList());
    groupList.group.forEach(group => {
      setGroupsData(prevData => [...prevData, { key: group.id, value: group.name }]);
    });
  }, []);

  const onPressNext = () => {
    const actions = [
      {
        type: 'UPDATE_GROUPID',
        payload: selectedGroup,
      },
    ];
    toNext(actions);
  };

  return visible ? (
    <View style={{ height: windowHeight - 150, marginHorizontal: 20 }}>
      <SelectDropdown setSelected={setSelectedGroup} type="모임" data={groupsData} required={true} />
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
