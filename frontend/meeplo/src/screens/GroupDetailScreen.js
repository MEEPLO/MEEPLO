import { View, Text, TouchableOpacity, Dimensions } from 'react-native';
import React, { useCallback, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Tabs } from 'react-native-collapsible-tab-view';
// import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
// import { faMapLocationDot } from '@fortawesome/free-solid-svg-icons/faMapLocationDot';
import { renderTabBar, renderScheduleLabel, renderMomentsLabel } from '../components/Group/GroupDetailTabBar';
import GroupDetailHeader from '../components/Group/GroupDetailHeader';
import GroupDetailScheduleItem from '../components/Group/GroupDetailScheduleItem';
import GroupDetailMomentsItem from '../components/Group/GroupDetailMomentsItem';
import { getGroupDetail, getGroupMomentsFeed } from '../redux/groupSlice';
import { theme } from '../assets/constant/DesignTheme';
import MomentModal from '../components/moments/MomentModal';

const { width } = Dimensions.get('window');

const GroupDetailScreen = ({ route, navigation }) => {
  const dispatch = useDispatch();
  const [modalVisible, setModalVisible] = useState(false);
  const { groupId } = route.params;
  const groupDetail = useSelector(state => state.group.details);
  const groupMomentsFeed = useSelector(state => state.group.moments);

  const colorList = ['purple', 'red', 'navy', 'yellow', 'green', 'orange', 'blue'];

  const onPressMoment = () => {
    // TODO: hrookim moment modal 연결하기!!!!!
    setModalVisible(true);
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
          <View style={{ marginBottom: 105, flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' }}>
            {groupMomentsFeed?.map((item, i) => (
              <View key={item.id}>
                <MomentModal
                  momentDetailId={item.id}
                  setMomentModal={setModalVisible}
                  momentModal={modalVisible}
                  navigation={navigation}
                />
                <TouchableOpacity activeOpacity={0.6} key={item.id} onPress={onPressMoment}>
                  <GroupDetailMomentsItem
                    key={item.id}
                    id={item.id}
                    photo={item.photo}
                    width={width / 3 - 2}
                    color={colorList[(item.id % 4) + 3]}
                  />
                </TouchableOpacity>
              </View>
            ))}
          </View>
        </Tabs.ScrollView>
      </Tabs.Tab>
    </Tabs.Container>
  );
};

export default GroupDetailScreen;
