import { View, Text, Dimensions } from 'react-native';
import React from 'react';
import AutoHeightImage from 'react-native-auto-height-image';
import StepButton from '../../stepper/StepButton';
import { theme } from '../../../assets/constant/DesignTheme';
import FontText from '../../common/FontText';

const MomentSetCheck = ({ toNext, toPrev, onFinish, visible, state }) => {
  const windowWidth = Dimensions.get('window').width - 40;
  const windowHeight = Dimensions.get('window').height;

  console.log(state);

  return visible ? (
    <View style={{ height: windowHeight - 200, marginHorizontal: 20 }}>
      <View style={{ height: 90 }}>
        <FontText style={{ lineHeight: 50, fontWeight: 'bold', fontSize: 18, color: 'gray' }}>입력 사항 체크</FontText>
        <FontText style={{ fontSize: 14, color: theme.font.color }}>
          <FontText style={{ color: theme.color.alert, fontWeight: 'bold' }}>! </FontText> 생성된 추억은 다시 지울 수
          없어요.
        </FontText>
      </View>
      <View style={{ marginHorizontal: 20 }}>
        <View style={{ height: 50 }}>
          <FontText style={{ lineHeight: 50, fontSize: 15, color: 'gray' }}>
            그룹:
            <FontText style={{ lineHeight: 50, fontWeight: 'bold', fontSize: 17, color: 'gray' }}>
              {' '}
              {state.groupName}
            </FontText>
          </FontText>
        </View>
        <View style={{ height: 50 }}>
          <FontText style={{ lineHeight: 50, fontSize: 15, color: 'gray' }}>
            약속
            <FontText style={{ lineHeight: 50, fontWeight: 'bold', fontSize: 17, color: 'gray' }}>
              {' '}
              {state.scheduleName} / {state.placeName}
            </FontText>
          </FontText>
        </View>
        <View>
          <FontText style={{ lineHeight: 45, fontSize: 15, color: 'gray' }}>사진</FontText>
          <AutoHeightImage
            source={{ uri: state.photoUrl }}
            width={state.type === 2 ? windowWidth * 0.2 : windowWidth * 0.8}
            style={{
              borderWidth: 1,
              borderColor: '#ddd',
              marginLeft: state.type === 2 ? windowWidth * 0.3 - 40 : windowWidth * 0.1 - 40,
            }}
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
