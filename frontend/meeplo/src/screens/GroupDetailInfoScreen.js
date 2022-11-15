import { View, Text, ScrollView, TouchableOpacity, Dimensions, Image, Alert, Share } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import Clipboard from '@react-native-clipboard/clipboard';
import { useSelector, useDispatch } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons/faUser';
import { faCrown } from '@fortawesome/free-solid-svg-icons/faCrown';
import GroupDetailHeader from '../components/Group/GroupDetailHeader';
import { theme } from '../assets/constant/DesignTheme';
import Images from '../assets/image/index';
import { getGroupDetail, deleteGroup, exitGroup, exitGroupMember } from '../redux/groupSlice';

const DATA = 'entryCODEEEEEEEEE';

const GroupDetailInfoScreen = ({ route, navigation }) => {
  const dispatch = useDispatch();
  const groupDetail = useSelector(state => state.group.details);
  const user = useSelector(state => state.user.info);
  const isLeader = user.id === groupDetail.leaderMemberId;

  const { groupId } = route.params;

  const { width } = Dimensions.get('window');
  const memberCount = groupDetail?.members.length;

  const onPressKick = ({ memberName, memberId }) => {
    Alert.alert(
      '그룹 멤버 강퇴',
      `${memberName}님을 강퇴하시겠습니까?`,
      [
        {
          text: '취소',
        },
        {
          text: '강퇴하기',
          onPress: () => {
            dispatch(exitGroupMember({ memberId, groupId: groupDetail.id, Alert, navigation, memberName }));
          },
        },
      ],
      {
        cancelable: true,
      },
    );
  };

  const onPressDelete = () => {
    Alert.alert(
      '그룹 삭제',
      `${groupDetail.name} 그룹을 삭제하시겠습니까?`,
      [
        {
          text: '취소',
        },
        {
          text: '삭제',
          onPress: () => {
            dispatch(deleteGroup({ groupName: groupDetail.name, groupId: groupDetail.id, Alert, navigation }));
          },
        },
      ],
      {
        cancelable: true,
      },
    );
  };

  const onPressExit = () => {
    Alert.alert(
      '그룹 나가기',
      `${groupDetail.name} 그룹에서 나가시겠습니까?`,
      [
        {
          text: '취소',
        },
        {
          text: '나가기',
          onPress: () => {
            dispatch(exitGroup({ groupName: groupDetail.name, groupId: groupDetail.id, Alert, navigation }));
          },
        },
      ],
      {
        cancelable: true,
      },
    );
  };

  const onPressGroupcode = async () => {
    Clipboard.setString('여기는 미플로 ><');
    try {
      const result = await Share.share({
        message: '여기는 미플로 ><',
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      alert(error.message);
    }
  };

  useEffect(() => {
    dispatch(getGroupDetail({ groupId: groupDetail.id }));
  }, []);

  return (
    <ScrollView>
      <GroupDetailHeader data={groupDetail} navigation={navigation} groupId={groupId} isInfo={true} />
      <View style={{ alignItems: 'center', justifyContent: 'center', marginBottom: 105 }}>
        {/* Descriptions */}
        <View style={{ margin: 20 }}>
          <Text>{groupDetail.description}</Text>
        </View>

        {/* Inviting button */}
        {isLeader && (
          <TouchableOpacity activeOpacity={0.6} onPress={onPressGroupcode}>
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                height: 35,
                width: width - 150,
                marginVertical: 15,
                borderColor: theme.color.border,
                borderWidth: 2,
                borderRadius: 10,
                backgroundColor: theme.color.pale.blue,
              }}>
              <Text style={{ fontSize: 20, fontWeight: '900', color: 'black' }}>그룹 코드 공유하기</Text>
            </View>
          </TouchableOpacity>
        )}

        {/* member list*/}
        <View
          style={[
            {
              marginHorizontal: 20,
              marginVertical: 15,
              width: width - 40,
              height: 40 * (memberCount + 1),
              borderRadius: 20,
              overflow: 'hidden',
              borderColor: theme.color.border,
              borderWidth: 2,
            },
          ]}>
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              borderTopEndRadius: 20,
              width: width - 40,
              overflow: 'hidden',
              borderColor: theme.color.border,
              borderBottomWidth: 2,
              backgroundColor: theme.color.pale.green,
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <Text style={{ marginHorizontal: 20, fontWeight: '900', fontSize: 19, color: 'black' }}>멤버</Text>
            <View style={{ marginHorizontal: 20, flexDirection: 'row', alignItems: 'center' }}>
              <FontAwesomeIcon icon={faUser} size={14} />
              <Text style={{ fontSize: 14, marginLeft: 5, fontWeight: '900', color: 'black' }}>{memberCount}</Text>
            </View>
          </View>
          <View
            style={{
              flex: memberCount,
              flexDirection: 'row',
              marginHorizontal: 20,
              alignItems: 'center',
            }}>
            <View style={{ flex: 3, justifyContent: 'space-evenly', height: width * 0.2 }}>
              {groupDetail?.members?.map((item, i) => (
                <View
                  key={'groupMember' + i}
                  style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 15 }}>
                  <Image
                    source={{ uri: item.photo }}
                    style={{
                      width: 20,
                      height: 20,
                      borderRadius: 10,
                      borderWidth: 1,
                      borderColor: theme.color.border,
                    }}
                  />
                  <Text style={{ margin: 10 }}>{item.nickname}</Text>
                  {item.nickname === groupDetail.leader && <FontAwesomeIcon icon={faCrown} size={14} />}
                  {isLeader && item.nickname !== groupDetail.leader && (
                    <TouchableOpacity
                      activeOpacity={0.6}
                      onPress={() => {
                        onPressKick({ memberName: item.nickname, memberId: item.id });
                      }}>
                      <Image source={Images.faDoor} style={{ width: 14, height: 14 }} />
                    </TouchableOpacity>
                  )}
                </View>
              ))}
            </View>
            <View style={{ flex: 1, justifyContent: 'space-evenly', height: width * 0.2 }}></View>
          </View>
        </View>

        {/* exit and edit button */}
        {isLeader ? (
          <View>
            <TouchableOpacity
              activeOpacity={0.6}
              onPress={() => {
                navigation.navigate('GroupEdit', { groupId });
              }}>
              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  height: 35,
                  width: width - 150,
                  marginVertical: 15,
                  borderColor: theme.color.border,
                  borderWidth: 2,
                  borderRadius: 10,
                  backgroundColor: theme.color.pale.red,
                }}>
                <Text style={{ fontSize: 20, fontWeight: '900', color: 'black' }}>그룹 프로필 편집</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={0.6} onPress={onPressDelete}>
              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  height: 35,
                  width: width - 150,
                  marginVertical: 15,
                  borderColor: theme.color.border,
                  borderWidth: 2,
                  borderRadius: 10,
                  backgroundColor: theme.color.alert,
                }}>
                <Text style={{ fontSize: 20, fontWeight: '900', color: 'white' }}>그룹 삭제하기</Text>
              </View>
            </TouchableOpacity>
          </View>
        ) : (
          <TouchableOpacity activeOpacity={0.6} onPress={onPressExit}>
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                height: 35,
                width: width - 150,
                marginVertical: 15,
                borderColor: theme.color.border,
                borderWidth: 2,
                borderRadius: 10,
                backgroundColor: theme.color.alert,
              }}>
              <Text style={{ fontSize: 20, fontWeight: '900', color: 'white' }}>그룹에서 나가기</Text>
            </View>
          </TouchableOpacity>
        )}
      </View>
    </ScrollView>
  );
};

export default GroupDetailInfoScreen;
