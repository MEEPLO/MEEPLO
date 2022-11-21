import React from "react";
import { View, Text, StyleSheet } from "react-native";

const BoxScreen = () => {
  return (
    <View style={styles.viewStyle}>
      <View style={styles.boxOneStyle} />
      <View style={styles.boxTwoStyle} />
      <View style={styles.boxThreeStyle} />
    </View>
  );
};

const styles = StyleSheet.create({
  viewStyle: {
    borderWidth: 1,
    borderColor: "black",
    height: 200,

    flexDirection: "row",
    justifyContent: "space-between",
  },
  boxOneStyle: {
    backgroundColor: "cyan",
    width: 100,
    height: 70,
  },
  boxTwoStyle: {
    backgroundColor: "magenta",
    width: 100,
    height: 70,

    top: 70,
  },
  boxThreeStyle: {
    backgroundColor: "yellow",
    width: 100,
    height: 70,
  },
});

export default BoxScreen;
