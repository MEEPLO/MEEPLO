import React, { useRef, useState } from 'react';
import { View, SafeAreaView, Animated, FlatList, Dimensions, TouchableOpacity } from 'react-native';
import ScheduleButton from '../common/ScheduleButton';

const { width } = Dimensions.get('screen');

const Indicator = ({ scrollX, data }) => {
  return (
    <View style={{ flexDirection: 'row', marginVertical: 10 }}>
      {data.map((_, i) => {
        const inputRange = [(i - 1) * width, i * width, (i + 1) * width];
        const scale = scrollX.interpolate({
          inputRange,
          outputRange: [0.8, 1.15, 0.8],
          extrapolate: 'clamp',
        });
        const opacity = scrollX.interpolate({
          inputRange,
          outputRange: [0.4, 1, 0.4],
          extrapolate: 'clamp',
        });
        return (
          <Animated.View
            key={`indicator-${i}`}
            style={{
              height: 8,
              width: 8,
              borderRadius: 4,
              backgroundColor: '#595959',
              margin: 5,
              transform: [{ scale }],
              opacity,
            }}
          />
        );
      })}
    </View>
  );
};

const HomeSchedule = ({ data, navigation }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollX = useRef(new Animated.Value(0)).current;
  const slideRef = useRef(null);

  const onPressCreateSchedule = () => {
    navigation.navigate('ScheduleStack', { screen: 'Create' });
  };

  const onPressSchedule = ({ scheduleId }) => {
    navigation.navigate('ScheduleStack', { screen: 'Detail', params: { scheduleId } });
  };

  const viewableItemsChanged = useRef(({ viewableItems }) => {
    if (Array.isArray(viewableItems) && viewableItems[0] && viewableItems[0].index) {
      setCurrentIndex(viewableItems[0].index);
    }
  }).current;

  const viewConfig = useRef({ viewAreaCoveragePercentThreshold: 50 }).current;

  const renderItem = ({ item }) => (
    <TouchableOpacity
      activeOpacity={0.6}
      onPress={() => {
        onPressSchedule({ scheduleId: item.id });
      }}>
      <ScheduleButton
        isData={true}
        picture="blue"
        title={item.name}
        date={item.date}
        place={item.location.meetName}
        group={item.groupName}
        people={item.memberCount}
      />
    </TouchableOpacity>
  );

  return (
    <>
      {data?.length > 0 ? (
        <SafeAreaView style={{ alignItems: 'center' }}>
          <FlatList
            data={data}
            renderItem={renderItem}
            keyExtractor={(item, index) => item.id + index}
            horizontal={true}
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            bounces={false}
            onScroll={Animated.event([{ nativeEvent: { contentOffset: { x: scrollX } } }], {
              useNativeDriver: false,
            })}
            onViewableItemsChanged={viewableItemsChanged}
            viewabilityConfig={viewConfig}
            ref={slideRef}
          />
          <Indicator scrollX={scrollX} data={data} />
        </SafeAreaView>
      ) : (
        <TouchableOpacity style={{ alignItems: 'center' }} onPress={onPressCreateSchedule} activeOpacity={0.6}>
          <ScheduleButton isData={false} empty="약속을 생성해 보아요" picture="blue" />
        </TouchableOpacity>
      )}
    </>
  );
};

export default HomeSchedule;
