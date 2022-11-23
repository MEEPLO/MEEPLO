import { BaseToast } from 'react-native-toast-message';
import { theme } from '../../assets/constant/DesignTheme';

export const toastConfig = {
  loginToast: props => (
    <BaseToast
      {...props}
      style={{ backgroundColor: '#FFFBEE', borderColor: theme.color.bright.yellow }}
      contentContainerStyle={{ paddingHorizontal: 15 }}
      text1Style={{
        fontSize: 16,
        fontFamily: 'NanumSquareRoundB',
      }}
    />
  ),
  welcomeToast: props => (
    <BaseToast
      {...props}
      style={{ backgroundColor: '#FFF', borderColor: theme.color.bright.green }}
      contentContainerStyle={{ paddingHorizontal: 15 }}
      text1Style={{
        color: 'black',
        fontSize: 16,
        fontFamily: 'NanumSquareRoundB',
      }}
      text2Style={{
        color: 'gray',
        fontSize: 10,
        fontFamily: 'NanumSquareRoundR',
      }}
    />
  ),
};
