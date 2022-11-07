import { View, Text, Dimensions, ImageBackground } from 'react-native';
import React from 'react';
// import AutoHeightImage from 'react-native-auto-height-image';
import { theme } from '../../assets/constant/DesignTheme';

const HomeGroupItem = ({ name, photo, memberCount, leaderName, lastSchedule }) => {
  const width = (Dimensions.get('window').width - 40) / 2;
  const height = width * 0.33;
  console.log(photo);

  return (
    <View
      style={{
        width,
        height: width,
        borderRadius: 20,
        overflow: 'hidden',
        borderColor: theme.color.border,
        borderWidth: 3,
        marginRight: 20,
      }}>
      <ImageBackground source={{ uri: photo }} style={{ height: width }} resizeMode="cover">
        <View
          style={{
            backgroundColor: 'rgba(255,255,255,0.73)',
            height,
            top: width - height,
            justifyContent: 'center',
          }}>
          <Text style={{ fontWeight: '900', marginHorizontal: 5, fontSize: 15 }}>{name}</Text>
          <Text style={{ marginHorizontal: 5, fontSize: 12 }}>
            {memberCount}명 | 마지막 약속: {lastSchedule}
          </Text>
        </View>
      </ImageBackground>
    </View>
  );
};

export default HomeGroupItem;
