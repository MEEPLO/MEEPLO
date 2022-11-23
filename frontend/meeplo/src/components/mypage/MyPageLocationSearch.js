import { View, Text, Modal, TouchableOpacity } from 'react-native';
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
            handleOnChange(data.address, 'address');
            setIsVisible(false);
          }}
        />
      </Modal>
    </>
  );
};

export default MyPageLocationSearch;
