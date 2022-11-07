import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons/faChevronLeft';
import { theme } from '../../assets/constant/DesignTheme';

const ToolBarTitle = () => {
  return (
    <View style={{ backgroundColor: theme.color.background, height: 50, justifyContent: 'center' }}>
      <Image style={{ height: 30 }} source={require('../../assets/image/meeploLogo.png')} resizeMode="contain" />
    </View>
  );
};

const ToolBarLeft = props => {
  // console.log(props);
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
  return (
    <View style={{ height: 50, alignItems: 'center', justifyContent: 'center' }}>
      <Image style={{ width: 40, height: 40, borderRadius: 20 }} source={{ uri: userPhoto }} resizeMode="contain" />
    </View>
  );
};

export { ToolBarLeft, ToolBarTitle, ToolBarRight };
