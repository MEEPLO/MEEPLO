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
import LoadingModal from '../../common/LoadingModal';
import MapLocationInput from '../../map/MapLocationInput';

const windowHeight = Dimensions.get('window').height;

const MomentsSetSchedule = ({ toNext, toPrev, onFinish, visible, state }) => {
  const [scheduleModal, setScheduleModal] = React.useState(false);
  const [selectedSchedule, setSelectedSchedule] = React.useState();
  const [selectedLocation, setSelectedLocation] = React.useState();
  const [scheduleLocations, setScheduleLocations] = React.useState([]);
  const [scheduleDate, setScheduleDate] = React.useState();
  const [scheduleName, setScheduleName] = React.useState();
  const [schedulePlace, setSchedulePlace] = React.useState();
  const [isLoading, setIsLoading] = React.useState(false);

  const dispatch = useDispatch();

  const scheduleList = useSelector(state =>
    state.groupSchedules.schedules.map(({ id, name }) => {
      return { key: id, value: name };
    }),
  );

  const scheduleNameIndex = useSelector(state => {
    const scheduleNameIndexMap = new Map(
      state.groupSchedules.schedules.map(({ id, name, scheduleLocations }) => [
        id,
        { name: name, scheduleLocations: scheduleLocations },
      ]),
    );
    return Object.fromEntries(scheduleNameIndexMap);
  });

  const locationNameIndex = useSelector(state => {
    const locationNameIndexMap = new Map(
      scheduleNameIndex[selectedSchedule]?.scheduleLocations.map(({ scheduleLocationId, name }) => [
        scheduleLocationId,
        name,
      ]),
    );
    return Object.fromEntries(locationNameIndexMap);
  });

  React.useEffect(() => {
    if (state.groupId) {
      dispatch(getGroupSchedules({ groupId: state.groupId }));
    }
  }, [state.groupId]);

  React.useEffect(() => {
    if (selectedSchedule) {
      scheduleNameIndex[selectedSchedule].scheduleLocations.map(({ name, scheduleLocationId }) => {
        setScheduleLocations([...scheduleLocations, { key: scheduleLocationId, value: name }]);
      });
    }
  }, [selectedSchedule]);

  const onPressNext = () => {
    const actions = [
      {
        type: 'UPDATE_LOCATIONID',
        payload: selectedLocation ? selectedLocation : null,
      },
      {
        type: 'UPDATE_SCHEDULENAME',
        payload: selectedSchedule ? scheduleNameIndex[selectedSchedule].name : null,
      },
      {
        type: 'UPDATE_PLACENAME',
        payload: selectedLocation ? locationNameIndex[selectedLocation] : null,
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
      meetLocationId: schedulePlace.id,
    };

    if (!scheduleDate) {
      Alert.alert('약속 일시가 필요해요!');
    } else if (!scheduleName) {
      Alert.alert('약속의 이름을 적어주세요!');
    } else if (!schedulePlace) {
      Alert.alert('약속 장소를 정해주세요!');
    } else {
      setIsLoading(true);
      dispatch(createSimpleSchedule({ scheduleInfo })).then(() =>
        dispatch(getGroupSchedules({ groupId: state.groupId })).then(() => {
          setIsLoading(false);
          setScheduleModal(false);
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
            top: 400,
          }}>
          <Pressable onPress={() => setScheduleModal(true)}>
            <Text style={{ textAlign: 'center', fontSize: 16, color: theme.color.bright.red, fontWeight: 'bold' }}>
              아직 약속을 만들지 않았다면? {' >'}
            </Text>
          </Pressable>
        </View>
        <View style={{ width: '100%', position: 'absolute', top: 150 }}>
          <SelectDropdown setSelected={setSelectedLocation} type="약속 장소" data={scheduleLocations} required={true} />
        </View>
        <View style={{ width: '100%', position: 'absolute', top: 0 }}>
          <SelectDropdown setSelected={setSelectedSchedule} type="약속" data={scheduleList} required={true} />
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
            {/* <StepTextInput type="약속 장소" required={true} onValueChange={setSchedulePlace} value={schedulePlace} /> */}
            <MapLocationInput type="약속 장소" required value={schedulePlace} onValueChange={setSchedulePlace} />
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
                  fontWeight: 'bold',
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
                  fontWeight: 'bold',
                }}>
                뒤로 가기
              </Text>
            </Pressable>
          </View>
        </View>
      </Modal>
      <LoadingModal visible={isLoading} />
    </>
  ) : null;
};

export default MomentsSetSchedule;
