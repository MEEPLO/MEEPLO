const moments = {
  momentsLeft: [
    {
      photo: 'https://meeplo-bucket.s3.ap-northeast-2.amazonaws.com/ourmoment221107010141.png',
      type: 1,
      id: 1,
    },
    {
      photo: 'https://meeplo-bucket.s3.ap-northeast-2.amazonaws.com/ourmoment221107005349.png',
      type: 3,
      id: 2,
    },
    {
      photo: 'https://meeplo-bucket.s3.ap-northeast-2.amazonaws.com/ourmoment221107010049.png',
      type: 2,
      id: 3,
    },
    {
      photo: 'https://meeplo-bucket.s3.ap-northeast-2.amazonaws.com/ourmoment221107005349.png',
      type: 3,
      id: 4,
    },
    {
      photo: 'https://meeplo-bucket.s3.ap-northeast-2.amazonaws.com/ourmoment221107005349.png',
      type: 3,
      id: 5,
    },
    {
      photo: 'https://meeplo-bucket.s3.ap-northeast-2.amazonaws.com/ourmoment221107010141.png',
      type: 1,
      id: 6,
    },
    {
      photo: 'https://meeplo-bucket.s3.ap-northeast-2.amazonaws.com/ourmoment221107010049.png',
      type: 2,
      id: 7,
    },
    {
      photo: 'https://meeplo-bucket.s3.ap-northeast-2.amazonaws.com/ourmoment221107005349.png',
      type: 3,
      id: 8,
    },
  ],
  momentsRight: [
    {
      photo: 'https://meeplo-bucket.s3.ap-northeast-2.amazonaws.com/ourmoment221107005349.png',
      type: 3,
      id: 9,
    },
    {
      photo: 'https://meeplo-bucket.s3.ap-northeast-2.amazonaws.com/ourmoment221107010141.png',
      type: 1,
      id: 10,
    },
    {
      photo: 'https://meeplo-bucket.s3.ap-northeast-2.amazonaws.com/ourmoment221107005349.png',
      type: 3,
      id: 11,
    },
    {
      photo: 'https://meeplo-bucket.s3.ap-northeast-2.amazonaws.com/ourmoment221107005349.png',
      type: 3,
      id: 12,
    },
    {
      photo: 'https://meeplo-bucket.s3.ap-northeast-2.amazonaws.com/ourmoment221107010141.png',
      type: 1,
      id: 13,
    },
    {
      photo: 'https://meeplo-bucket.s3.ap-northeast-2.amazonaws.com/ourmoment221107010049.png',
      type: 2,
      id: 14,
    },
  ],
};

const momentData = {
  moment: {
    id: 'long',
    photoUrl: moment.photo,
    writer: 'int',
    type: moment.type,
  },
  reaction: {
    count: 'int',
    liked: 'boolean',
  },
  comments: [
    {
      comment: '????????? 2??? 3?????? ????????? ????',
      location: {
        xPoint: 0,
        yPoint: 60,
        angle: -40,
      },
    },
    {
      comment: '?????? ?????? ??????????????? ???????????? ????????? ??? ??????????????? ??? ????',
      location: {
        xPoint: 0,
        yPoint: 170,
        angle: 20,
      },
    },
    {
      comment: '????????? ?????? ??????? ?????? ????????????',
      location: {
        xPoint: 0,
        yPoint: 300,
        angle: 280,
      },
    },
    {
      comment: '?????? ?????? ??? ?????? ?????? ???????????? ?????? ????????? ????????? 8??? ?????????? ????????? ???????????? ????????????',
      location: {
        xPoint: 10,
        yPoint: 450,
        angle: -20,
      },
    },
  ],
};

const momentsSlicemomentDetail = {
  moment: {
    id: 1,
    photoUrl: 'https://meeplo-bucket.s3.ap-northeast-2.amazonaws.com/ourmoment221107010141.png',
    writer: 1,
    type: 'POLAROID',
  },
  moment: {
    id: 9,
    photoUrl: 'https://meeplo-bucket.s3.ap-northeast-2.amazonaws.com/ourmoment221107005349.png',
    writer: 2,
    type: 'FOURCUT',
  },
  moment: {
    id: 3,
    photoUrl: 'https://meeplo-bucket.s3.ap-northeast-2.amazonaws.com/ourmoment221107010049.png',
    writer: 1,
    type: 'DAYFILM',
  },
  reaction: {
    count: 2,
    liked: true,
  },
  comments: [
    {
      comment: '????????? 2??? 3?????? ????????? ????',
      location: {
        xPoint: 0,
        yPoint: 60,
        angle: -40,
      },
    },
    {
      comment: '?????? ?????? ??????????????? ???????????? ????????? ??? ??????????????? ??? ????',
      location: {
        xPoint: 0,
        yPoint: 170,
        angle: 20,
      },
    },
  ],
};

const momentsList = {
  momentsLeft: [
    {
      photo: 'https://meeplo-bucket.s3.ap-northeast-2.amazonaws.com/ourmoment221107010141.png',
      type: 0,
      id: 1,
      reactionCount: 2,
    },
    {
      photo: 'https://meeplo-bucket.s3.ap-northeast-2.amazonaws.com/ourmoment221107010049.png',
      type: 1,
      id: 3,
      reactionCount: 3,
    },
    {
      photo: 'https://meeplo-bucket.s3.ap-northeast-2.amazonaws.com/ourmoment221107010141.png',
      type: 0,
      id: 10,
      reactionCount: 0,
    },
    {
      photo: 'https://meeplo-bucket.s3.ap-northeast-2.amazonaws.com/ourmoment221107005349.png',
      type: 2,
      id: 7,
      reactionCount: 3,
    },
  ],
  momentsRight: [
    {
      photo: 'https://meeplo-bucket.s3.ap-northeast-2.amazonaws.com/ourmoment221107005349.png',
      type: 2,
      id: 9,
      reactionCount: 3,
    },
    {
      photo: 'https://meeplo-bucket.s3.ap-northeast-2.amazonaws.com/ourmoment221107010049.png',
      type: 1,
      id: 4,
      reactionCount: 3,
    },
    {
      photo: 'https://meeplo-bucket.s3.ap-northeast-2.amazonaws.com/ourmoment221107010141.png',
      type: 0,
      id: 6,
      reactionCount: 0,
    },
  ],
};
