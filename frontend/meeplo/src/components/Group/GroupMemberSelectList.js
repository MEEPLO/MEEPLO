import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, Dimensions } from 'react-native';
import { useSelector } from 'react-redux';

import { theme } from '../../assets/constant/DesignTheme';

import GroupMemberSelectListItem from './GroupMemberSelectListItem';

const screen = Dimensions.get('screen');

const memberListMaxHeight = screen.height * 0.5;

const GroupMemberSelectList = ({ type, members, selectedMembers, required, onSelect }) => {
  const userInfo = useSelector(state => state.user.info);

  return (
    <View style={styles.memberListViewStyle}>
      <Text style={{ color: '#000', fontWeight: '800', marginBottom: 20 }}>
        {type} {required ? <Text style={{ color: theme.color.alert }}>*</Text> : null}
      </Text>
      <View style={{ alignItems: 'center', justifyContent: 'center' }}>
        <FlatList
          style={styles.memberListStyle}
          data={members}
          renderItem={item => (
            <GroupMemberSelectListItem
              member={item.item}
              selected={!!selectedMembers.find(member => member.id === item.item.id)}
              disabled={item.item.id === userInfo.id}
              onClick={onSelect}
            />
          )}
          keyExtractor={member => member.id}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  memberListViewStyle: {},
  memberListStyle: {
    maxHeight: memberListMaxHeight,
  },
});

export default GroupMemberSelectList;
