import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { View, Text, Alert } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faHouseChimney } from '@fortawesome/free-solid-svg-icons/faHouseChimney';
import { faUsers } from '@fortawesome/free-solid-svg-icons/faUsers';
import { faCalendarDays } from '@fortawesome/free-solid-svg-icons/faCalendarDays';
import { faCameraRetro } from '@fortawesome/free-solid-svg-icons';
import HomeStackScreen from '../../../screens/HomeStackScreen';
import GroupStackScreen from '../../../screens/GroupStackScreen';
import ScheduleStackScreen from '../../../screens/schedule/ScheduleStackScreen';
import MomentsStackScreen from '../../../screens/MomentsStackScreen';
import HomeScreen from '../../../screens/HomeScreen';
import { theme } from '../../../assets/constant/DesignTheme';
import AddButton from './AddButton';
import { getUserInfo } from '../../../redux/userSlice';
import { setOpened } from '../../../redux/navigationSlice';
import LoadingBar from '../LoadingBar';
import LoginScreen from '../../../screens/LoginScreen';

const Tab = createBottomTabNavigator();

const NavigationBar = () => {
  const dispatch = useDispatch();
  const opened = useSelector(state => state.tabBar.opened);
  const isLoginLoading = useSelector(state => state.user.isLoginLoading);
  const isLoggedIn = useSelector(state => state.user.isLoggedIn);

  const tabBarDisplay = useSelector(state => state.tabBar.display);

  useEffect(() => {
    dispatch(getUserInfo());
  }, []);

  return (
    <Tab.Navigator
      initialRouteName="HomeStack"
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          display: tabBarDisplay,
          position: 'absolute',
          paddingBottom: 10,
          elevation: 0,
          backgroundColor: '#ffffff',
          height: 55,
        },
        tabBarActiveTintColor: 'black',
        tabBarInactiveTintColor: theme.color.disabled,
        tabBarShowLabel: false,
        tabBarHideOnKeyboard: true,
      }}>
      <Tab.Screen
        name="HomeStack"
        component={HomeStackScreen}
        options={{
          unmountOnBlur: true,
          tabBarLabel: '홈',
          tabBarIcon: ({ color, size }) => (
            <View style={{ alignItems: 'center', justifyContent: 'center' }}>
              <FontAwesomeIcon icon={faHouseChimney} color={color} size={size} />
              <Text style={{ color }}>홈</Text>
            </View>
          ),
        }}
        listeners={{
          tabPress: e => opened && dispatch(setOpened(!opened)),
        }}
      />
      <Tab.Screen
        name="GroupStack"
        component={GroupStackScreen}
        options={{
          unmountOnBlur: true,
          tabBarIcon: ({ color, size }) => (
            <View style={{ alignItems: 'center', justifyContent: 'center' }}>
              <FontAwesomeIcon icon={faUsers} color={color} size={size} />
              <Text style={{ color }}>그룹</Text>
            </View>
          ),
        }}
        listeners={{
          tabPress: e => opened && dispatch(setOpened(!opened)),
        }}
      />

      <Tab.Screen
        name="Add"
        component={HomeScreen}
        options={{
          tabBarItemStyle: { height: 0 },
          tabBarButton: props => <AddButton opened={opened} setOpened={setOpened} {...props} />,
        }}
      />
      <Tab.Screen
        name="ScheduleStack"
        component={ScheduleStackScreen}
        options={{
          unmountOnBlur: true,
          tabBarIcon: ({ color, size }) => (
            <View style={{ alignItems: 'center', justifyContent: 'center' }}>
              <FontAwesomeIcon icon={faCalendarDays} color={color} size={size} />
              <Text style={{ color }}>약속</Text>
            </View>
          ),
        }}
        listeners={{
          tabPress: e => opened && dispatch(setOpened(!opened)),
        }}
      />
      <Tab.Screen
        name="MomentsStack"
        component={MomentsStackScreen}
        options={{
          unmountOnBlur: true,
          tabBarIcon: ({ color, size }) => (
            <View style={{ alignItems: 'center', justifyContent: 'center' }}>
              <FontAwesomeIcon icon={faCameraRetro} color={color} size={size} />
              <Text style={{ color }}>추억</Text>
            </View>
          ),
        }}
        listeners={{
          tabPress: e => opened && dispatch(setOpened(!opened)),
        }}
      />
    </Tab.Navigator>
  );
};

export default NavigationBar;
