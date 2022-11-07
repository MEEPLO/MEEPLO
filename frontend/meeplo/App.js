import React, { useEffect } from 'react';
import { Provider } from 'react-redux';
import { store } from './src/redux/store';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { ThemeProvider } from 'styled-components';
import NavigationBar from './src/components/common/tab/NavigationBar';
import { theme } from './src/assets/constant/DesignTheme';
import SplashScreen from 'react-native-splash-screen';

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
      SplashScreen.hide();
    }, 800);
  }, []);

  return (
    <NavigationContainer theme={navTheme}>
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <NavigationBar />
        </ThemeProvider>
      </Provider>
    </NavigationContainer>
  );
};

export default App;
