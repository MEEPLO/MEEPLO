import { View, Text, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import { theme } from '../../assets/constant/DesignTheme';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons/faChevronRight';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';

const GroupDetailHeader = ({ data, navigation, groupId, isInfo }) => {
  const onPressDetail = () => {
    navigation.navigate('GroupDetailInfo', { groupId });
  };
  return (
    <View style={{ width: '100%', height: 185, alignItems: 'center', backgroundColor: 'white' }}>
      <View style={{ alignItems: 'center', marginVertical: 10 }}>
        <Image
          source={{ uri: data.photo }}
          style={{ width: 140, height: 140, borderRadius: 20, borderWidth: 3, borderColor: theme.color.disabled }}
          resizeMode="cover"
        />
      </View>

      <View style={{ alignItems: 'center', marginBottom: 10 }}>
        <TouchableOpacity
          disabled={isInfo ? true : false}
          onPress={onPressDetail}
          style={{ flexDirection: 'row', alignItems: 'center' }}
          activeOpacity={0.6}>
          <Text style={{ color: 'black', fontSize: 20, fontWeight: '900' }}>{data.name}</Text>
          {!isInfo && <FontAwesomeIcon icon={faChevronRight} size={16} color="black" />}
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default GroupDetailHeader;
