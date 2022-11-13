import React from 'react';
import { View, Text, Dimensions } from 'react-native';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { getMomentsList } from '../../redux/momentsSlice';
import { theme } from '../../assets/constant/DesignTheme';

import MomentPic from './MomentPic';
import MomentModal from './MomentModal';

const MomentsListView = styled.View`
  flex-direction: row;
`;

const MomentsListHalf = styled.View`
  flex: 1;
`;

const windowHeight = Dimensions.get('window').height;

const MomentsList = ({ navigation, isMine }) => {
  const [momentModal, setMomentModal] = React.useState(false);
  const [momentDetailId, setMomentDetailId] = React.useState();
  const [isMineFilter, setIsMineFilter] = React.useState(false);

  const dispatch = useDispatch();
  const momentsList = useSelector(state => state.momentsList);

  React.useEffect(() => {
    // dispatch(getMomentsList());
  }, []);

  console.log('momnetlsit', momentsList);

  const leftPics = momentsList.momentsLeft?.map(moment => (
    <MomentPic
      setMomentModal={setMomentModal}
      setMomentDetailId={setMomentDetailId}
      key={moment.id}
      momentData={moment}
      direction="left"
    />
  ));

  const rightPics = momentsList.momentsRight?.map(moment => (
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
      {momentsList ? (
        <MomentsListView>
          <MomentsListHalf>{leftPics}</MomentsListHalf>
          <MomentsListHalf>{rightPics}</MomentsListHalf>
        </MomentsListView>
      ) : (
        <View
          style={{
            width: '100%',
            height: windowHeight * 0.5,
            display: 'flex',
            justifyContent: 'center',
          }}>
          <Text
            style={{
              color: theme.font.color,
              fontSize: 18,
              fontWeight: '800',
              lineHeight: 30,
              textAlign: 'center',
            }}>{`아직 남긴 추억이 없어요!\n\n약속을 잡고\n추억을 남겨보세요.`}</Text>
        </View>
      )}
      {momentsList && momentDetailId && (
        <MomentModal
          navigation={navigation}
          momentDetailId={momentDetailId}
          setMomentModal={setMomentModal}
          momentModal={momentModal}
        />
      )}
    </>
  );
};

export default MomentsList;
