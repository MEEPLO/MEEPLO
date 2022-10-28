import React from "react";
import { Text, View, StyleSheet } from "react-native";

const ComponentsScreen = () => {
  return (
    <View>
      <Text style={styles.textStyle}>This is the components screen</Text>
      <Text style={styles.textStyle}>This is the components screen2</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  textStyle: {
    fontSize: 30,
  },
});

export default ComponentsScreen;
