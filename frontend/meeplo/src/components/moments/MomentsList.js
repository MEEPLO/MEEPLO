import React from 'react';
import styled from 'styled-components';

import MomentPic from './MomentPic';

const MomentsListView = styled.View`
  flex-direction: row;
`;

const MomentsListHalf = styled.View`
  flex: 1;
`;


const moments = {
  momentsLeft: [
    {
      photo: 'https://meeplo-bucket.s3.ap-northeast-2.amazonaws.com/ourmoment221103160512.jpg',
      type: 1,
      id: 1,
    },
    {
      photo: 'https://meeplo-bucket.s3.ap-northeast-2.amazonaws.com/ourmoment221103103249.jpg',
      type: 3,
      id: 2,
    },
    {
      photo: 'https://meeplo-bucket.s3.ap-northeast-2.amazonaws.com/ourmoment221103163427.jpg',
      type: 2,
      id: 3,
    },
    {
      photo: 'https://meeplo-bucket.s3.ap-northeast-2.amazonaws.com/ourmoment221103103249.jpg',
      type: 3,
      id: 4,
    },
    {
      photo: 'https://meeplo-bucket.s3.ap-northeast-2.amazonaws.com/ourmoment221103103249.jpg',
      type: 3,
      id: 5,
    },
    {
      photo: 'https://meeplo-bucket.s3.ap-northeast-2.amazonaws.com/ourmoment221103160512.jpg',
      type: 1,
      id: 6,
    },
    {
      photo: 'https://meeplo-bucket.s3.ap-northeast-2.amazonaws.com/ourmoment221103163427.jpg',
      type: 2,
      id: 7,
    },
    {
      photo: 'https://meeplo-bucket.s3.ap-northeast-2.amazonaws.com/ourmoment221103103249.jpg',
      type: 3,
      id: 8,
    },
  ],
  momentsRight: [
    {
      photo: 'https://meeplo-bucket.s3.ap-northeast-2.amazonaws.com/ourmoment221103103249.jpg',
      type: 3,
      id: 9,
    },
    {
      photo: 'https://meeplo-bucket.s3.ap-northeast-2.amazonaws.com/ourmoment221103160512.jpg',
      type: 1,
      id: 10,
    },
    {
      photo: 'https://meeplo-bucket.s3.ap-northeast-2.amazonaws.com/ourmoment221103103249.jpg',
      type: 3,
      id: 11,
    },
    {
      photo: 'https://meeplo-bucket.s3.ap-northeast-2.amazonaws.com/ourmoment221103103249.jpg',
      type: 3,
      id: 12,
    },
    {
      photo: 'https://meeplo-bucket.s3.ap-northeast-2.amazonaws.com/ourmoment221103160512.jpg',
      type: 1,
      id: 13,
    },
    {
      photo: 'https://meeplo-bucket.s3.ap-northeast-2.amazonaws.com/ourmoment221103163427.jpg',
      type: 2,
      id: 14,
    },
  ],
};

const MomentsList = props => {
  
  const leftPics = moments.momentsLeft.map((pic) => (
    <MomentPic key={pic.id} uri={pic.photo} type={pic.type} direction="left" />
  ));

  const rightPics = moments.momentsRight.map((pic) => (
    <MomentPic key={pic.id} uri={pic.photo} type={pic.type} direction="right" />
  ));

  return (
    <MomentsListView>
      <MomentsListHalf bgColor="pink">
        {leftPics}
      </MomentsListHalf>
      <MomentsListHalf bgColor="skyblue">
        {rightPics}
      </MomentsListHalf>
    </MomentsListView>
  );
};

export default MomentsList;
