# 가보자고

## 00. 시작하기

앱 생성

```bash
npx react-native init appName --template react-native-template-typescript
```

앱 시작하기

```bash
npx react-native start
npm run android
```

## 01. 기본 구조

일단 css가 못생겼다.

```tsx
const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32, // dp, % 가능
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8, // camelCase
    fontSize: 18,
    fontWeight: '400',
    // border: 1px solid #000 안 됨 전부 풀어써야 함 불합리
  },
  highlight: {
    fontWeight: '700',
  },
});
```

StyleSheet로 최대한 쓰고, 조건문의 경우에는 StyleSheet에서 쓸 수 없으므로 따로 빼서 쓴다.

```tsx
<Text
  style={[
    styles.sectionTitle,
    {
      color: isDarkMode ? Colors.white : Colors.black,
    },
  ]}>
  {/* StyleSheet에서는 조건문을 쓸 수 없다 */}
  {/* 여기서 지정하는게 더 우위에 있음 */}
  {title}
</Text>
```

```tsx
const backgroundStyle = {
  backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
};
```

그 외에도 flexDirection이 column 기반이다.



## 02. React Navigation

```bash
npm i @react-navigation/native @react-navigation/native-stack
npm i react-native-screens react-native-safe-area-context
```

화면 간 이동을 도와주는 라이브러리. stack 형태라서 화면을 이동하면 전 화면이 사라지는 것이 아니라 기존의 화면 위에 새로운 화면이 쌓이는 구조다. 



```java
// android/app/src/main/java/FoodDeliveryApp/MainActivity.java

// 추가
import android.os.Bundle;

  // @Override
  // protected String getMainComponentName() {
  //   return "RNbaby";
  // }
  // 밑에

  @Override
  protected void onCreate(Bundle savedInstanceState) {
    super.onCreate(null);
  }
```

해당 파일에 얘도 추가해준다



```tsx
import * as React from 'react';
import {NavigationContainer, ParamListBase} from '@react-navigation/native';
import {
  createNativeStackNavigator,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';
import {Text, TouchableHighlight, View} from 'react-native';
import {useCallback} from 'react';


// Stack이라고 보통 칭한다 이건 거의 외워둘 것
const Stack = createNativeStackNavigator<RootStackParamList>();

function App() {
  return (
    // react navigation 쓸 때에는 최상단에 NavigationContainer로 묶어준다 약간 routerView 느낌이구나
    <NavigationContainer>
      {/* Stack.Navigator가 Stack.Screen들을 그룹으로 묶어서 navigation 기능을 이용하게 한다 */}
      <Stack.Navigator initialRouteName="Home">
        {/* 그리고 미리 화면들을 배치해놔야 하는구나 */}
        {/* 아 스크린 구성 표현에는 두 가지 방법이 있으나 첫 번째 스크린을 주로 사용한다*/}
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{title: 'Overview'}}
        />
        <Stack.Screen name="Details">
          {props => <DetailsScreen {...props} />}
        </Stack.Screen>
        {/*
          두 번째 스크린을 첫 번째처럼 표현하자면
          <Stack.Screen name="Details" component={ DetailScreen } />
        */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
```







## 참고

> 디버깅 도구: Flipper
> 
> https://fbflipper.com/
> 
> 근데? 에러가 날 수 있? 다?
