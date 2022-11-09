import React, { useMemo, useState } from 'react';
import styled from 'styled-components/native';

const monthText = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

const HeaderView = styled.View`
  display: flex;
  justify-content: center;
  align-items: center;

  background-color: black;
  border-radius: 5px;
`;

const MonthLabel = styled.Text`
  padding: 2px 8px 2px 8px;
  font-weight: 400;
  color: white;
`;

const CalendarHeader = ({ date }) => {
  return (
    <HeaderView>
      <MonthLabel>{monthText[new Date(date).getMonth()]}</MonthLabel>
    </HeaderView>
  );
};

export default CalendarHeader;
