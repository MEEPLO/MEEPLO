import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import MomentsList from '../components/moments/MomentsList';
// import { Calendar } from 'react-native-calendars';

const MomentsListScreen = props => {
  const [isMine, setIsMine] = React.useState(false);

  // about calendar
  // const [filterMonth, setFilterMonth] = React.useState();
  // const dispatch = useDispatch();
  // const momentsCalendar = useSelector(state => {
  //   if (state.momentsCalendar.moments) {
  //     const momentsDotMap = new Map(
  //       state.momentsCalendar.moments.map(({ date }) => [date.slice(0, 10), { marked: true }]),
  //     );
  //     return Object.fromEntries(momentsDotMap);
  //   } else {
  //     return {};
  //   }
  // });

  // React.useEffect(() => {
  //   const now = new Date();
  //   let year = now.getFullYear();
  //   let month = now.getMonth() + 1;

  //   const yearMonth = year + '-' + month;
  //   setFilterMonth(yearMonth);
  // }, []);

  // React.useEffect(() => {
  //   dispatch(getMomentsCalendar({ month: filterMonth }));
  // }, [filterMonth]);

  // const onMoveMonth = date => {
  //   var filteredMonth = date.year + '-' + date.month;
  //   setFilterMonth(filteredMonth);
  // };

  return (
    <ScrollView>
      <View style={{ height: '100%' }}>
        <View>
          <Text style={styles.screenTitle}>추억 리스트</Text>
        </View>
        {/* {isCalendar ? (
          <Calendar
            onMonthChange={date => {
              onMoveMonth(date);
            }}
            markedDates={momentsCalendar}
            onDayPress={data => console.log(data)}
          />
        ) : (
          <> */}
        <View style={{ marginBottom: 20, paddingRight: 20 }}>
          <View style={{ flexDirection: 'row', height: 30 }}>
            <Text style={{ flex: 6, lineHeight: 30, textAlign: 'right' }}>내가 작성한 추억만 보기</Text>
            <CheckBox disabled={false} value={isMine} onValueChange={() => setIsMine(prev => !prev)} />
          </View>
        </View>
        <MomentsList isMine={isMine} navigation={props.navigation} />
        {/* </>
        )} */}
      </View>
      <View style={{ width: '100%', height: 150 }}></View>
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
