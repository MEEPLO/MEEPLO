import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, Dimensions } from 'react-native';
import { useSelector } from 'react-redux';
import FontText from '../common/FontText';

import { theme } from '../../assets/constant/DesignTheme';

import GroupMemberSelectListItem from './GroupMemberSelectListItem';

const screen = Dimensions.get('screen');

const memberListMaxHeight = screen.height * 0.5;

const GroupMemberSelectList = ({ type, members, selectedMembers, user, required, onSelect, isView }) => {
  const renderMemberList = members => {
    if (Array.isArray(members)) {
      return members.map(member => (
        <GroupMemberSelectListItem
          key={member.id}
          member={member}
          selected={!!selectedMembers?.find(mem => mem.id === member.id)}
          disabled={member.id === user.id}
          onClick={onSelect}
        />
      ));
    }

    return null;
  };
  return (
    <View style={styles.memberListViewStyle}>
      <FontText style={{ color: '#000', fontWeight: 'bold', marginBottom: 20 }}>
        {type} {required ? <FontText style={{ color: theme.color.alert }}>*</FontText> : null}
      </FontText>
      <View style={{ alignItems: 'center', justifyContent: 'center' }}>
        {isView ? (
          <View>{renderMemberList(members)}</View>
        ) : (
          <FlatList
            style={styles.memberListStyle}
            data={members}
            renderItem={item => (
              <GroupMemberSelectListItem
                member={item.item}
                selected={!!selectedMembers?.find(member => member.id === item.item.id)}
                disabled={item.item.id === user.id}
                onClick={onSelect}
              />
            )}
            keyExtractor={member => member.id}
            showsVerticalScrollIndicator={false}
          />
        )}
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
