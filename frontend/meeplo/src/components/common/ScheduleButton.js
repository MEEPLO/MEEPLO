import { ImageBackground, Dimensions, View, Text } from 'react-native';
import { theme } from '../../assets/constant/DesignTheme';
import Images from '../../assets/image/index';
import FontText from './FontText';

const ScheduleButton = props => {
  const imageWidth = Dimensions.get('window').width - 40;

  if (props.picture === 'blue') {
    var picture = Images.scheduleButton.picBlue;
  } else if (props.picture === 'yellow') {
    var picture = Images.scheduleButton.picYellow;
  } else if (props.picture === 'red') {
    var picture = Images.linkToButton.picRed;
  }

  return (
    <>
      {props.isData ? (
        <View
          style={{
            marginHorizontal: 20,
            width: imageWidth,
            borderRadius: 20,
            overflow: 'hidden',
            borderColor: theme.color.border,
            borderWidth: 3,
          }}>
          <ImageBackground source={picture} style={{ width: imageWidth, height: imageWidth * 0.3 }} resizeMode="cover">
            <View style={{ marginHorizontal: 15, marginVertical: 15 }}>
              <View style={{ marginBottom: 5 }}>
                <FontText style={{ color: theme.font.color, fontWeight: 'bold', fontSize: 18 }}>
                  {props.date} <FontText> {props.place}</FontText>
                </FontText>
              </View>
              <View style={{ marginBottom: 5 }}>
                <FontText>{props.title}</FontText>
              </View>
              <View>
                <FontText>
                  {props.group} <FontText> | </FontText> {props.people}명
                </FontText>
              </View>
            </View>
          </ImageBackground>
        </View>
      ) : (
        <View
          style={{
            marginHorizontal: 20,
            width: imageWidth,
            borderRadius: 20,
            overflow: 'hidden',
            borderColor: theme.color.border,
            borderWidth: 3,
          }}>
          <ImageBackground source={picture} style={{ width: imageWidth, height: imageWidth * 0.3 }} resizeMode="cover">
            <View style={{ marginHorizontal: 15, marginVertical: 15 }}>
              <View style={{ marginBottom: 5 }}>
                <FontText
                  style={{
                    color: theme.font.color,
                    fontWeight: 'bold',
                    fontSize: 19,
                    textAlign: 'center',
                    lineHeight: imageWidth * 0.21,
                  }}>
                  {props.empty}
                </FontText>
              </View>
            </View>
          </ImageBackground>
        </View>
      )}
    </>
  );
};

export default ScheduleButton;
