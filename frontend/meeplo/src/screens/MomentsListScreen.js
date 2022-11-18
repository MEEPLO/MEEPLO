import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import MomentsList from '../components/moments/MomentsList';

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
          console.log('bottom!');
          setCurrentPage(currentPage + 1);
        }
      }}>
      <View style={{ height: '100%' }}>
        <View>
          <Text style={styles.screenTitle}>내 추억 모아보기</Text>
        </View>
        <View style={{ marginBottom: 20, paddingRight: 20 }}>
          <View style={{ flexDirection: 'row', height: 30 }}>
            <Text style={{ flex: 6, lineHeight: 30, textAlign: 'right' }}>내가 작성한 추억만 보기</Text>
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
