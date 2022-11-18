import { ScrollView, View, Text, TextInput, TouchableOpacity, Dimensions } from 'react-native';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faPen } from '@fortawesome/free-solid-svg-icons/faPen';
import { faLocationDot } from '@fortawesome/free-solid-svg-icons/faLocationDot';
import MyPageLocationSearch from '../../components/mypage/MyPageLocationSearch';
import { theme } from '../../assets/constant/DesignTheme';
import { createStartLocation, getUserInfo } from '../../redux/userSlice';
import LoadingModal from '../../components/common/LoadingModal';

const MyPageLocationEditScreen = ({ route, navigation }) => {
  const dispatch = useDispatch();
  const [form, setForm] = useState({
    name: '',
    address: '',
  });
  const [isVisible, setIsVisible] = useState(false);
  const [inputBorderColor, setInputBorderColor] = useState(theme.color.disabled);
  const isEditLoading = useSelector(state => state.user.isEditLoading);

  const handleOnChange = (text, field) => {
    setForm(prevState => ({ ...prevState, [field]: text }));
  };

  const inputOnBlur = () => {
    setInputBorderColor(theme.color.disabled);
  };

  const inputOnFocus = () => {
    setInputBorderColor(theme.color.bright.red);
  };

  const onPressSearch = () => {
    setIsVisible(true);
  };

  const onPressAdd = () => {
    dispatch(createStartLocation({ form })).then(() => {
      dispatch(getUserInfo());
      navigation.pop();
    });
  };

  return (
    <>
      <ScrollView style={{ flex: 1, marginHorizontal: 20 }}>
        <Text style={{ fontSize: 24, fontWeight: '900', color: 'black', marginVertical: 25 }}>출발지 추가</Text>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <View style={{ height: 36, justifyContent: 'center', marginRight: 10 }}>
            <FontAwesomeIcon icon={faPen} color={'gray'} size={17} />
          </View>
          <TextInput
            onBlur={inputOnBlur}
            onFocus={inputOnFocus}
            placeholder="출발지 이름"
            onChangeText={text => {
              handleOnChange(text, 'name');
            }}
            placeholderTextColor={theme.color.disabled}
            style={{
              width: '100%',
              height: 36,
              borderBottomColor: inputBorderColor,
              borderBottomWidth: 1,
              fontSize: 20,
              marginVertical: 15,
              padding: 0,
            }}
          />
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <View style={{ height: 36, justifyContent: 'center', marginRight: 10 }}>
            <FontAwesomeIcon icon={faLocationDot} color={'gray'} size={17} />
          </View>
          <TouchableOpacity
            onPress={onPressSearch}
            style={{
              width: '100%',
              height: 36,
              borderBottomColor: theme.color.disabled,
              borderBottomWidth: 1,
              fontSize: 20,
              marginVertical: 15,
              padding: 0,
            }}>
            <Text
              style={{
                fontSize: 20,
                color: form?.address ? 'black' : theme.color.disabled,
              }}>
              {form?.address ? form.address : '건물, 지번 또는 도로명 검색'}
            </Text>
          </TouchableOpacity>
        </View>
        <View style={{ justifyContent: 'center', alignItems: 'center', marginVertical: 30 }}>
          <TouchableOpacity
            onPress={onPressAdd}
            activeOpacity={0.6}
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              height: 35,
              width: 200,
              borderColor: theme.color.border,
              borderWidth: 2,
              borderRadius: 10,
              backgroundColor: theme.color.pale.green,
              marginHorizontal: 5,
            }}>
            <Text style={{ fontSize: 20, fontWeight: '900', color: 'black' }}>추가하기</Text>
          </TouchableOpacity>
        </View>
        <MyPageLocationSearch isVisible={isVisible} setIsVisible={setIsVisible} handleOnChange={handleOnChange} />
      </ScrollView>
      <LoadingModal visible={isEditLoading} />
    </>
  );
};

export default MyPageLocationEditScreen;
