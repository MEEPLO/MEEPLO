import { BaseToast } from 'react-native-toast-message';
import { theme } from '../../assets/constant/DesignTheme';

export const toastConfig = {
  loginToast: props => (
    <BaseToast
      {...props}
      style={{ backgroundColor: '#FFFBEE', borderColor: theme.color.bright.yellow }}
      contentContainerStyle={{ paddingHorizontal: 15 }}
      text1Style={{
        fontSize: 20,
        fontWeight: '400',
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
        fontSize: 20,
        fontWeight: 'normal',
      }}
      text2Style={{
        color: 'gray',
        fontSize: 14,
        fontWeight: 'normal',
      }}
    />
  ),
};
