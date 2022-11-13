import React from 'react';
import { View, Text, ScrollView, Pressable, StyleSheet, TextInput } from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import { useDispatch, useSelector } from 'react-redux';
import { theme } from '../assets/constant/DesignTheme';
import { getMomentsList } from '../redux/momentsSlice';
import MomentsList from '../components/moments/MomentsList';
import MomentsCalendar from '../components/moments/MomentsCalendar';

const MomentsListScreen = props => {
  const [isMine, setIsMine] = React.useState(false);
  const [isCalendar, setIsCalendar] = React.useState(false);
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(getMomentsList());
  }, []);

  const linkTo = React.useCallback(nextPage => {
    props.navigation.push(nextPage);
  }, []);

  return (
    <ScrollView>
      <View style={{ height: '100%' }}>
        <View>
          <Text style={styles.screenTitle}>추억 리스트</Text>
        </View>
        <View style={{ paddingRight: 20, flexDirection: 'row', height: 30 }}>
          <Text style={{ flex: 6, lineHeight: 30, textAlign: 'right' }}>달력으로 보기</Text>
          <CheckBox disabled={false} value={isCalendar} onValueChange={() => setIsCalendar(prev => !prev)} />
        </View>
        {isCalendar ? (
          <MomentsCalendar />
        ) : (
          <>
            <View style={{ marginBottom: 20, paddingRight: 20 }}>
              <View style={{ flexDirection: 'row', height: 30 }}>
                <Text style={{ flex: 6, lineHeight: 30, textAlign: 'right' }}>내가 작성한 추억만 보기</Text>
                <CheckBox disabled={false} value={isMine} onValueChange={() => setIsMine(prev => !prev)} />
              </View>
              <View>
                <Text style={{ textAlign: 'right' }}>그룹 선택 selet options</Text>
              </View>
            </View>
            <Pressable
              style={{
                marginBottom: 20,
                marginHorizontal: '10%',
                width: '80%',
                height: 60,
                borderRadius: 15,
                borderColor: theme.color.border,
                borderWidth: 2,
                backgroundColor: theme.color.bright.yellow,
              }}
              onPress={() => linkTo('MomentsCreate')}>
              <Text
                style={{
                  textAlign: 'center',
                  fontWeight: '800',
                  fontSize: 20,
                  color: theme.font.color,
                  lineHeight: 54,
                }}>
                생성
              </Text>
            </Pressable>
            <MomentsList isMine={isMine} navigation={props.navigation} />
          </>
        )}
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
