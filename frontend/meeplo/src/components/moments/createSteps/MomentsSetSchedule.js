import React from 'react';
import { View, Text, Pressable, Modal } from 'react-native';
import { theme } from '../../../assets/constant/DesignTheme';
import SelectDropdown from '../../common/SelectDropdown';
import StepTextInput from '../../common/StepTextInput';
import StepDateInput from '../../common/StepDateInput';

const MomentsSetSchedule = () => {
  const [scheduleModal, setScheduleModal] = React.useState(false);

  const data = [
    { key: '1', value: '양꼬치 먹으러 갈 ㅅㅏ람' },
    { key: '2', value: '221101 회식' },
    { key: '3', value: '약속명은최대이십자입니다이길이가딱이십자' },
    { key: '4', value: '언젠가의 만남' },
    { key: '5', value: '언젠가의 만남' },
    { key: '6', value: '언젠가의 만남' },
    { key: '7', value: '언젠가의 만남' },
    { key: '8', value: '언젠가의 만남' },
    { key: '9', value: '언젠가의 만남' },
    { key: '10', value: '언젠가의 만남' },
    { key: '11', value: '언젠가의 만남' },
    { key: '12', value: '언젠가의 만남' },
    { key: '13', value: '언젠가의 만남' },
    { key: '14', value: '언젠가의 만남' },
    { key: '15', value: '언젠가의 만남' },
    { key: '16', value: '언젠가의 만남' },
    { key: '17', value: '언젠가의 만남' },
  ];

  return (
    <View style={{ position: 'relative' }}>
      <View
        style={{
          width: '100%',
          position: 'absolute',
          top: 220,
        }}>
        <Pressable onPress={() => setScheduleModal(true)}>
          <Text style={{ textAlign: 'center', fontSize: 16, color: theme.color.bright.red, fontWeight: '800' }}>
            아직 약속을 만들지 않았어요! >
          </Text>
        </Pressable>
      </View>
      <SelectDropdown type="약속" data={data} required={true} />

      {/* date modal */}
      <Modal visible={scheduleModal} animationType={'slide'} presentationStyle={'pageSheet'}>
        <View style={{ marginTop: 50, marginHorizontal: 40 }}>
          <View style={{ marginBottom: 30 }}>
            <StepDateInput type="일시" required={true} />
          </View>
          <View style={{ marginBottom: 30 }}>
            <StepTextInput type="약속 이름" maxLength={20} required={true} />
          </View>
          <View style={{ marginBottom: 30 }}>
            <StepTextInput type="약속 장소" required={true} />
            <Text>약속 장소</Text>
          </View>
          <View
            style={{
              marginTop: 70,
              marginHorizontal: '5%',
              width: '90%',
              height: 60,
              borderRadius: 20,
              borderColor: theme.color.border,
              borderWidth: 2,
              backgroundColor: theme.color.pale.red,
            }}>
            <Pressable onPress={() => setScheduleModal(false)}>
              <Text
                style={{
                  color: theme.font.color,
                  fontSize: 20,
                  textAlign: 'center',
                  lineHeight: 59,
                  fontWeight: '800',
                }}>
                생성하기
              </Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default MomentsSetSchedule;
