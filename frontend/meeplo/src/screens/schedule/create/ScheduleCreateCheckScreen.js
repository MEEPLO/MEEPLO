import React, { useState } from 'react';
import { View, Text, StyleSheet, Button, ActivityIndicator, Dimensions } from 'react-native';
import { useDispatch } from 'react-redux';
import { PacmanIndicator } from 'react-native-indicators';
import { useNavigation } from '@react-navigation/native';
import FontText from '../../../components/common/FontText';

import { createSchedule } from '../../../redux/scheduleSlice';
import StepButton from '../../../components/stepper/StepButton';
import ModalCover from '../../../components/common/ModalCover';

import { theme } from '../../../assets/constant/DesignTheme';

const screen = Dimensions.get('screen');

const ScheduleCreateCheckScreen = ({ state, toNext, toPrev, onFinish, visible }) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);

  const openLoadingModal = () => setLoading(true);
  const closeLoadingModal = () => setLoading(false);

  const onPressCreate = () => {
    const reqObject = {
      date: state?.date,
      name: state?.name,
      groupId: state?.group?.id,
      meetLocationId: 0,
      amuses: [],
      keywords: state?.keywords,
      members: state?.members,
    };

    if (state?.meet?.id) {
      reqObject.meetLocationId = state.meet.id;
    }

    if (state?.amuse?.id) {
      reqObject.amuses.push({ id: state.amuse.id });
    }

    openLoadingModal();
    dispatch(createSchedule({ schedule: reqObject, navigation }))
      .unwrap()
      .then(payload => {
        setTimeout(() => {
          closeLoadingModal();
          onFinish();
        }, 1000);
      })
      .catch(err => {
        closeLoadingModal();
      });
  };

  return visible ? (
    <View style={styles.screenStyle}>
      <View style={{ alignItems: 'center', marginBottom: 50 }}>
        <FontText style={{ fontSize: 24, fontWeight: 'bold', color: 'gray' }}>약속을 만드시겠어요?</FontText>
      </View>

      <View style={styles.itemView}>
        <View style={styles.itemTitleView}>
          <FontText style={styles.itemTitle}>일시</FontText>
        </View>
        <FontText style={styles.itemText}> {state?.date} </FontText>
      </View>

      <View style={styles.itemView}>
        <View style={styles.itemTitleView}>
          <FontText style={styles.itemTitle}>약속 이름</FontText>
        </View>
        <FontText style={styles.itemText}> {state?.name}</FontText>
      </View>

      <View style={styles.itemView}>
        <View style={styles.itemTitleView}>
          <FontText style={styles.itemTitle}>키워드</FontText>
        </View>
        <FontText style={styles.itemText}>{state?.keywords?.join(', ')}</FontText>
      </View>

      <View style={styles.itemView}>
        <View style={styles.itemTitleView}>
          <FontText style={styles.itemTitle}>모임</FontText>
        </View>
        <FontText style={styles.itemText}> {state?.group?.name} </FontText>
      </View>

      <View style={styles.itemView}>
        <View style={styles.itemTitleView}>
          <FontText style={styles.itemTitle}>멤버</FontText>
        </View>
        <FontText style={styles.itemText}> {state?.members?.map(member => member.nickname).join(', ')} </FontText>
      </View>

      <View style={styles.itemView}>
        <View style={styles.itemTitleView}>
          <FontText style={styles.itemTitle}>만남 장소</FontText>
        </View>
        <FontText style={styles.itemText}> {state?.meet?.name}역</FontText>
      </View>

      <View style={styles.itemView}>
        <View style={styles.itemTitleView}>
          <FontText style={styles.itemTitle}>약속 장소</FontText>
        </View>
        <FontText style={styles.itemText}> {state?.amuse?.name}</FontText>
      </View>

      <View style={styles.navigateViewStyle}>
        <StepButton text="< 이전" active={false} onPress={toPrev} />
        <StepButton text="만들기" active={true} onPress={onPressCreate} />
      </View>

      <ModalCover visible={loading} onRequestClose={closeLoadingModal} backgroundColor={theme.color.dim}>
        <PacmanIndicator size={100} color={theme.color.bright.orange} />
      </ModalCover>
    </View>
  ) : null;
};

const styles = StyleSheet.create({
  screenStyle: {
    width: '100%',
    height: '100%',
  },
  navigateViewStyle: {
    width: '100%',

    position: 'absolute',
    bottom: 100,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  itemView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  itemTitleView: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    backgroundColor: theme.color.bright.orange,
    borderWidth: 2,
    borderRadius: theme.radius.base,
    borderColor: theme.color.border,
  },
  itemTitle: {
    color: theme.font.color,
    fontSize: 14,
    fontWeight: 'bold',
  },
  itemText: {},
});

export default ScheduleCreateCheckScreen;
