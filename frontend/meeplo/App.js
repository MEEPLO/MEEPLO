import React from 'react';
import { SafeAreaView, StatusBar, Text, useColorScheme, View } from 'react-native';
import { Provider } from 'react-redux';
import { store } from './src/redux/store';

import { Colors } from 'react-native/Libraries/NewAppScreen';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HeaderTitle from './src/components/header/HeaderTitle';
import HeaderRight from './src/components/header/HeaderRight';

import Home from './src/screens/Home';
import Details from './src/screens/Details';

const Stack = createNativeStackNavigator();

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

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
        <StatusBar
          barStyle={isDarkMode ? 'light-content' : 'dark-content'}
          backgroundColor={backgroundStyle.backgroundColor}
        />
        <Stack.Navigator
          initialRouteName="home"
          screenOptions={{
            ...headerSytle,
            headerTitle: () => <HeaderTitle />,
            headerRight: () => <HeaderRight />,
          }}>
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="Details" component={Details} />
        </Stack.Navigator>
      </Provider>
    </NavigationContainer>
  );
};

export default App;
