import noneMarkerPink from '../../assets/marker_none_pink.png';
import noneMarkerOrange from '../../assets/marker_none_orange.png';
import noneMarkerYellow from '../../assets/marker_none_yellow.png';
import noneMarkerGreen from '../../assets/marker_none_green.png';
import noneMarkerBlue from '../../assets/marker_none_blue.png';
import noneMarkerNavy from '../../assets/marker_none_navy.png';
import noneMarkerPurple from '../../assets/marker_none_purple.png';
import noneMarkerRed from '../../assets/marker_none_red.png';

import stationMarkerPink from '../../assets/marker_station_pink.png';
import stationMarkerOrange from '../../assets/marker_station_orange.png';
import stationMarkerYellow from '../../assets/marker_station_yellow.png';
import stationMarkerGreen from '../../assets/marker_station_green.png';
import stationMarkerBlue from '../../assets/marker_station_blue.png';
import stationMarkerNavy from '../../assets/marker_station_navy.png';
import stationMarkerPurple from '../../assets/marker_station_purple.png';
import stationMarkerRed from '../../assets/marker_station_red.png';

import storeMarkerPink from '../../assets/marker_store_pink.png';
import storeMarkerOrange from '../../assets/marker_store_orange.png';
import storeMarkerYellow from '../../assets/marker_store_yellow.png';
import storeMarkerGreen from '../../assets/marker_store_green.png';
import storeMarkerBlue from '../../assets/marker_store_blue.png';
import storeMarkerNavy from '../../assets/marker_store_navy.png';
import storeMarkerPurple from '../../assets/marker_store_purple.png';
import storeMarkerRed from '../../assets/marker_store_red.png';

import userMarkerPink from '../../assets/marker_user_pink.png';
import userMarkerOrange from '../../assets/marker_user_orange.png';
import userMarkerYellow from '../../assets/marker_user_yellow.png';
import userMarkerGreen from '../../assets/marker_user_green.png';
import userMarkerBlue from '../../assets/marker_user_blue.png';
import userMarkerNavy from '../../assets/marker_user_navy.png';
import userMarkerPurple from '../../assets/marker_user_purple.png';
import userMarkerRed from '../../assets/marker_user_red.png';

export const MARKER_TYPE = {
  NONE: 'none',
  STATION: 'station',
  STORE: 'store',
  USER: 'user',
};

export const MARKER_COLOR = {
  PINK: 'pink',
  ORANGE: 'orange',
  YELLOW: 'yellow',
  GREEN: 'green',
  BLUE: 'blue',
  NAVY: 'navy',
  PURPLE: 'purple',
  RED: 'red',
};

const markers = {
  [MARKER_TYPE.NONE]: {
    [MARKER_COLOR.PINK]: noneMarkerPink,
    [MARKER_COLOR.ORANGE]: noneMarkerOrange,
    [MARKER_COLOR.YELLOW]: noneMarkerYellow,
    [MARKER_COLOR.GREEN]: noneMarkerGreen,
    [MARKER_COLOR.BLUE]: noneMarkerBlue,
    [MARKER_COLOR.NAVY]: noneMarkerNavy,
    [MARKER_COLOR.PURPLE]: noneMarkerPurple,
    [MARKER_COLOR.RED]: noneMarkerRed,
  },
  [MARKER_TYPE.STATION]: {
    [MARKER_COLOR.PINK]: stationMarkerPink,
    [MARKER_COLOR.ORANGE]: stationMarkerOrange,
    [MARKER_COLOR.YELLOW]: stationMarkerYellow,
    [MARKER_COLOR.GREEN]: stationMarkerGreen,
    [MARKER_COLOR.BLUE]: stationMarkerBlue,
    [MARKER_COLOR.NAVY]: stationMarkerNavy,
    [MARKER_COLOR.PURPLE]: stationMarkerPurple,
    [MARKER_COLOR.RED]: stationMarkerRed,
  },
  [MARKER_TYPE.STORE]: {
    [MARKER_COLOR.PINK]: storeMarkerPink,
    [MARKER_COLOR.ORANGE]: storeMarkerOrange,
    [MARKER_COLOR.YELLOW]: storeMarkerYellow,
    [MARKER_COLOR.GREEN]: storeMarkerGreen,
    [MARKER_COLOR.BLUE]: storeMarkerBlue,
    [MARKER_COLOR.NAVY]: storeMarkerNavy,
    [MARKER_COLOR.PURPLE]: storeMarkerPurple,
    [MARKER_COLOR.RED]: storeMarkerRed,
  },
  [MARKER_TYPE.USER]: {
    [MARKER_COLOR.PINK]: userMarkerPink,
    [MARKER_COLOR.ORANGE]: userMarkerOrange,
    [MARKER_COLOR.YELLOW]: userMarkerYellow,
    [MARKER_COLOR.GREEN]: userMarkerGreen,
    [MARKER_COLOR.BLUE]: userMarkerBlue,
    [MARKER_COLOR.NAVY]: userMarkerNavy,
    [MARKER_COLOR.PURPLE]: userMarkerPurple,
    [MARKER_COLOR.RED]: userMarkerRed,
  },
};

export const getMarker = (type, color) => {
  return {
    src: markers[type][color],
    size: { width: 32, height: 39 },
    options: { offset: { x: 16, y: 39 } },
  };
};
