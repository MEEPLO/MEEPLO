import { View, Text, ScrollView, Image, Dimensions, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import AutoHeightImage from 'react-native-auto-height-image';
import { useDispatch, useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons/faHeart';
import { getScheduleMomentsFeed } from '../../redux/scheduleSlice';
import { theme } from '../../assets/constant/DesignTheme';
import MomentModal from '../../components/moments/MomentModal';

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

  console.log(moments);
  const renderMoment = moments => {
    return moments.map(moment => (
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
        <View
          style={{
            position: 'absolute',
            right: 10,
            top: moment.type === 1 ? 10 : null,
            bottom: moment.type === 1 ? null : 10,
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <FontAwesomeIcon icon={faHeart} color={theme.color.alert} size={13} />
          <Text
            style={{
              fontSize: 14,
              marginLeft: 5,
              color: moment.type === 2 ? '#fff' : '#000',
            }}>
            {moment.reactionCount}
          </Text>
        </View>
      </TouchableOpacity>
    ));
  };

  const scheduleId = route?.params?.scheduleId;

  useEffect(() => {
    dispatch(getScheduleMomentsFeed({ scheduleId }));
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <ScrollView style={{ marginHorizontal: 20 }}>
        <View>
          <Text style={{ fontSize: 24, fontWeight: 'bold', color: 'black', marginVertical: 15 }}>{schedule.name}</Text>
          <Text style={{ marginBottom: 15, color: 'gray' }}>
            {' '}
            {`${scheduleDate.year}년 ${scheduleDate.month}월 ${scheduleDate.date}일  ${scheduleDate.day}`}
          </Text>
        </View>
        {moments?.length === 0 ? (
          <View
            style={{
              margin: 20,
              borderWidth: 2,
              // borderColor: theme.color.disabled,
              borderColor: 'white',
              height: 120,
              borderRadius: 20,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text style={{ fontSize: 16, marginVertical: 5, color: 'gray' }}>아직 남겨진 추억이 없네요!</Text>
            <Text style={{ fontSize: 20, color: 'gray', marginVertical: 5 }}>함께 찍은 사진을 남겨 보세요.</Text>
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
