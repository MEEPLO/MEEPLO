import { View, Text, Dimensions } from 'react-native';
import React from 'react';
import AutoHeightImage from 'react-native-auto-height-image';
import StepButton from '../../stepper/StepButton';
// import { useSelector } from 'react-redux';

const MomentSetCheck = ({ toNext, toPrev, onFinish, visible, state }) => {
  const windowWidth = Dimensions.get('window').width - 40;
  const windowHeight = Dimensions.get('window').height;

  // const [selectedGroup, setSelectedGroup] = React.useState('');
  // const groupNameList = useSelector(state =>
  //   state.groupList.map(({ id, name }) => {
  //     return { key: id, value: name };
  //   }),
  // );

  const imgWidth = {
    1: 0.86,
    2: 1.25,
    3: 0.277,
  };

  console.log(state);

  return visible ? (
    <View style={{ height: windowHeight - 150, marginHorizontal: 20 }}>
      <View>
        <Text>입력 사항 체크</Text>
      </View>
      <View style={{ marginHorizontal: 20 }}>
        <View style={{ height: 90 }}>
          <Text style={{ lineHeight: 90, fontSize: 15 }}>
            그룹:
            <Text style={{ lineHeight: 90, fontWeight: '800', fontSize: 17 }}> {state.groupId}</Text>
          </Text>
        </View>
        <View style={{ height: 90 }}>
          <Text style={{ lineHeight: 90, fontSize: 15 }}>
            약속 장소:
            <Text style={{ lineHeight: 90, fontWeight: '800', fontSize: 17 }}> {state.schedulePlaceId}</Text>
          </Text>
        </View>
        <View>
          <Text style={{ lineHeight: 90, fontSize: 15 }}>사진</Text>
          <AutoHeightImage
            source={{ uri: state.photoUrl }}
            width={state.type === 2 ? windowWidth * 0.2 : windowWidth * 0.8}
            style={{ marginLeft: state.type === 2 ? windowWidth * 0.4 - 40 : windowWidth * 0.1 - 40 }}
          />
        </View>
      </View>
      <View
        style={{
          width: '100%',
          position: 'absolute',
          bottom: 0,
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
        <StepButton text="< 이전" active={true} onPress={toPrev} />
        <StepButton text="만들기" active={true} onPress={onFinish} />
      </View>
    </View>
  ) : null;
};

export default MomentSetCheck;
