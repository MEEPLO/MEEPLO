import React from 'react';
import { View, Text, TextInput } from 'react-native';
import { theme } from '../../assets/constant/DesignTheme';

/**
 * @param value
 * @param {} props.onValueChange
 * text input에 작성된 값을 상위 component에서 state로 관리
 */
const StepTextInput = props => {
  const { value, onValueChange } = props;
  const [inputBorderColor, setInputBorderColor] = React.useState(theme.color.disabled);
  const textInputRef = React.useRef(null);

  const inputOnBlur = () => {
    setInputBorderColor(theme.color.disabled);
  };

  const inputOnFocus = () => {
    setInputBorderColor(theme.color.bright.red);
  };

  return (
    <View>
      <Text style={{ color: theme.font.color, fontWeight: '800' }}>
        {props.type} {props.required ? <Text style={{ color: theme.color.alert }}>*</Text> : null}
      </Text>
      <TextInput
        multiline
        ref={textInputRef}
        maxLength={props.maxLength}
        onBlur={inputOnBlur}
        onFocus={inputOnFocus}
        onChangeText={onValueChange}
        value={value}
        style={{ borderBottomColor: inputBorderColor, borderBottomWidth: 1 }}
      />
    </View>
  );
};

export default StepTextInput;
