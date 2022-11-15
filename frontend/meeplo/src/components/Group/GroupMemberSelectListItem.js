import React from 'react';
import { View, Image, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { theme } from '../../assets/constant/DesignTheme';

const screen = Dimensions.get('screen');
const itemWidth = screen.width * 0.8;

const GroupMemberSelectListItem = ({ member, selected, disabled, onClick }) => {
  return (
    <TouchableOpacity style={styles.itemButton(selected)} onPress={() => onClick(member)} disabled={disabled}>
      <Image style={styles.profilePhoto} source={{ uri: member.photo }} />
      <Text style={styles.itemText}>{member.nickname}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  itemButton: selected => {
    return {
      backgroundColor: selected ? theme.color.bright.purple : theme.color.background,
      width: itemWidth,

      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',

      padding: 5,
      marginBottom: 10,

      borderRadius: 15,
      borderWidth: theme.border.thin,
      borderColor: theme.color.border,
    };
  },
  profilePhoto: {
    width: 40,
    height: 40,

    borderRadius: theme.radius.base,
    borderWidth: theme.border.thin,
    borderColor: theme.color.border,
  },
  itemText: {
    fontSize: 20,
    marginHorizontal: 10,
  },
});

export default GroupMemberSelectListItem;
