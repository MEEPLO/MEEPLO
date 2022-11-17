import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { theme } from '../../assets/constant/DesignTheme';

const ScheduleDetailScreen = ({ navigation }) => {
  return (
    <View style={styles.screenStyle}>
      <Text>ScheduleDetailScreen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  screenStyle: {
    flex: 1,
    padding: 20,
    backgroundColor: theme.color.background,
  },
});

export default ScheduleDetailScreen;
