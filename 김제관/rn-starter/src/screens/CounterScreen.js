import React, { useReducer } from "react";
import { View, Text, Button, StyleSheet } from "react-native";

const reducer = (state, action) => {
  switch (action.type) {
    case "increase":
      return { ...state, count: state.count + action.payload };
    case "decrease":
      return { ...state, count: state.count - action.payload };
    default:
      return state;
  }
};

const CounterScreen = () => {
  const [{ count }, runMyReducer] = useReducer(reducer, { count: 0 });

  return (
    <View>
      <Button
        title="Increase"
        onPress={() => runMyReducer({ type: "increase", payload: 1 })}
      />
      <Button
        title="Decrease"
        onPress={() => runMyReducer({ type: "decrease", payload: 1 })}
      />
      <Text>Current Count : {count}</Text>
    </View>
  );
};

const styles = StyleSheet.create({});

export default CounterScreen;
