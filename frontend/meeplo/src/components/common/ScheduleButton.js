import { ImageBackground, Dimensions, View, Text } from 'react-native';
import { theme } from '../../assets/constant/DesignTheme';
import Images from '../../assets/image/index';

const ScheduleButton = props => {
  const imageWidth = Dimensions.get('window').width - 40;

  if (props.picture === 'blue') {
    var picture = Images.scheduleButton.picBlue;
  } else if (props.picture === 'yellow') {
    var picture = Images.scheduleButton.picYellow;
  }
  return (
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
            <Text style={{ color: theme.font.color, fontWeight: '800', fontSize: 18 }}>
              {props.date} <Text> {props.place}</Text>
            </Text>
          </View>
          <View style={{ marginBottom: 5 }}>
            <Text>{props.title}</Text>
          </View>
          <View>
            <Text>
              아직20대초딩들 <Text> | </Text> {props.people}명
            </Text>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};

export default ScheduleButton;
