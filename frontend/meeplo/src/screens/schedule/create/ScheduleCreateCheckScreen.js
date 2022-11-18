import React, { useState } from 'react';
import { View, Text, StyleSheet, Button, ActivityIndicator, Dimensions } from 'react-native';
import { useDispatch } from 'react-redux';
import { PacmanIndicator } from 'react-native-indicators';

import { createSchedule } from '../../../redux/scheduleSlice';
import StepButton from '../../../components/stepper/StepButton';
import ModalCover from '../../../components/common/ModalCover';

import { theme } from '../../../assets/constant/DesignTheme';

const screen = Dimensions.get('screen');

const ScheduleCreateCheckScreen = ({ state, toNext, toPrev, onFinish, visible }) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const openLoadingModal = () => setLoading(true);
  const closeLoadingModal = () => setLoading(false);

  const onPressCreate = () => {
    const reqObject = {
      date: state?.date,
      name: state?.name,
      groupId: state?.group?.id,
      meetLocationId: state?.meet?.id,
      keywords: state?.keywords,
      members: state?.members,
      amuses: [
        {
          id: state?.amuse?.id,
        },
      ],
    };

    openLoadingModal();
    dispatch(createSchedule(reqObject))
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
        <Text style={{ fontSize: 24, fontWeight: '800' }}>약속을 만드시겠어요?</Text>
      </View>

      <View style={styles.itemView}>
        <View style={styles.itemTitleView}>
          <Text style={styles.itemTitle}>일시</Text>
        </View>
        <Text style={styles.itemText}> {state?.date} </Text>
      </View>

      <View style={styles.itemView}>
        <View style={styles.itemTitleView}>
          <Text style={styles.itemTitle}>약속 이름</Text>
        </View>
        <Text style={styles.itemText}> {state?.name}</Text>
      </View>

      <View style={styles.itemView}>
        <View style={styles.itemTitleView}>
          <Text style={styles.itemTitle}>키워드</Text>
        </View>
        <Text style={styles.itemText}>{state?.keywords?.join(', ')}</Text>
      </View>

      <View style={styles.itemView}>
        <View style={styles.itemTitleView}>
          <Text style={styles.itemTitle}>모임</Text>
        </View>
        <Text style={styles.itemText}> {state?.meet?.name} </Text>
      </View>

      <View style={styles.itemView}>
        <View style={styles.itemTitleView}>
          <Text style={styles.itemTitle}>멤버</Text>
        </View>
        <Text style={styles.itemText}> {state?.members?.join(', ')} </Text>
      </View>

      <View style={styles.itemView}>
        <View style={styles.itemTitleView}>
          <Text style={styles.itemTitle}>만남 장소</Text>
        </View>
        <Text style={styles.itemText}> {state?.meet?.name}</Text>
      </View>

      <View style={styles.itemView}>
        <View style={styles.itemTitleView}>
          <Text style={styles.itemTitle}>약속 장소</Text>
        </View>
        <Text style={styles.itemText}> {state?.amuse?.name}</Text>
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
