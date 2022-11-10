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

const momentsList = {
  momentsLeft: [
    {
      photo: 'https://meeplo-bucket.s3.ap-northeast-2.amazonaws.com/ourmoment221107010141.png',
      type: 'POLAROID',
      id: 1,
      reactionCount: 2,
    },
    {
      photo: 'https://meeplo-bucket.s3.ap-northeast-2.amazonaws.com/ourmoment221107010049.png',
      type: 'DAYFILM',
      id: 3,
      reactionCount: 3,
    },
    {
      photo: 'https://meeplo-bucket.s3.ap-northeast-2.amazonaws.com/ourmoment221107010141.png',
      type: 'POLAROID',
      id: 10,
      reactionCount: 0,
    },
    {
      photo: 'https://meeplo-bucket.s3.ap-northeast-2.amazonaws.com/ourmoment221107005349.png',
      type: 'FOURCUT',
      id: 7,
      reactionCount: 3,
    },
  ],
  momentsRight: [
    {
      photo: 'https://meeplo-bucket.s3.ap-northeast-2.amazonaws.com/ourmoment221107005349.png',
      type: 'FOURCUT',
      id: 9,
      reactionCount: 3,
    },
    {
      photo: 'https://meeplo-bucket.s3.ap-northeast-2.amazonaws.com/ourmoment221107010049.png',
      type: 'DAYFILM',
      id: 4,
      reactionCount: 3,
    },
    {
      photo: 'https://meeplo-bucket.s3.ap-northeast-2.amazonaws.com/ourmoment221107010141.png',
      type: 'POLAROID',
      id: 6,
      reactionCount: 0,
    },
  ],
};

const MomentsList = ({ navigation, isMine }) => {
  // const momentsList = useSelector(state => state.momentsList);

  const [momentModal, setMomentModal] = React.useState(false);
  const [momentDetailId, setMomentDetailId] = React.useState(6);
  const [isMineFilter, setIsMineFilter] = React.useState(false);

  const leftPics = momentsList.momentsLeft.map(moment =>
    isMine ? (
      <MomentPic
        setMomentModal={setMomentModal}
        setMomentDetailId={setMomentDetailId}
        key={moment.id}
        momentData={moment}
        direction="left"
      />
    ) : null,
  );

  const rightPics = momentsList.momentsRight.map(moment => (
    <MomentPic
      setMomentModal={setMomentModal}
      setMomentDetailId={setMomentDetailId}
      key={moment.id}
      momentData={moment}
      direction="right"
    />
  ));

  return (
    <>
      <MomentsListView>
        <MomentsListHalf>{leftPics}</MomentsListHalf>
        <MomentsListHalf>{rightPics}</MomentsListHalf>
      </MomentsListView>

      <MomentModal
        navigation={navigation}
        momentDetailId={momentDetailId}
        setMomentModal={setMomentModal}
        momentModal={momentModal}
      />
    </>
  );
};

export default MomentsList;
