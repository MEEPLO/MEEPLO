import React from 'react';
import { View, Text, TextInput } from 'react-native';
import { theme } from '../../assets/constant/DesignTheme';

const StepTextInput = props => {
  const [inputValue, setInputValue] = React.useState();
  const [inputBorderColor, setInputBorderColor] = React.useState(theme.color.disabled);
  const textInputRef = React.useRef(null);

  const inputOnBlur = () => {
    setInputBorderColor(theme.color.disabled);
  };

  const inputOnFocus = () => {
    setInputBorderColor(theme.color.bright.red);
  };

  const inputValueHandler = event => {
    setInputValue(event.target.value);
  };

  return (
    <View>
      <Text style={{ color: theme.font.color, fontWeight: '800' }}>
        {props.type} {props.required ? <Text style={{ color: theme.color.alert }}>*</Text> : null}
      </Text>
      <TextInput
        ref={textInputRef}
        maxLength={props.maxLength}
        onBlur={inputOnBlur}
        onFocus={inputOnFocus}
        onChange={inputValueHandler}
        style={{ borderBottomColor: inputBorderColor, borderBottomWidth: 1 }}
      />
    </View>
  );
};

export default StepTextInput;
