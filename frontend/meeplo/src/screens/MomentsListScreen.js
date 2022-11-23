import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import MomentsList from '../components/moments/MomentsList';
import FontText from '../components/common/FontText';

const MomentsListScreen = props => {
  const [isMine, setIsMine] = React.useState(false);
  const [currentPage, setCurrentPage] = React.useState(0);

  const setOnlyMine = () => {
    setIsMine(!isMine);
    setCurrentPage(0);
  };

  const isCloseToBottom = ({ layoutMeasurement, contentOffset, contentSize }) => {
    const paddingToBottom = 0;
    return layoutMeasurement.height + contentOffset.y >= contentSize.height - paddingToBottom;
  };

  return (
    <ScrollView
      onScroll={({ nativeEvent }) => {
        if (isCloseToBottom(nativeEvent)) {
          // console.log('bottom!');
          setCurrentPage(currentPage + 1);
        }
      }}>
      <View style={{ height: '100%' }}>
        <View style={{ marginHorizontal: 20, marginTop: 30, marginBottom: 10 }}>
          <FontText style={styles.screenTitle}>내 추억 모아보기</FontText>
        </View>
        <View style={{ marginBottom: 30, paddingRight: 20 }}>
          <View style={{ flexDirection: 'row', height: 30 }}>
            <FontText style={{ flex: 6, lineHeight: 30, textAlign: 'right', color: 'gray' }}>
              내가 작성한 추억만 보기
            </FontText>
            <CheckBox disabled={false} value={isMine} onValueChange={setOnlyMine} />
          </View>
        </View>
        <MomentsList currentPage={currentPage} isMine={isMine} navigation={props.navigation} />
      </View>
      <View style={{ width: '100%', height: 50 }}></View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  screenTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'black',
  },
  filteringMine: {},
});

export default MomentsListScreen;
