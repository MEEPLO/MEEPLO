import React from 'react';
import { useSelector } from 'react-redux';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './LoginScreen';
import HomeScreen from './HomeScreen';
import LoadingBar from '../components/common/LoadingBar';
import { ToolBarLeft, ToolBarRight, ToolBarTitle } from '../components/common/navigator/ToolBar';
import MyPageScreen from './mypage/MyPageScreen';
import MyPageLocationScreen from './mypage/MyPageLocationScreen';
import MyPageLocationEditScreen from './mypage/MyPageLocationEditScreen';

const HomeStack = createNativeStackNavigator();

const HomeStackScreen = () => {
  const user = useSelector(state => state.user.info);
  console.log(user.profilePhoto);

  return (
    <HomeStack.Navigator initialRouteName="Login">
      <HomeStack.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerShadowVisible: false,
          headerShown: true,
          headerTitleAlign: 'center',
          headerLeft: props => {
            props.canGoBack && <ToolBarLeft {...props} />;
          },
          headerRight: () => <ToolBarRight userPhoto={user.profilePhoto} />,
          headerTitle: () => <ToolBarTitle />,
        }}
      />
      <HomeStack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
      <HomeStack.Screen name="Loading" component={LoadingBar} options={{ headerShown: false }} />
      <HomeStack.Screen
        name="MyPage"
        component={MyPageScreen}
        options={{
          headerShadowVisible: false,
          headerShown: true,
          headerTitleAlign: 'center',
          headerBackVisible: false,
          headerLeft: props => {
            return props.canGoBack && <ToolBarLeft {...props} />;
          },
          headerTitle: () => <ToolBarTitle />,
        }}
      />
      <HomeStack.Screen
        name="MyPageLocation"
        component={MyPageLocationScreen}
        options={{
          headerShadowVisible: false,
          headerShown: true,
          headerTitleAlign: 'center',
          headerBackVisible: false,
          headerLeft: props => {
            return props.canGoBack && <ToolBarLeft {...props} />;
          },
          headerRight: () => <ToolBarRight userPhoto={user.profilePhoto} />,
          headerTitle: () => <ToolBarTitle />,
        }}
      />
      <HomeStack.Screen
        name="MyPageLocationEdit"
        component={MyPageLocationEditScreen}
        // if locationId is 0, this is CREATE screen
        initialParams={{ locationId: 0 }}
        options={{
          headerShadowVisible: false,
          headerShown: true,
          headerTitleAlign: 'center',
          headerBackVisible: false,
          headerLeft: props => {
            return props.canGoBack && <ToolBarLeft {...props} />;
          },
          headerRight: () => <ToolBarRight userPhoto={user.profilePhoto} />,
          headerTitle: () => <ToolBarTitle />,
        }}
      />
    </HomeStack.Navigator>
  );
};

export default HomeStackScreen;
