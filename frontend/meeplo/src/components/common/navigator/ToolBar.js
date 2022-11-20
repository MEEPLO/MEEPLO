import { View, Text, TouchableOpacity, Image } from 'react-native';
import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons/faChevronLeft';
import { theme } from '../../../assets/constant/DesignTheme';
import Images from '../../../assets/image/index';

const ToolBarTitle = () => {
  return (
    <View style={{ backgroundColor: theme.color.background, height: 50, justifyContent: 'center' }}>
      <Image style={{ width: 60, height: '100%' }} source={Images.meeploLogo} resizeMode="contain" />
    </View>
  );
};

const ToolBarLeft = props => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      style={{ alignItems: 'center', justifyContent: 'center' }}
      onPress={() => {
        navigation.goBack();
      }}>
      <FontAwesomeIcon icon={faChevronLeft} size={25} color="#959595" />
    </TouchableOpacity>
  );
};

const ToolBarRight = ({ userPhoto }) => {
  const user = useSelector(state => state.user.info);
  const navigation = useNavigation();

  const onPressMyPage = () => {
    navigation.navigate('HomeStack', { screen: 'MyPage' });
  };

  return (
    <TouchableOpacity style={{ height: 50, alignItems: 'center', justifyContent: 'center' }} onPress={onPressMyPage}>
      <Image
        style={{ width: 40, height: 40, borderRadius: 20 }}
        source={{ uri: userPhoto || user.profilePhoto }}
        resizeMode="contain"
      />
    </TouchableOpacity>
  );
};

export { ToolBarLeft, ToolBarTitle, ToolBarRight };
