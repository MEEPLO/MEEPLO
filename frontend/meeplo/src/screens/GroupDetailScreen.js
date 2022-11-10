import { View, Text, TouchableOpacity, Dimensions } from 'react-native';
import React, { useCallback, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Tabs } from 'react-native-collapsible-tab-view';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faMapLocationDot } from '@fortawesome/free-solid-svg-icons/faMapLocationDot';
import { renderTabBar, renderScheduleLabel, renderMomentsLabel } from '../components/Group/GroupDetailTabBar';
import GroupDetailHeader from '../components/Group/GroupDetailHeader';
import GroupDetailScheduleItem from '../components/Group/GroupDetailScheduleItem';
import GroupDetailMomentsItem from '../components/Group/GroupDetailMomentsItem';
import { getGroupDetail, getGroupMomentsFeed } from '../redux/groupSlice';
import { theme } from '../assets/constant/DesignTheme';

const GroupDetailScreen = ({ route, navigation }) => {
  const dispatch = useDispatch();
  const { groupId } = route.params;
  const groupDetail = useSelector(state => state.group.details);
  const groupMomentsFeed = useSelector(state => state.group.moments);
  const { width } = Dimensions.get('window');

  const colorList = ['purple', 'red', 'navy', 'yellow', 'green', 'orange', 'blue'];

  const onPressMoment = () => {
    // TODO: hrookim moment modal 연결하기!!!!!
  };

  const renderHeader = () => {
    return <GroupDetailHeader data={groupDetail} navigation={navigation} groupId={groupId} isInfo={false} />;
  };

  const renderItem = useCallback(({ index, item }) => {
    const onPressGroupDetail = () => {
      // TODO: hrookim navigate 연결하기!!!!!
      // navigation.navigate('ScheduleStack', { screen: 'ScheduleDetail', params: { scheduleId: item.id } });
    };
    return (
      <TouchableOpacity activeOpacity={0.6} onPress={onPressGroupDetail}>
        <GroupDetailScheduleItem
          name={item.name}
          date={item.date}
          memberCount={item.memberCount}
          location={item.location}
          color={colorList[item.id % 7]}
          isLast={groupDetail?.schedules?.length === index + 1 ? true : false}
        />
      </TouchableOpacity>
    );
  }, []);

  useEffect(() => {
    dispatch(getGroupDetail({ groupId }));
    dispatch(getGroupMomentsFeed({ groupId }));
  }, []);

  return (
    <Tabs.Container renderHeader={renderHeader} renderTabBar={renderTabBar}>
      <Tabs.Tab name="scheduleLabel" label={renderScheduleLabel}>
        <Tabs.FlatList
          data={groupDetail?.schedules}
          renderItem={renderItem}
          keyExtractor={item => 'groupSchedule-' + item.id}
        />
      </Tabs.Tab>
      <Tabs.Tab name="momentsLabel" label={renderMomentsLabel}>
        <Tabs.ScrollView>
          <TouchableOpacity activeOpacity={0.6}>
            <View
              style={{
                justifyContent: 'center',
                flexDirection: 'row',
                alignSelf: 'center',
                height: 35,
                width: width - 120,
                marginVertical: 15,
                borderColor: theme.color.border,
                borderWidth: 2,
                borderRadius: 10,
              }}>
              <View
                style={{
                  flex: 1,
                  backgroundColor: theme.color.bright.blue,
                  borderTopLeftRadius: 7,
                  borderBottomLeftRadius: 7,
                  borderColor: theme.color.border,
                  borderRightWidth: 2,
                }}></View>
              <View style={{ flex: 4, alignItems: 'center', justifyContent: 'center', flexDirection: 'row' }}>
                <FontAwesomeIcon icon={faMapLocationDot} size={20} color="gray" />
                <Text style={{ fontSize: 20, fontWeight: '900', alignItems: 'center' }}>{`  지도로 추억 보기`}</Text>
              </View>
            </View>
          </TouchableOpacity>
          <View style={{ marginBottom: 105, flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' }}>
            {groupMomentsFeed?.map((item, i) => (
              <TouchableOpacity activeOpacity={0.6} key={item.id}>
                <GroupDetailMomentsItem
                  key={item.id}
                  id={item.id}
                  photo={item.photo}
                  width={width / 3 - 2}
                  color={colorList[(item.id % 4) + 3]}
                />
              </TouchableOpacity>
            ))}
          </View>
        </Tabs.ScrollView>
      </Tabs.Tab>
    </Tabs.Container>
  );
};

export default GroupDetailScreen;
