import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, Image, ScrollView, Alert } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons/faUser';

import { theme } from '../../assets/constant/DesignTheme';
import { getScheduleDetail, deleteSchedule } from '../../redux/scheduleSlice';

import ModalCover from '../../components/common/ModalCover';
import LoadingModal from '../../components/common/LoadingModal';
import FontText from '../../components/common/FontText';

const { width, height } = Dimensions.get('screen');
const memberModalContentWidth = width * 0.5;
const memberItemWidth = width * 0.45;

const day = ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일'];
const today = new Date();

const ScheduleDetailScreen = ({ route, navigation }) => {
  const dispatch = useDispatch();

  const schedule = useSelector(state => state?.schedule?.schedule);
  const isLoading = useSelector(state => state?.schedule?.isLoading);
  const user = useSelector(state => state.user.info);

  const scheduleId = route?.params?.scheduleId;

  const [showMemberModal, setShowMemberModal] = useState(false);

  const rawDate = new Date(schedule.date);
  const scheduleDate = {
    year: rawDate.getFullYear(),
    month: rawDate.getMonth() + 1,
    date: rawDate.getDate(),
    day: day[rawDate.getDay()],
  };
  const isDone = today - rawDate > 0 ? true : false;
  const isLeader = user.id === schedule.leaderId;

  const onPressDelete = () => {
    Alert.alert(
      '약속 삭제',
      `${schedule.name}을 삭제하시겠습니까?`,
      [
        {
          text: '취소',
        },
        {
          text: '삭제',
          onPress: () => {
            dispatch(deleteSchedule({ scheduleId }));
          },
        },
      ],
      {
        cancelable: true,
      },
    );
    dispatch(deleteSchedule({ scheduleId }));
  };

  const onPressEdit = () => {
    navigation.navigate('Edit', { scheduleId });
  };

  const onPressMoments = () => {
    navigation.navigate('Feed', { scheduleId });
  };

  useEffect(() => {
    dispatch(getScheduleDetail(scheduleId));
  }, []);

  useEffect(() => {}, [schedule]);

  const openMemberModal = () => setShowMemberModal(true);
  const closeMemberModal = () => setShowMemberModal(false);

  const renderAmuseLoactions = amuseLocations => {
    return amuseLocations?.map(amuse => (
      <View key={amuse.id} style={styles.itemContentView}>
        <FontText style={styles.itemContent}> {amuse?.name}</FontText>
        <FontText style={styles.itemSubContent}> {amuse?.address}</FontText>
      </View>
    ));
  };

  const renderKeywords = keywords => {
    return <FontText>{keywords?.map(keyword => `#${keyword}`).join('  ')}</FontText>;
  };

  const renderMemberList = members => {
    return members?.map(member => {
      return (
        <View style={styles.memberListItem(member?.status)} key={member.id}>
          <Image
            source={{ uri: member?.photo }}
            style={{
              width: 25,
              height: 25,
              borderRadius: 20,
              borderWidth: theme.border.thin,
              borderColor: theme.color.border,
            }}
            resizeMode="center"
          />
          <FontText style={{ fontSize: 16, color: 'gray' }}>{member?.nickname}</FontText>
        </View>
      );
    });
  };

  return (
    <View style={styles.screenStyle}>
      {!isLoading ? (
        <ScrollView>
          <View style={{ height: 440, marginVertical: 20 }}>
            {/* title */}
            <View style={styles.detailTitleContainer}>
              <FontText style={{ color: 'black', fontWeight: 'bold', fontSize: 22, marginHorizontal: 10 }}>
                {`${scheduleDate.year}년 ${scheduleDate.month}월 ${scheduleDate.date}일  ${scheduleDate.day}`}
              </FontText>
            </View>
            {/* content */}
            <View style={styles.detailItemsContainer}>
              <View style={styles.itemView}>
                <View style={styles.itemTitleView}>
                  <FontText style={styles.itemTitle}>약속 그룹</FontText>
                </View>
                <View style={styles.itemContentView}>
                  <FontText style={styles.itemContent}> {schedule?.group?.name}</FontText>
                  <TouchableOpacity style={styles.itemMemberButton} onPress={openMemberModal}>
                    <View style={styles.itemMemberButtonContent}>
                      <FontText style={{ marginRight: 10, color: 'gray' }}>눌러서 참석자보기</FontText>
                      <FontAwesomeIcon icon={faUser} color={'gray'} size={10} />
                      <FontText style={{ marginLeft: 3, color: 'gray' }}>{schedule?.members?.length}</FontText>
                    </View>
                  </TouchableOpacity>
                </View>
              </View>

              <View style={styles.itemView}>
                <View>
                  <FontText style={styles.itemTitle}>약속 이름</FontText>
                </View>
                <View style={styles.itemContentView}>
                  <FontText style={styles.itemContent}> {schedule.name}</FontText>
                </View>
              </View>

              <View style={styles.itemView}>
                <View>
                  <FontText style={styles.itemTitle}>만남 장소</FontText>
                </View>
                <View style={styles.itemContentView}>
                  <FontText style={styles.itemContent}> {schedule?.meetLocation?.name}</FontText>
                  <FontText style={styles.itemSubContent}> {schedule?.meetLocation?.address}</FontText>
                </View>
              </View>

              <View style={styles.itemView}>
                <View>
                  <FontText style={styles.itemTitle}>약속 장소</FontText>
                </View>
                <View>{renderAmuseLoactions(schedule?.amuseLocations)}</View>
              </View>

              <View style={styles.keywords}>{renderKeywords(schedule?.keywords)}</View>

              {isLeader && (
                <View style={{ flexDirection: 'row', justifyContent: 'flex-end', marginTop: 10 }}>
                  <TouchableOpacity
                    onPress={onPressEdit}
                    activeOpacity={0.6}
                    style={[styles.buttonUD, { backgroundColor: theme.color.bright.navy }]}>
                    <FontText style={{ fontSize: 16, fontWeight: 'bold', color: 'black' }}>수정</FontText>
                  </TouchableOpacity>
                  <TouchableOpacity activeOpacity={0.6} style={styles.buttonUD} onPress={onPressDelete}>
                    <FontText style={{ fontSize: 16, fontWeight: 'bold', color: 'black' }}>삭제</FontText>
                  </TouchableOpacity>
                </View>
              )}
            </View>
          </View>

          {
            isDone && (
              <View>
                <TouchableOpacity
                  onPress={onPressMoments}
                  style={[
                    styles.buttonContainer,
                    {
                      backgroundColor: theme.color.pale.orange,
                    },
                  ]}>
                  <FontText style={styles.buttonTitle}>추억 보기</FontText>
                </TouchableOpacity>
                {/* <TouchableOpacity
                style={[
                  styles.buttonContainer,
                  {
                    backgroundColor: theme.color.pale.yellow,
                  },
                ]}>
                <FontText style={styles.buttonTitle}>추억 남기기</FontText>
              </TouchableOpacity> */}
              </View>
            )
            // : (
            //   <TouchableOpacity
            //     style={[
            //       styles.buttonContainer,
            //       {
            //         backgroundColor: theme.color.bright.yellow,
            //       },
            //     ]}>
            //     <FontText style={styles.buttonTitle}>지도로 장소 확인하기</FontText>
            //   </TouchableOpacity>
            // )
          }
        </ScrollView>
      ) : (
        <LoadingModal visible={isLoading} />
      )}

      <ModalCover visible={showMemberModal} backgroundColor={theme.color.dim} onRequestClose={closeMemberModal}>
        <View style={styles.memberModalView}>
          <View style={styles.memberModalContentView}>{renderMemberList(schedule?.members)}</View>
        </View>
      </ModalCover>
    </View>
  );
};

const styles = StyleSheet.create({
  screenStyle: {
    flex: 1,
    marginHorizontal: 20,
  },
  buttonTitle: {
    fontWeight: 'bold',
    fontSize: 20,
    color: 'black',
  },
  buttonContainer: {
    marginVertical: 5,
    borderRadius: 15,
    borderColor: theme.color.border,
    borderWidth: 2,
    height: 55,
    alignItems: 'center',
    justifyContent: 'center',
  },
  detailTitleContainer: {
    justifyContent: 'center',
    height: 55,
    backgroundColor: theme.color.bright.green,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    borderWidth: 2,
    borderColor: theme.color.border,
  },
  detailItemsContainer: {
    height: 385,
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 20,
    borderWidth: 2,
    borderTopWidth: 0,
    borderColor: theme.color.border,
    padding: 10,
    paddingTop: 20,
  },
  keywords: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  buttonUD: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 35,
    width: width * 0.2,
    borderColor: theme.color.border,
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: theme.color.pale.red,
    marginLeft: 6,
  },

  itemView: {
    height: 70,
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
  itemTitle: {
    fontSize: 14,
    color: 'gray',
  },
  itemContentView: {
    alignItems: 'flex-end',
  },
  itemContent: {
    fontSize: 20,
    fontWeight: 'bold',
    color: theme.font.color,
  },
  itemSubContent: {
    fontSize: 12,
  },
  itemMemberButton: {
    borderColor: theme.color.border,
    borderWidth: theme.border.thin,
    borderRadius: theme.radius.base,
    paddingHorizontal: 10,
    paddingVertical: 2,
    marginTop: 10,
  },
  itemMemberButtonContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  memberModalView: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  memberModalContentView: {
    backgroundColor: theme.color.background,
    width: memberModalContentWidth,

    padding: 10,

    alignItems: 'center',
    justifyContent: 'space-evenly',

    borderColor: theme.color.border,
    borderWidth: theme.border.thin,
    borderRadius: theme.radius.base,
  },
  memberListItem: status => {
    return {
      backgroundColor: status === 'JOINED' ? theme.color.bright.purple : theme.color.background,

      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-evenly',
      width: memberItemWidth,

      paddingVertical: 5,
      margin: 5,

      borderColor: theme.color.border,
      borderWidth: theme.border.thin,
      borderRadius: theme.radius.input,
    };
  },
});

export default ScheduleDetailScreen;
