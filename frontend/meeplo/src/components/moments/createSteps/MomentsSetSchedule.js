import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { View, Text, Pressable, Modal, Dimensions, Alert } from 'react-native';
import { createSimpleSchedule, getGroupSchedules } from '../../../redux/momentsSlice';
import Toast from 'react-native-toast-message';

import { TOAST_MESSAGE } from '../../../assets/constant/string';
import { theme } from '../../../assets/constant/DesignTheme';
import StepButton from '../../stepper/StepButton';
import SelectDropdown from '../../common/SelectDropdown';
import StepTextInput from '../../common/StepTextInput';
import DateModalInput from '../../schedule/DateModalInput';

const windowHeight = Dimensions.get('window').height;

const MomentsSetSchedule = ({ toNext, toPrev, onFinish, visible, state }) => {
  const [scheduleModal, setScheduleModal] = React.useState(false);
  const [selectedSchedule, setSelectedSchedule] = React.useState();
  const [scheduleDate, setScheduleDate] = React.useState();
  const [scheduleName, setScheduleName] = React.useState();
  const [schedulePlace, setSchedulePlace] = React.useState();

  const hey = useSelector(state => state.groupSchedules);
  const dispatch = useDispatch();
  const scheduleList = useSelector(state =>
    state.groupSchedules.schedules.map(({ id, name }) => {
      return { key: id, value: name };
    }),
  );

  console.log('hye', hey);
  const scheduleNameIndex = useSelector(state => {
    const scheduleNameIndexMap = new Map(state.groupSchedules.schedules.map(({ id, name }) => [id, name]));
    return Object.fromEntries(scheduleNameIndexMap);
  });

  React.useEffect(() => {
    if (state.groupId) {
      dispatch(getGroupSchedules({ groupId: state.groupId }));
    }
  }, [state.groupId]);

  const onPressNext = () => {
    const actions = [
      {
        type: 'UPDATE_SCHEDULEID',
        payload: selectedSchedule,
      },
      {
        type: 'UPDATE_SCHEDULENAME',
        payload: scheduleNameIndex[selectedSchedule],
      },
    ];
    !!selectedSchedule
      ? toNext(actions)
      : Toast.show({
          type: 'error',
          text1: TOAST_MESSAGE.REQUIRED_FIELD_ERROR,
          text2: TOAST_MESSAGE.MOMENT_NO_SCHEDULE,
        });
  };

  const submitSchedule = () => {
    const scheduleInfo = {
      date: scheduleDate,
      name: scheduleName,
      groupId: state.groupId,
      meetLocationId: schedulePlace,
      keywords: [],
      members: [],
      amuses: [],
    };

    if (!scheduleDate) {
      // Toast.show({
      //   type: 'error',
      //   text1: TOAST_MESSAGE.REQUIRED_FIELD_ERROR,
      //   text2: TOAST_MESSAGE.SCHEDULE_NO_DATE,
      // });
      Alert.alert('약속 일시가 필요해요!');
    } else if (!scheduleName) {
      // Toast.show({
      //   type: 'error',
      //   text1: TOAST_MESSAGE.REQUIRED_FIELD_ERROR,
      //   text2: TOAST_MESSAGE.SCHEDULE_NO_NAME,
      // });
      Alert.alert('약속의 이름을 적어주세요!');
    } else if (!schedulePlace) {
      // Toast.show({
      //   type: 'error',
      //   text1: TOAST_MESSAGE.REQUIRED_FIELD_ERROR,
      //   text2: TOAST_MESSAGE.SCHEDULE_NO_PLACE,
      // });
      Alert.alert('약속 장소를 정해주세요!');
    } else {
      dispatch(createSimpleSchedule({ scheduleInfo })).then(() =>
        dispatch(getGroupSchedules({ groupId: state.groupId })).then(() => {
          setScheduleModal(false);
          console.log('new schedules in');
        }),
      );
    }
  };

  return visible ? (
    <>
      <View style={{ position: 'relative', height: windowHeight - 200, marginHorizontal: 20 }}>
        <View
          style={{
            width: '100%',
            position: 'absolute',
            top: 220,
          }}>
          <Pressable onPress={() => setScheduleModal(true)}>
            <Text style={{ textAlign: 'center', fontSize: 16, color: theme.color.bright.red, fontWeight: '800' }}>
              아직 약속을 만들지 않았어요! {'>'}
            </Text>
          </Pressable>
        </View>
        <SelectDropdown setSelected={setSelectedSchedule} type="약속" data={scheduleList} required={true} />
        <View
          style={{
            width: '100%',
            position: 'absolute',
            bottom: 0,
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <StepButton text="< 이전" active={true} onPress={toPrev} />
          <StepButton text="다음 >" active={true} onPress={onPressNext} />
        </View>
      </View>

      {/* date modal */}
      <Modal visible={scheduleModal} animationType={'slide'} presentationStyle={'pageSheet'}>
        <View style={{ marginTop: 150, marginHorizontal: 40, overflow: 'hidden' }}>
          <View style={{ marginBottom: 30 }}>
            <DateModalInput type="일시" value={scheduleDate} required onConfirm={data => setScheduleDate(data)} />
          </View>
          <View style={{ marginBottom: 30 }}>
            <StepTextInput
              type="약속 이름"
              maxLength={20}
              required={true}
              onValueChange={setScheduleName}
              value={scheduleName}
            />
          </View>
          <View style={{ marginBottom: 30 }}>
            <StepTextInput type="약속 장소" required={true} onValueChange={setSchedulePlace} value={schedulePlace} />
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
            <Pressable onPress={submitSchedule}>
              <Text
                style={{
                  color: theme.font.color,
                  fontSize: 20,
                  textAlign: 'center',
                  lineHeight: 56,
                  fontWeight: '800',
                }}>
                생성하기
              </Text>
            </Pressable>
          </View>
          <View
            style={{
              marginTop: 70,
              marginHorizontal: '5%',
              width: '90%',
              height: 60,
              borderRadius: 20,
            }}>
            <Pressable onPress={() => setScheduleModal(false)}>
              <Text
                style={{
                  color: theme.font.color,
                  fontSize: 17,
                  textAlign: 'center',
                  lineHeight: 59,
                  fontWeight: '800',
                }}>
                뒤로 가기
              </Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </>
  ) : null;
};

export default MomentsSetSchedule;
