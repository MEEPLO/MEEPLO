import { View, Text, ScrollView, TouchableOpacity, Modal, Dimensions, TextInput } from 'react-native';
import Clipboard from '@react-native-clipboard/clipboard';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useFocusEffect } from '@react-navigation/native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faSquarePlus } from '@fortawesome/free-regular-svg-icons/faSquarePlus';
import { faPaste } from '@fortawesome/free-regular-svg-icons/faPaste';
import GroupListItem from '../components/Group/GroupListItem';
import { theme } from '../assets/constant/DesignTheme';
import { getGroupList } from '../redux/groupSlice';

const { width, height } = Dimensions.get('window');

const GroupHomeScreen = ({ navigation }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [groupCode, setGroupCode] = useState('');
  const dispatch = useDispatch();
  const groupList = useSelector(state => state.groupList);
  const colorList = ['red', 'orange', 'yellow', 'green', 'blue', 'navy', 'purple'];

  const onPressGroup = props => {
    navigation.navigate('GroupDetail', { groupId: props });
  };

  const fetchCopiedText = async () => {
    const text = await Clipboard.getString();
    setGroupCode(text);
  };

  const openModal = () => setModalVisible(true);
  const closeModal = () => {
    setModalVisible(false);
    setGroupCode('');
  };

  useEffect(() => {
    dispatch(getGroupList());
  }, []);
  return (
    <ScrollView>
      <Modal animationType="fade" transparent={true} visible={modalVisible} onRequestClose={closeModal}>
        <View
          style={{
            backgroundColor: 'rgba(255, 255, 255, 0.8)',
            position: 'absolute',
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <View
            style={{
              borderRadius: 20,
              width: width * 0.8,
              height: width * 0.6,
              backgroundColor: 'white',
              borderWidth: 2,
              borderColor: theme.color.border,
            }}>
            <View
              style={{
                flex: 1,
                backgroundColor: theme.color.bright.navy,
                borderTopLeftRadius: 18,
                borderTopRightRadius: 18,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Text style={{ fontSize: width * 0.06, fontWeight: 'bold', color: 'black' }}>다른 그룹 참여하기</Text>
            </View>
            {/* 내용물 */}
            <View style={{ flex: 3, marginHorizontal: 20, alignItems: 'center', justifyContent: 'space-around' }}>
              <Text style={{ fontSize: 18 }}>공유받은 그룹 코드를 입력해주세요!</Text>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <TextInput
                  onChangeText={setGroupCode}
                  value={groupCode}
                  style={{
                    width: width * 0.55,
                    borderBottomColor: theme.color.border,
                    borderBottomWidth: 1,
                    paddingHorizontal: 10,
                    paddingVertical: 3,
                  }}
                />
                <TouchableOpacity onPress={fetchCopiedText}>
                  <FontAwesomeIcon icon={faPaste} size={18} color="gray" />
                </TouchableOpacity>
              </View>
            </View>
            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-around' }}>
              <TouchableOpacity
                onPress={closeModal}
                activeOpacity={0.6}
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  height: 35,
                  width: width * 0.35,
                  borderColor: theme.color.border,
                  borderWidth: 2,
                  borderRadius: 10,
                  backgroundColor: theme.color.disabled,
                }}>
                <Text style={{ fontSize: width * 0.05, fontWeight: '900', color: 'black' }}>취소</Text>
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={0.6}
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  height: 35,
                  width: width * 0.35,
                  borderColor: theme.color.border,
                  borderWidth: 2,
                  borderRadius: 10,
                  backgroundColor: theme.color.bright.green,
                }}>
                <Text style={{ fontSize: width * 0.05, fontWeight: '900', color: 'black' }}>참여하기</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', margin: 20 }}>
        <View
          style={{
            justifyContent: 'space-between',
            flexDirection: 'row',
            alignItems: 'baseline',
          }}>
          <Text style={{ fontSize: 24, fontWeight: '900', fontColor: theme.font.color }}>그룹 리스트</Text>
        </View>
        <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center' }} onPress={openModal}>
          <Text style={{ marginRight: 5 }}>다른 그룹 참여</Text>
          <FontAwesomeIcon icon={faSquarePlus} size={14} color="gray" />
        </TouchableOpacity>
      </View>
      {groupList?.map((item, i) => (
        <View style={{ marginVertical: 4 }} key={`groupList-${i}`}>
          <TouchableOpacity
            activeOpacity={0.6}
            onPress={() => {
              onPressGroup(item.id);
            }}>
            <GroupListItem
              name={item.name}
              photo={item.photo}
              memberCount={item.memberCount}
              leaderName={item.leaderName}
              lastSchedule={item.lastSchedule}
              color={colorList[i % 7]}
            />
          </TouchableOpacity>
        </View>
      ))}
      <View style={{ height: 90 }} />
    </ScrollView>
  );
};

export default GroupHomeScreen;
