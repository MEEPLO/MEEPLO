import React from 'react';
import { View, Text, Dimensions } from 'react-native';
import { theme } from '../../assets/constant/DesignTheme';
import SelectList from 'react-native-dropdown-select-list';
import FontText from './FontText';

const SelectDropdown = props => {
  // const [selected, setSelected] = React.useState('');
  const placeholder = props.type + ' 선택';

  const windowHeight = Dimensions.get('window').height;

  return (
    <View>
      <FontText style={{ color: '#000', fontWeight: 'bold', marginBottom: 20 }}>
        {props.type} {props.required ? <FontText style={{ color: theme.color.alert }}>*</FontText> : null}
      </FontText>
      <View style={{ position: 'relative' }}>
        <SelectList
          placeholder={placeholder}
          setSelected={props.setSelected}
          defaultOption={props.defaultOption}
          data={props.data}
          onSelect={() => {}}
          maxHeight={windowHeight * 0.4}
          boxStyles={{ borderRadius: 0, borderWidth: 0, height: 50 }}
          dropdownStyles={{ borderTopRightRadius: 0, borderTopLeftRadius: 0, backgroundColor: theme.color.pale.red }}
          dropdownTextStyles={{ fontSize: 15, fontColor: '#000', lineHeight: 30 }}
        />
        <View
          style={{
            width: '100%',
            height: 1,
            position: 'absolute',
            top: 50,
            left: 0,
            borderBottomWidth: 1,
            borderBottomColor: theme.color.bright.red,
          }}></View>
      </View>
    </View>
  );
};

export default SelectDropdown;
