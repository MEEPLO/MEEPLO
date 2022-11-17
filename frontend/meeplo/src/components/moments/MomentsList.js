import React from 'react';
import { View, Text, Dimensions, Pressable, ImageBackground } from 'react-native';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { getMomentsList } from '../../redux/momentsSlice';
import { theme } from '../../assets/constant/DesignTheme';
import images from '../../assets/image';
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
  const [currentPage, setCurrentPage] = React.useState(0);

  const dispatch = useDispatch();
  const momentsList = useSelector(state => state.momentsList);

  const params = {
    page: 0,
    size: 15,
    leftSize: momentsList.leftSize,
    rightSize: momentsList.rightSize,
    group: null,
    writer: isMine,
  };

  const linkTo = React.useCallback(nextPage => {
    navigation.push(nextPage);
  }, []);

  React.useEffect(() => {
    dispatch(getMomentsList(params));
  }, [isMine]);

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
      {momentsList.momentsLeft.length !== 0 ? (
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
          <Pressable
            style={{
              marginTop: 40,
              marginHorizontal: '10%',
              width: '80%',
              height: 65,
              borderRadius: 15,
              borderColor: theme.color.border,
              borderWidth: 2,
              backgroundColor: theme.color.bright.yellow,
              overflow: 'hidden',
            }}
            onPress={() => linkTo('MomentsCreate')}>
            <ImageBackground style={{ borderRadius: 15 }} source={images.linkToButton.picRed} resizeMode="cover">
              <Text
                style={{
                  textAlign: 'center',
                  fontWeight: '800',
                  fontSize: 19,
                  color: theme.font.color,
                  lineHeight: 59,
                }}>
                지금 추억 만들어보기
              </Text>
            </ImageBackground>
          </Pressable>
        </View>
      )}
      {!!momentsList.momentsLeft && momentDetailId && (
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
