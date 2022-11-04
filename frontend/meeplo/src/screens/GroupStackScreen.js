import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { View, Text } from 'react-native';
import { getGroupList } from '../redux/groupSlice';

const GroupStackScreen = () => {
  const dispatch = useDispatch();
  const groupList = useSelector(state => state.groupList);
  console.log('state접근: ', groupList);

  useEffect(() => {
    dispatch(getGroupList());
  }, []);
  return (
    <>
      <View style={{ flex: 1, backgroundColor: 'red' }}>
        <Text style={{ fontSize: 40 }}>This is Group Home</Text>
      </View>
    </>
  );
};

export default GroupStackScreen;
