import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, Image } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons/faUser';

import { theme } from '../../assets/constant/DesignTheme';
import { getScheduleDetail } from '../../redux/scheduleSlice';

import RoundView from '../../components/common/RoundView';
import ModalCover from '../../components/common/ModalCover';
import LoadingModal from '../../components/common/LoadingModal';

const screen = Dimensions.get('screen');
const memberModalContentWidth = screen.width * 0.5;
const memberItemWidth = screen.width * 0.45;

const ScheduleDetailScreen = ({ route, navigation }) => {
  const dispatch = useDispatch();

  const schedule = useSelector(state => state?.schedule?.schedule);
  const isLoading = useSelector(state => state?.schedule?.isLoading);

  const [showMemberModal, setShowMemberModal] = useState(false);

  useEffect(() => {
    dispatch(getScheduleDetail(route?.params?.scheduleId));
  }, []);

  useEffect(() => {
    console.log(schedule);
  }, [schedule]);

  const openMemberModal = () => setShowMemberModal(true);
  const closeMemberModal = () => setShowMemberModal(false);

  const renderAmuseLoactions = amuseLocations => {
    return amuseLocations?.map(amuse => (
      <View key={amuse.id} style={styles.itemContentView}>
        <Text style={styles.itemContent}> {amuse?.name}</Text>
        <Text style={styles.itemSubContent}> {amuse?.address}</Text>
      </View>
    ));
  };

  const renderKeywords = keywords => {
    return <Text>{keywords?.map(keyword => `#${keyword}`).join('  ')}</Text>;
  };

  //     {
  //       id: 41,
  //       nickname: '김제관',
  //       photo: 'http://k.kakaocdn.net/dn/cfPYeU/btrN6n7q9ee/RihFtGFpkJSSIuSw39bPm0/img_640x640.jpg',
  //       status: 'JOINED',
  //     },
  const renderMemberList = members => {
    return members?.map(member => {
      console.log(member);
      return (
        <View style={styles.memberListItem(member?.status)}>
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
          <Text style={{ fontSize: 16 }}>{member?.nickname}</Text>
        </View>
      );
    });
  };

  return (
    <View style={styles.screenStyle}>
      {!isLoading ? (
        <RoundView title={schedule?.date} hideCloseButton={true}>
          <View style={styles.itemView}>
            <View style={styles.itemTitleView}>
              <Text style={styles.itemTitle}>약속 모임</Text>
            </View>
            <View style={styles.itemContentView}>
              <Text style={styles.itemContent}> {schedule?.group?.name}</Text>
              <TouchableOpacity style={styles.itemMemberButton} onPress={openMemberModal}>
                <View style={styles.itemMemberButtonContent}>
                  <Text style={{ marginRight: 10 }}>눌러서참석자보기</Text>
                  <FontAwesomeIcon icon={faUser} color={'gray'} size={12} />
                  <Text style={{ marginLeft: 3 }}>{schedule?.members?.length}</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.itemView}>
            <View style={styles.itemTitleView}>
              <Text style={styles.itemTitle}>약속 이름</Text>
            </View>
            <View style={styles.itemContentView}>
              <Text style={styles.itemContent}> {schedule.name}</Text>
            </View>
          </View>

          <View style={styles.itemView}>
            <View style={styles.itemTitleView}>
              <Text style={styles.itemTitle}>만남 장소</Text>
            </View>
            <View style={styles.itemContentView}>
              <Text style={styles.itemContent}> {schedule?.meetLocation?.name}</Text>
              <Text style={styles.itemSubContent}> {schedule?.meetLocation?.address}</Text>
            </View>
          </View>

          <View style={styles.itemView}>
            <View style={styles.itemTitleView}>
              <Text style={styles.itemTitle}>약속 장소</Text>
            </View>
            <View>{renderAmuseLoactions(schedule?.amuseLocations)}</View>
          </View>

          <View style={styles.itemView}>{renderKeywords(schedule?.keywords)}</View>
        </RoundView>
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
    backgroundColor: theme.color.background,
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  itemView: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    marginBottom: 30,
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
  itemContentView: {
    flexDirection: 'column',
    alignItems: 'flex-end',
  },
  itemContent: {
    fontSize: 20,
    fontWeight: 'bold',
    color: theme.font.color,
  },
  itemSubContent: {
    fontSize: 10,
    color: theme.font.color,
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
