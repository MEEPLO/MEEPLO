import React from 'react';
import { View, Text } from 'react-native';
import { theme } from '../../assets/constant/DesignTheme';
import DatePicker from 'react-native-date-picker';
import FontText from './FontText';

const StepDateInput = props => {
  const [date, setDate] = React.useState(new Date());
  const [openModal, setOpenModal] = React.useState(false);

  return (
    <>
      <FontText style={{ color: theme.font.color, fontWeight: 'bold' }}>
        {props.type} {props.required ? <FontText style={{ color: theme.color.alert }}>*</FontText> : null}
      </FontText>
      <View
        style={{
          width: '100%',
          height: 60,
          borderBottomColor: theme.color.disabled,
          borderBottomWidth: 1,
        }}>
        <FontText style={{ lineHeight: 70, marginLeft: 10, color: 'gray' }} onPress={() => setOpenModal(true)}>
          {date ? date.toLocaleDateString('ko-KR') : null}
        </FontText>
      </View>
      <DatePicker
        modal
        locale="ko"
        open={openModal}
        date={date}
        format="YYYY.MM.DD"
        onConfirm={date => {
          setOpenModal(false);
          setDate(date);
        }}
        onCancel={() => {
          setOpenModal(false);
        }}
        onDateChange={setDate}
      />
    </>
  );
};

export default StepDateInput;
