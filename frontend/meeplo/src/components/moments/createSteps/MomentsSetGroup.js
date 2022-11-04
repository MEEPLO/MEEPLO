import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { TextField, FilledTextField, OutlinedTextField } from 'rn-material-ui-textfield';
import { theme } from '../../../assets/constant/DesignTheme';
import SelectList from 'react-native-dropdown-select-list';
import MomentsSetFrame from './MomentsSetFrame';
const MomentsSetGroup = () => {
  const [selected, setSelected] = React.useState('');

  const windowHeight = Dimensions.get('window').height;

  const data = [
    { key: '1', value: '장한나와 아이들' },
    { key: '2', value: 'SSAFY 7기 A508 갓자율' },
    { key: '3', value: '그룹명은최대이십자입니다이길이가딱이십자' },
    { key: '4', value: '청춘은 바로 지금부터~' },
    { key: '5', value: '청춘은 바로 지금부터~' },
    { key: '6', value: '청춘은 바로 지금부터~' },
    { key: '7', value: '청춘은 바로 지금부터~' },
    { key: '8', value: '청춘은 바로 지금부터~' },
    { key: '9', value: '청춘은 바로 지금부터~' },
    { key: '10', value: '청춘은 바로 지금부터~' },
    { key: '11', value: '청춘은 바로 지금부터~' },
    { key: '12', value: '청춘은 바로 지금부터~' },
    { key: '13', value: '청춘은 바로 지금부터~' },
    { key: '14', value: '청춘은 바로 지금부터~' },
    { key: '15', value: '청춘은 바로 지금부터~' },
    { key: '16', value: '청춘은 바로 지금부터~' },
    { key: '17', value: '청춘은 바로 지금부터~' },
  ];
  return (
    <View style={{ marginHorizontal: 40 }}>
      <Text>step1</Text>
      <OutlinedTextField tintColor={theme.color.bright.red} lineWidth={3} containerStyle={{ backgroundColor: "#a9f295"}} />
      <View style={{borderBottomWidth: 1, borderBottomColor: theme.color.bright.red }}>
        <SelectList
          placeholder=""
          setSelected={setSelected}
          data={data}
          onSelect={() => alert(selected)}
          maxHeight={windowHeight * 0.4}
          boxStyles={{ borderRadius: 0, borderWidth: 0 }}
          dropdownStyles={{ borderTopRightRadius: 0, borderTopLeftRadius: 0, backgroundColor: theme.color.pale.red }}
          dropdownTextStyles={{ fontSize: 15, fontColor: "#000", lineHeight: 30 }}
        />
      </View>
      <MomentsSetFrame />
      <Text>엥??ㅇ</Text>
    </View>
  );
};

export default MomentsSetGroup;
