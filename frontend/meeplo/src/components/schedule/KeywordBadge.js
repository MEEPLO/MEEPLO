import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { theme } from '../../assets/constant/DesignTheme';
import FontText from '../common/FontText';

const KeywordBadge = ({ value, selected, onPress, disabled = false }) => {
  return (
    <TouchableOpacity disabled={disabled} style={styles.keywordBadge(selected)} onPress={() => onPress(value)}>
      <FontText style={styles.keywordBadgeText}>{value}</FontText>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  keywordBadge: selected => ({
    marginRight: 3,
    marginBottom: 10,
    width: 100,
    height: 30,
    backgroundColor: selected ? theme.color.bright.green : theme.color.bright.blue,
    borderRadius: theme.radius.base,
    alignItems: 'center',
    justifyContent: 'center',
  }),
  keywordBadgeText: {
    color: theme.font.color,
  },
});

export default KeywordBadge;
