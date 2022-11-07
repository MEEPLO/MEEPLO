import React from 'react';
import { View } from 'react-native';
import SelectDropdown from '../../common/SelectDropdown';

const MomentsSetGroup = () => {
  // const [selected, setSelected] = React.useState('');

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
    <View>
      <SelectDropdown type="모임" data={data} required={true} />
    </View>
  );
};

export default MomentsSetGroup;
