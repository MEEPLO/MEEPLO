import { TouchableWithoutFeedback, View, StyleSheet, Image, Animated } from 'react-native';
import React, { useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faUserPlus } from '@fortawesome/free-solid-svg-icons/faUserPlus';
import { faMapLocationDot } from '@fortawesome/free-solid-svg-icons/faMapLocationDot';
import { faImages } from '@fortawesome/free-regular-svg-icons/faImages';

import { setOpened } from '../../../redux/navigationSlice';
import Images from '../../../assets/image/index';
import { theme } from '../../../assets/constant/DesignTheme';

const AddButton = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const opened = useSelector(state => state.tabBar.opened);

  const animation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(animation, {
      toValue: opened ? 1 : 0,
      duration: 250,
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
    dispatch(setOpened(!opened));
  };
  const onPressCreateSchedule = () => {
    navigation.navigate('ScheduleStack', { screen: 'Create' });
    dispatch(setOpened(!opened));
  };
  const onPressCreateMoment = () => {
    navigation.navigate('MomentsStack', { screen: 'MomentsCreate' });
    dispatch(setOpened(!opened));
  };
  const onPressAddButton = () => {
    dispatch(setOpened(!opened));
  };

  return (
    <View style={styles.container}>
      <View style={styles.box}>
        {/* Background circle */}
        <Animated.View
          style={[
            styles.backCircle,
            opacity,
            {
              transform: [
                {
                  scaleX: animation.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, 4.5],
                  }),
                },
                {
                  scaleY: animation.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, 4.5],
                  }),
                },
              ],
            },
            {
              backgroundColor: 'white',
            },
          ]}></Animated.View>
        {/* Create-Group Button */}
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
                      outputRange: [0, -45],
                    }),
                  },
                ],
              },
              {
                backgroundColor: theme.color.pale.red,
              },
            ]}>
            {/* <FontAwesomeIcon icon={faUserPlus} size={30} /> */}
            <Image source={Images.add.group} style={{ width: 27, height: 21 }} />
          </Animated.View>
        </TouchableWithoutFeedback>
        {/* Create-Schedule Button */}
        <TouchableWithoutFeedback onPress={onPressCreateSchedule}>
          <Animated.View
            style={[
              styles.item,
              opacity,
              {
                transform: [
                  {
                    translateY: animation.interpolate({
                      inputRange: [0, 1],
                      outputRange: [0, -77],
                    }),
                  },
                ],
              },
              {
                backgroundColor: theme.color.pale.yellow,
              },
            ]}>
            {/* <FontAwesomeIcon icon={faMapLocationDot} size={30} /> */}
            <Image source={Images.add.schedule} style={{ marginLeft: 5, width: 27, height: 23 }} />
          </Animated.View>
        </TouchableWithoutFeedback>
        {/* Create-Moments Button */}
        <TouchableWithoutFeedback onPress={onPressCreateMoment}>
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
                      outputRange: [0, -45],
                    }),
                  },
                ],
              },
              {
                backgroundColor: theme.color.pale.blue,
              },
            ]}>
            {/* <FontAwesomeIcon icon={faImages} size={30} /> */}
            <Image source={Images.add.moment} style={{ marginLeft: 5, width: 30, height: 20 }} />
          </Animated.View>
        </TouchableWithoutFeedback>
        {/* Add Button */}
        <TouchableWithoutFeedback onPress={onPressAddButton} style={styles.addButton}>
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
    top: 5,
    left: 5,
    alignItems: 'center',
    justifyContent: 'center',
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 1.5,
    borderColor: theme.color.border,
  },
  backCircle: {
    position: 'absolute',
    top: -38,
    left: 5,
    alignItems: 'center',
    justifyContent: 'center',
    width: 50,
    height: 25,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    zIndex: -99,
    borderTopColor: '#E8E8E8',
    borderLeftColor: '#E8E8E8',
    borderRightColor: '#E8E8E8',
    borderTopWidth: 0.12,
    borderLeftWidth: 0.12,
    borderRightWidth: 0.12,
  },
});

export default AddButton;
