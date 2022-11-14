import React from 'react';
import { View, Image, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { theme } from '../../assets/constant/DesignTheme';

const GroupMemberSelectListItem = ({ member, selected, disabled, onClick }) => {
  return (
    <View style={styles.itemView}>
      <TouchableOpacity style={styles.itemButton(selected)} onPress={() => onClick(member)} disabled={disabled}>
        <Text>
          {member.nickname} {selected ? 'true' : 'false'}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  itemView: {},
  itemButton: selected => {
    return { backgroundColor: selected ? theme.color.bright.red : theme.color.bright.blue };
  },
});

export default GroupMemberSelectListItem;
