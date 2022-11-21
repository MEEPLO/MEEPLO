import React from 'react';
import { View, Text, Dimensions, Pressable, ImageBackground } from 'react-native';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { getMomentsList } from '../../redux/momentsSlice';
import AutoHeightImage from 'react-native-auto-height-image';
import { theme } from '../../assets/constant/DesignTheme';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons/faHeart';
import images from '../../assets/image';
import MomentModal from './MomentModal';

const MomentsListView = styled.View`
  flex-direction: row;
`;

const MomentsListHalf = styled.View`
  flex: 1;
`;

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;
var imgWidth = windowWidth * 0.5 - 30;

const MomentsList = ({ navigation, isMine, currentPage }) => {
  const [momentModal, setMomentModal] = React.useState(false);
  const [momentDetailId, setMomentDetailId] = React.useState();

  const dispatch = useDispatch();
  const momentsList = useSelector(state => state.momentsList);

  const viewHeight = {
    0: imgWidth * 1.17,
    1: imgWidth * 0.8,
    2: imgWidth * 3.61,
  };

  // console.log(currentPage);

  const params = {
    page: 0,
    size: 1000,
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

  const openDetailModel = id => {
    setMomentModal(true);
    setMomentDetailId(id);
  };

  return (
    <>
      {momentsList.momentsLeft.length !== 0 ? (
        <MomentsListView>
          <MomentsListHalf>
            {momentsList.momentsLeft?.map((moment, index) => (
              <View
                style={{
                  paddingLeft: 20,
                  marginBottom: 25,
                  height: viewHeight[moment.type],
                  display: index <= (currentPage + 1) * 6 - 1 ? 'flex' : 'none',
                }}>
                <Pressable style={{ width: '80%', position: 'relative' }} onPress={() => openDetailModel(moment.id)}>
                  <AutoHeightImage
                    source={{ uri: moment.photo }}
                    width={imgWidth}
                    style={{
                      borderRadius: 5,
                      borderWidth: moment.type === 2 ? 0 : 2,
                      borderColor: theme.color.disabled,
                    }}
                  />
                  <Text
                    style={{
                      position: 'absolute',
                      right: -10,
                      fontSize: 14,
                      top: moment.type === 1 ? 3 : null,
                      bottom: moment.type === 1 ? null : 10,
                      color: moment.type === 2 ? '#fff' : '#000',
                    }}>
                    <FontAwesomeIcon icon={faHeart} color={theme.color.alert} size={13} />
                    {`  `}
                    {moment.reactionCount}
                  </Text>
                </Pressable>
              </View>
            ))}
          </MomentsListHalf>
          <MomentsListHalf>
            {momentsList.momentsRight?.map((moment, index) => (
              <View
                style={{
                  paddingLeft: 20,
                  marginBottom: 25,
                  height: viewHeight[moment.type],
                  display: index <= (currentPage + 1) * 6 - 1 ? 'flex' : 'none',
                }}>
                <Pressable style={{ width: '80%', position: 'relative' }} onPress={() => openDetailModel(moment.id)}>
                  <AutoHeightImage
                    source={{ uri: moment.photo }}
                    width={imgWidth}
                    style={{
                      borderRadius: 5,
                      borderWidth: moment.type === 2 ? 0 : 2,
                      borderColor: theme.color.disabled,
                    }}
                  />
                  <Text
                    style={{
                      position: 'absolute',
                      right: -10,
                      fontSize: 14,
                      top: moment.type === 1 ? 3 : null,
                      bottom: moment.type === 1 ? null : 10,
                      color: moment.type === 2 ? '#fff' : '#000',
                    }}>
                    <FontAwesomeIcon icon={faHeart} color={theme.color.alert} size={13} />
                    {`  `}
                    {moment.reactionCount}
                  </Text>
                </Pressable>
              </View>
            ))}
          </MomentsListHalf>
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
              fontWeight: 'bold',
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
                  fontWeight: 'bold',
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
