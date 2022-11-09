import React from 'react';
import { View } from 'react-native';
import styled from 'styled-components';
import { useSelector } from 'react-redux';

import MomentPic from './MomentPic';
import MomentModal from './MomentModal';

const MomentsListView = styled.View`
  flex-direction: row;
`;

const MomentsListHalf = styled.View`
  flex: 1;
`;

const MomentsList = ({ navigation }) => {
  const momentsList = useSelector(state => state.momentsList);

  const [momentModal, setMomentModal] = React.useState(false);
  const [momentId, setMomentId] = React.useState(1);

  const leftPics = momentsList.momentsLeft.map(moment => (
    <MomentPic
      setMomentModal={setMomentModal}
      setMomentId={setMomentId}
      key={moment.id}
      moment={moment}
      direction="left"
    />
  ));

  const rightPics = momentsList.momentsRight.map(moment => (
    <MomentPic
      setMomentModal={setMomentModal}
      setMomentId={setMomentId}
      key={moment.id}
      moment={moment}
      direction="right"
    />
  ));

  return (
    <>
      <MomentsListView>
        <MomentsListHalf bgColor="pink">{leftPics}</MomentsListHalf>
        <MomentsListHalf bgColor="skyblue">{rightPics}</MomentsListHalf>
      </MomentsListView>

      <MomentModal
        navigation={navigation}
        momentId={momentId}
        setMomentModal={setMomentModal}
        momentModal={momentModal}
      />
    </>
  );
};

export default MomentsList;
