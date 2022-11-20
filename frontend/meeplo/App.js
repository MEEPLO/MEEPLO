import React, { useEffect } from 'react';
import { Provider } from 'react-redux';
import { store } from './src/redux/store';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { ThemeProvider } from 'styled-components';
import NavigationBar from './src/components/common/navigator/NavigationBar';
import { theme } from './src/assets/constant/DesignTheme';
import LottieSplashScreen from 'react-native-lottie-splash-screen';
import Toast from 'react-native-toast-message';
import { navigationRef } from './src/components/common/navigator/RootNavigator';
import { toastConfig } from './src/components/common/ToastCustom';

import { CalendarProvider } from 'react-native-calendars';

const App = () => {
  const navTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: '#FFFFFF',
      text: theme.font.color,
    },
  };

  useEffect(() => {
    setTimeout(() => {
      LottieSplashScreen.hide(); // here
    }, 2000);
  }, []);

  return (
    <>
      <NavigationContainer theme={navTheme} ref={navigationRef}>
        <CalendarProvider date="">
          <Provider store={store}>
            <ThemeProvider theme={theme}>
              <NavigationBar />
            </ThemeProvider>
          </Provider>
        </CalendarProvider>
      </NavigationContainer>
      <Toast config={toastConfig} />
    </>
  );
};

export default App;
