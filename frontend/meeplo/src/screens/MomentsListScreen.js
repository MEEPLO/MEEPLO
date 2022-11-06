import React from 'react';
import { View, Text, ScrollView, Switch, Pressable, StyleSheet, TextInput } from 'react-native';
import styled from 'styled-components';
import { theme } from '../assets/constant/DesignTheme';
import { Dropdown } from 'react-native-material-dropdown';

import MomentsList from '../components/moments/MomentsList';

const MomentsListScreen = ({ navigation }) => {
  const linkTo = React.useCallback(nextPage => {
    navigation.push(nextPage);
  }, []);

  const [isMine, setIsMine] = React.useState(false);
  const toggleSwitch = () => setIsMine(previousState => !previousState);

  return (
    <ScrollView>
      <View style={{ height: '100%' }}>
        <View>
          <Text style={styles.screenTitle}>추억 리스트</Text>
        </View>
        <View style={{ marginBottom: 20, paddingRight: 20 }}>
          <View style={{ flexDirection: 'row', height: 30 }}>
            <Text style={{ flex: 6, lineHeight: 30, textAlign: 'right' }}>내가 작성한 추억만 보기</Text>
            <Switch
              style={{ flex: 1 }}
              trackColor={{ false: '#999999', true: theme.color.pale.red }}
              thumbColor={isMine ? theme.color.bright.red : '#eee'}
              onValueChange={toggleSwitch}
              value={isMine}
            />
          </View>
          <View>
            <Text style={{ textAlign: 'right' }}>그룹 선택 selet options</Text>
            {/* <Dropdown label="Favorite Fruit" data={data} /> */}
          </View>
        </View>
        <Pressable onPress={() => linkTo('MomentsCreate')}>
          <Text>생성</Text>
        </Pressable>
        <MomentsList />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  screenTitle: {
    paddingLeft: 20,
    height: 100,
    color: '#000',
    fontSize: 23,
    fontWeight: '800',
    lineHeight: 100,
  },
  filteringMine: {},
});

export default MomentsListScreen;
