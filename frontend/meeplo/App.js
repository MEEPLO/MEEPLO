import React from 'react';
import { Provider } from 'react-redux';
import { store } from './src/redux/store';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { ThemeProvider } from 'styled-components';
import NavigationBar from './src/components/common/NavigationBar';
import { theme } from './src/assets/constant/DesignTheme';

const App = () => {
  const navTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: '#FFFFFF',
    },
  };
  return (
    <NavigationContainer theme={navTheme}>
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          {/* 스플래휘 화면이랑 로그인 화면은 여기에 있어야 하지 않을까
          조건부 렌더링이 되어야 할 것 같다! */}
          <NavigationBar />
        </ThemeProvider>
      </Provider>
    </NavigationContainer>
  );
};

export default App;
