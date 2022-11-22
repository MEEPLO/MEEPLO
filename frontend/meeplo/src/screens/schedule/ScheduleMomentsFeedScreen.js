import { View, Text, ScrollView, Image, Dimensions, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import AutoHeightImage from 'react-native-auto-height-image';
import { useDispatch, useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons/faHeart';
import { getScheduleMomentsFeed } from '../../redux/scheduleSlice';
import { theme } from '../../assets/constant/DesignTheme';
import MomentModal from '../../components/moments/MomentModal';
import FontText from '../../components/common/FontText';

const day = ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일'];
const today = new Date();
const { width, height } = Dimensions.get('window');

const ScheduleMomentsFeedScreen = ({ route, navigation }) => {
  const dispatch = useDispatch();
  const moments = useSelector(state => state.schedule.moments);
  const schedule = useSelector(state => state?.schedule?.schedule);
  const [modalVisible, setModalVisible] = useState(false);
  const [momentId, setMomentId] = useState(0);

  const rawDate = new Date(schedule.date);
  const scheduleDate = {
    year: rawDate.getFullYear(),
    month: rawDate.getMonth() + 1,
    date: rawDate.getDate(),
    day: day[rawDate.getDay()],
  };

  const onPressMoment = ({ momentId }) => {
    setModalVisible(true);
    setMomentId(momentId);
  };

  // console.log(moments);
  const renderMoment = moments => {
    return moments.map(moment => (
      <View style={{ marginBottom: 40, alignItems: 'center' }}>
        {/* Photo 부분 */}
        <View style={{ width: width * 0.8, alignItems: 'center' }}>
          <TouchableOpacity
            activeOpacity={0.6}
            key={moment.id}
            style={{ marginVertical: 10 }}
            onPress={() => {
              onPressMoment({ momentId: moment.id });
            }}>
            {moment.type === 2 ? (
              <AutoHeightImage
                source={{ uri: moment.photo }}
                width={width * 0.5}
                style={{
                  borderColor: theme.color.disabled,
                  borderWidth: 1,
                  borderRadius: 10,
                }}
                resizeMode="contain"
              />
            ) : (
              <AutoHeightImage
                source={{ uri: moment.photo }}
                width={width * 0.8}
                style={{
                  borderColor: theme.color.disabled,
                  borderWidth: 1,
                  borderRadius: 10,
                }}
              />
            )}
          </TouchableOpacity>
        </View>
        {/* 작성정보 부분 */}
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            width: width * 0.8,
          }}>
          <View>
            {/* TODO: 한나언니 여기에 정보로 바꿔주면 돼!! */}
            <FontText>
              2022.10.14, <FontText style={{ fontWeight: 'bold' }}>신민아개짱</FontText> 님이
            </FontText>
          </View>
          <View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <FontAwesomeIcon icon={faHeart} color={theme.color.alert} size={13} />
              <FontText
                style={{
                  fontSize: 14,
                  marginLeft: 5,
                  color: 'black',
                }}>
                {moment.reactionCount}
              </FontText>
            </View>
          </View>
        </View>
      </View>
    ));
  };

  const scheduleId = route?.params?.scheduleId;

  useEffect(() => {
    dispatch(getScheduleMomentsFeed({ scheduleId }));
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <ScrollView style={{ marginHorizontal: 20 }} showsVerticalScrollIndicator={false}>
        <View>
          <FontText style={{ fontSize: 24, fontWeight: 'bold', color: 'black', marginVertical: 15 }}>
            {schedule.name}
          </FontText>
          <FontText style={{ marginBottom: 15, color: 'gray' }}>
            {' '}
            {`${scheduleDate.year}년 ${scheduleDate.month}월 ${scheduleDate.date}일  ${scheduleDate.day}`}
          </FontText>
        </View>
        {moments?.length === 0 ? (
          <View
            style={{
              margin: 20,
              borderWidth: 2,
              borderColor: 'white',
              height: 120,
              borderRadius: 20,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <FontText style={{ fontSize: 16, marginVertical: 5, color: 'gray' }}>아직 남겨진 추억이 없네요!</FontText>
            <FontText style={{ fontSize: 20, color: 'gray', marginVertical: 5 }}>
              함께 찍은 사진을 남겨 보세요.
            </FontText>
          </View>
        ) : (
          <View style={{ alignItems: 'center' }}>{renderMoment(moments)}</View>
        )}
      </ScrollView>
      {momentId > 0 && (
        <MomentModal
          momentDetailId={momentId}
          setMomentModal={setModalVisible}
          momentModal={modalVisible}
          navigation={navigation}
        />
      )}
      <View style={{ height: 55 }} />
    </View>
  );
};

export default ScheduleMomentsFeedScreen;
