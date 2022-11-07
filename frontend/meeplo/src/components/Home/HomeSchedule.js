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
          outputRange: [0.7, 1.2, 0.7],
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
              height: 10,
              width: 10,
              borderRadius: 5,
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

const HomeSchedule = ({ data }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollX = useRef(new Animated.Value(0)).current;
  const slideRef = useRef(null);

  const viewableItemsChanged = useRef(({ viewableItems }) => {
    setCurrentIndex(viewableItems[0].index);
  }).current;

  const viewConfig = useRef({ viewAreaCoveragePercentThreshold: 50 }).current;

  const renderItem = ({ item }) => (
    <TouchableOpacity
      activeOpacity={0.6}
      onPress={() => {
        // TODO: hrookim navigate to Schedule-DETAIL page
      }}>
      <ScheduleButton
        isData={true}
        picture="blue"
        title={item.title}
        date={item.date}
        place={item.place}
        group={item.group}
        people={item.people}
      />
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={{ alignItems: 'center' }}>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={item => item.id}
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
  );
};

export default HomeSchedule;
