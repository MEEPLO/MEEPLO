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
};
