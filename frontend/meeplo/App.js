import React from 'react';
import { Provider } from 'react-redux';
import { StatusBar } from 'react-native';
import { store } from './src/redux/store';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ThemeProvider } from 'styled-components';
import HeaderTitle from './src/components/header/HeaderTitle';
import HeaderRight from './src/components/header/HeaderRight';
import HomeScreen from './src/screens/HomeScreen';
import LoginScreen from './src/screens/LoginScreen';
import SplashScreen from './src/screens/SplashScreen';
import { theme } from './src/assets/constant/DesignTheme';

const Stack = createNativeStackNavigator();

const App = () => {
  const headerSytle = {
    headerStyle: {
      backgroundColor: '#fff',
    },
    headerTintColor: 'red',
    headerTitleStyle: {
      fontWeight: 'bold',
    },
    headerTitleAlign: 'center',
  };

  return (
    <NavigationContainer>
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <Stack.Navigator
            initialRouteName="Splash"
            screenOptions={{
              ...headerSytle,
              headerTitle: () => <HeaderTitle />,
              headerRight: () => <HeaderRight />,
            }}>
            <Stack.Screen options={{ headerShown: false }} name="Splash" component={SplashScreen} />
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen options={{ headerShown: false }} name="Login" component={LoginScreen} />
          </Stack.Navigator>
        </ThemeProvider>
      </Provider>
    </NavigationContainer>
  );
};

export default App;
