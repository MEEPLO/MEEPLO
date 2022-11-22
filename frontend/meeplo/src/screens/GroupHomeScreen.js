import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Modal,
  Dimensions,
  TextInput,
  Alert,
  ToastAndroid,
} from 'react-native';
import Clipboard from '@react-native-clipboard/clipboard';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Toast from 'react-native-toast-message';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faSquarePlus } from '@fortawesome/free-regular-svg-icons/faSquarePlus';
import { faPaste } from '@fortawesome/free-regular-svg-icons/faPaste';
import GroupListItem from '../components/Group/GroupListItem';
import { theme } from '../assets/constant/DesignTheme';
import { getGroupList, joinGroup } from '../redux/groupSlice';
import FontText from '../components/common/FontText';

const { width } = Dimensions.get('window');

const GroupHomeScreen = ({ navigation }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [groupCode, setGroupCode] = useState('');
  const dispatch = useDispatch();
  const groupList = useSelector(state => state.groupList);
  const colorList = ['red', 'orange', 'yellow', 'green', 'blue', 'navy', 'purple'];

  const validateInput = () => {
    if (!groupCode || groupCode.length === 0) {
      ToastAndroid.show('그룹 코드를 입력해주세요!', ToastAndroid.LONG);
      return false;
    }
    return true;
  };

  const openModal = () => setModalVisible(true);
  const closeModal = () => {
    setModalVisible(false);
    setGroupCode('');
  };

  const onPressGroup = props => {
    navigation.navigate('GroupDetail', { groupId: props });
  };

  const onPressJoinGroup = () => {
    const form = { enterCode: groupCode };
    if (validateInput()) {
      dispatch(joinGroup({ form, Alert, navigation, Toast })).then(() => {
        closeModal();
      });
    }
  };

  const onPressCreateGroup = () => {
    navigation.navigate('GroupCreate');
  };

  const fetchCopiedText = async () => {
    const text = await Clipboard.getString();
    setGroupCode(text);
  };

  useEffect(() => {
    dispatch(getGroupList());
  }, []);
  return (
    <ScrollView>
      {/* joinGroup Modal */}
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
              <FontText style={{ fontSize: width * 0.06, fontWeight: 'bold', color: 'black' }}>
                다른 그룹 참여하기
              </FontText>
            </View>
            {/* 내용물 */}
            <View style={{ flex: 3, marginHorizontal: 20, alignItems: 'center', justifyContent: 'space-around' }}>
              <FontText style={{ fontSize: 18, color: 'gray' }}>공유받은 그룹 코드를 입력해주세요!</FontText>
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
                <FontText style={{ fontSize: width * 0.05, fontWeight: 'bold', color: 'black' }}>취소</FontText>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={onPressJoinGroup}
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
                <FontText style={{ fontSize: width * 0.05, fontWeight: 'bold', color: 'black' }}>참여하기</FontText>
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
          <FontText style={{ fontSize: 24, color: 'black' }}>내 그룹 모아보기</FontText>
        </View>
        <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center' }} onPress={openModal}>
          <FontText style={{ marginRight: 5, color: 'gray' }}>다른 그룹 참여</FontText>
          <FontAwesomeIcon icon={faSquarePlus} size={14} color="gray" />
        </TouchableOpacity>
      </View>
      {groupList?.length === 0 ? (
        <TouchableOpacity
          activeOpacity={0.6}
          onPress={onPressCreateGroup}
          style={{
            margin: 20,
            borderWidth: 2,
            borderColor: theme.color.disabled,
            height: 120,
            borderRadius: 20,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <FontText style={{ fontSize: 16, marginVertical: 5, color: 'gray' }}>아직 소속된 그룹이 없네요!</FontText>
          <FontText style={{ fontSize: 20, color: 'gray', marginVertical: 5 }}>새로운 그룹을 만들어 보세요.</FontText>
        </TouchableOpacity>
      ) : (
        <>
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
        </>
      )}
      <View style={{ height: 90 }} />
    </ScrollView>
  );
};

export default GroupHomeScreen;
