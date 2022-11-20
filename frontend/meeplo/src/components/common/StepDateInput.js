import React from 'react';
import { View, Text } from 'react-native';
import { theme } from '../../assets/constant/DesignTheme';
import DatePicker from 'react-native-date-picker';

const StepDateInput = props => {
  const [date, setDate] = React.useState(new Date());
  const [openModal, setOpenModal] = React.useState(false);

  return (
    <>
      <Text style={{ color: theme.font.color, fontWeight: 'bold' }}>
        {props.type} {props.required ? <Text style={{ color: theme.color.alert }}>*</Text> : null}
      </Text>
      <View
        style={{
          width: '100%',
          height: 60,
          borderBottomColor: theme.color.disabled,
          borderBottomWidth: 1,
        }}>
        <Text style={{ lineHeight: 70, marginLeft: 10, color: 'gray' }} onPress={() => setOpenModal(true)}>
          {date ? date.toLocaleDateString('ko-KR') : null}
        </Text>
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
