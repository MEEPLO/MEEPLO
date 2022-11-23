import React from 'react';
import { View, Dimensions, Text } from 'react-native';
import Toast from 'react-native-toast-message';

import { TOAST_MESSAGE } from '../../../assets/constant/string';
import StepTextInput from '../../common/StepTextInput';
import SelectDropdown from '../../common/SelectDropdown';
import StepButton from '../../stepper/StepButton';

const windowHeight = Dimensions.get('window').height;

const fonts = [
  { value: '고딕 아니고 고딩', key: 'gag' },
  { value: '박용준투사회보체', key: 'Pak_Yong_jun' },
  { value: '어비 혜키체', key: 'UhBee_Hyeki' },
  { value: '어비 컹컹체', key: 'UhBee_KeongKeong' },
  { value: '어비 세현체', key: 'UhBee_Se_hyun' },
];

const CommentsSetContent = ({ toNext, toPrev, onFinish, visible, state }) => {
  const [value, onValueChange] = React.useState('');
  const [font, setFont] = React.useState('gag');

  const onPressNext = () => {
    const actions = [
      {
        type: 'UPDATE_COMMENT',
        payload: value,
      },
      {
        type: 'UPDATE_FONT',
        payload: font,
      },
    ];
    value.trim() === ''
      ? Toast.show({
          type: 'error',
          text1: TOAST_MESSAGE.REQUIRED_FIELD_ERROR,
          text2: TOAST_MESSAGE.MOMENT_NO_COMMENT,
        })
      : toNext(actions);
  };

  return visible ? (
    <>
      <View style={{ position: 'relative', height: windowHeight - 200, marginHorizontal: 20 }}>
        <View style={{ position: 'absolute', top: 260 }}>
          <Text style={{ color: '#000', fontWeight: 'bold', marginBottom: 20 }}>댓글 확인</Text>
          <Text style={{ fontFamily: font, fontSize: font === 'gag' ? 26 : 22 }}>{value}</Text>
        </View>
        <View>
          <View style={{ marginBottom: 20 }}>
            <StepTextInput value={value} onValueChange={onValueChange} type="댓글" maxLength={50} required={true} />
          </View>
          <SelectDropdown setSelected={setFont} type="폰트" data={fonts} required={true} />
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
        <StepButton text="" />
        <StepButton text="다음 >" active={true} onPress={onPressNext} />
      </View>
    </>
  ) : null;
};

export default CommentsSetContent;
