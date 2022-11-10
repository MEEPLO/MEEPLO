import { View, Text } from 'react-native';
import { MaterialTabBar, MaterialTabItem, MaterialTabItemProps } from 'react-native-collapsible-tab-view';
import { theme } from '../../assets/constant/DesignTheme';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faCameraRetro } from '@fortawesome/free-solid-svg-icons/faCameraRetro';
import { faCalendarCheck } from '@fortawesome/free-solid-svg-icons/faCalendarCheck';

export const renderTabBar = props => {
  // const focusedTab = props.focusedTab.value;
  // const { tabProps, tabNames } = props;

  return (
    <MaterialTabBar
      {...props}
      inactiveColor="blue"
      indicatorStyle={{
        backgroundColor: theme.color.bright.yellow,
        height: 10,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: theme.color.bright.yellow,
      }}
    />
  );
};

export const renderScheduleLabel = props => {
  return <FontAwesomeIcon icon={faCalendarCheck} size={20} color={theme.color.border} />;
};

export const renderMomentsLabel = props => {
  return <FontAwesomeIcon icon={faCameraRetro} size={20} color={theme.color.border} />;
};
