import { View, Text, Modal, TouchableOpacity, Alert } from 'react-native';
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons/faXmark';
import Postcode from '@actbase/react-daum-postcode';
import FontText from '../common/FontText';

const MyPageLocationSearch = ({ isVisible, setIsVisible, handleOnChange }) => {
  return (
    <>
      <Modal visible={isVisible}>
        <View>
          <FontText
            style={{ color: 'black', fontWeight: 'bold', fontSize: 24, textAlign: 'center', marginVertical: 10 }}>
            주소 검색
          </FontText>
          <TouchableOpacity
            style={{ position: 'absolute', left: '90%', top: 12 }}
            onPress={() => {
              setIsVisible(false);
            }}>
            <FontAwesomeIcon icon={faXmark} color="black" size={25} />
          </TouchableOpacity>
        </View>
        <Postcode
          style={{ flex: 1, width: '100%', zIndex: 999 }}
          jsOptions={{ animation: true, hideMapBtn: true }}
          onSelected={data => {
            console.log(data.sido);
            if (data.sido === '서울' || data.sido === '경기' || data.sido === '인천') {
              handleOnChange(data.address, 'address');
              setIsVisible(false);
            } else {
              Alert.alert('출발지 등록 불가', '현재는 서울, 경기, 인천만 등록 가능합니다.', [{ text: '확인' }]);
              setIsVisible(false);
            }
          }}
        />
      </Modal>
    </>
  );
};

export default MyPageLocationSearch;
