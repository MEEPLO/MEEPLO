import React, { useState, useRef, useEffect } from 'react';

import { useNavigation } from '@react-navigation/native';

import { TouchableWithoutFeedback, View, StyleSheet, Image, Animated } from 'react-native';

import Images from '../../../assets/image/index';
import { theme } from '../../../assets/constant/DesignTheme';

const AddButton = ({ toggleOpened }) => {
  const navigation = useNavigation();
  const [opened, setOpened] = useState(false);
  const animation = React.useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(animation, {
      toValue: opened ? 1 : 0,
      duration: 300,
      friction: 2,
      useNativeDriver: false,
    }).start();
  }, [opened, animation]);

  const opacity = {
    opacity: animation.interpolate({
      inputRange: [0, 0.5, 1],
      outputRange: [0, 0, 1],
    }),
  };

  const onPressCreateGroup = () => {
    navigation.navigate('GroupStack', { screen: 'GroupCreate' });
  };

  return (
    <View style={styles.container}>
      <View style={styles.box}>
        <TouchableWithoutFeedback onPress={onPressCreateGroup}>
          <Animated.View
            style={[
              styles.item,
              opacity,
              {
                transform: [
                  {
                    translateX: animation.interpolate({
                      inputRange: [0, 1],
                      outputRange: [0, -60],
                    }),
                  },
                  {
                    translateY: animation.interpolate({
                      inputRange: [0, 1],
                      outputRange: [0, -50],
                    }),
                  },
                ],
              },
            ]}>
            <Image
              source={{ uri: 'https://icons.veryicon.com/png/o/miscellaneous/forestry-in-yiliang/group-people.png' }}
              resizeMode="contain"
              style={styles.itemIcon}
            />
          </Animated.View>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback>
          <Animated.View
            style={[
              styles.item,
              opacity,
              {
                transform: [
                  {
                    translateY: animation.interpolate({
                      inputRange: [0, 1],
                      outputRange: [0, -90],
                    }),
                  },
                ],
              },
            ]}>
            <Image
              source={{ uri: 'https://icons.veryicon.com/png/o/miscellaneous/forestry-in-yiliang/group-people.png' }}
              resizeMode="contain"
              style={styles.itemIcon}
            />
          </Animated.View>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback>
          <Animated.View
            style={[
              styles.item,
              opacity,
              {
                transform: [
                  {
                    translateX: animation.interpolate({
                      inputRange: [0, 1],
                      outputRange: [0, 60],
                    }),
                  },
                  {
                    translateY: animation.interpolate({
                      inputRange: [0, 1],
                      outputRange: [0, -50],
                    }),
                  },
                ],
              },
            ]}>
            <Image
              source={{ uri: 'https://icons.veryicon.com/png/o/miscellaneous/forestry-in-yiliang/group-people.png' }}
              resizeMode="contain"
              style={styles.itemIcon}
            />
          </Animated.View>
        </TouchableWithoutFeedback>
        {/* 중앙버튼 */}
        <TouchableWithoutFeedback onPress={() => setOpened(!opened)} style={styles.addButton}>
          <Animated.View
            style={[
              styles.addButtonInner,
              {
                transform: [
                  {
                    rotate: animation.interpolate({
                      inputRange: [0, 1],
                      outputRange: ['0deg', '45deg'],
                    }),
                  },
                ],
              },
            ]}>
            <Image source={Images.addIcon} resizeMode="contain" style={styles.addButtonIcon} />
          </Animated.View>
        </TouchableWithoutFeedback>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
    height: 0,
  },
  box: {
    position: 'relative',
    width: 60,
    height: 60,
    marginTop: -30,
  },
  addButton: {
    shadowColor: theme.color.border,
    shadowOpacity: 0.3,
    shadowOffset: {
      width: 0,
      height: 2,
    },
  },
  addButtonInner: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.color.bright.purple,
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  addButtonIcon: {
    width: 75,
    height: 75,
  },
  item: {
    position: 'absolute',
    backgroundColor: theme.color.bright.blue,
    top: 5,
    left: 5,
    alignItems: 'center',
    justifyContent: 'center',
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: theme.color.border,
  },
  itemIcon: {
    width: 32,
    height: 32,
  },
});

export default AddButton;
