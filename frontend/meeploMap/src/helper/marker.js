import MarkerNoneAlert from "../../assets/marker_none_alert.png";
import MarkerNoneOrange from "../../assets/marker_none_orange.png";
import MarkerNoneYellow from "../../assets/marker_none_yellow.png";
import MarkerNoneGreen from "../../assets/marker_none_green.png";
import MarkerNoneBlue from "../../assets/marker_none_blue.png";
import MarkerNoneNavy from "../../assets/marker_none_navy.png";
import MarkerNonePurple from "../../assets/marker_none_purple.png";
import MarkerNoneRed from "../../assets/marker_none_red.png";

import MarkerStationAlert from "../../assets/marker_station_alert.png";
import MarkerStationOrange from "../../assets/marker_station_orange.png";
import MarkerStationYellow from "../../assets/marker_station_yellow.png";
import MarkerStationGreen from "../../assets/marker_station_green.png";
import MarkerStationBlue from "../../assets/marker_station_blue.png";
import MarkerStationNavy from "../../assets/marker_station_navy.png";
import MarkerStationPurple from "../../assets/marker_station_purple.png";
import MarkerStationRed from "../../assets/marker_station_red.png";

import MarkerStoreAlert from "../../assets/marker_store_alert.png";
import MarkerStoreOrange from "../../assets/marker_store_orange.png";
import MarkerStoreYellow from "../../assets/marker_store_yellow.png";
import MarkerStoreGreen from "../../assets/marker_store_green.png";
import MarkerStoreBlue from "../../assets/marker_store_blue.png";
import MarkerStoreNavy from "../../assets/marker_store_navy.png";
import MarkerStorePurple from "../../assets/marker_store_purple.png";
import MarkerStoreRed from "../../assets/marker_store_red.png";

import MarkerUserAlert from "../../assets/marker_user_alert.png";
import MarkerUserOrange from "../../assets/marker_user_orange.png";
import MarkerUserYellow from "../../assets/marker_user_yellow.png";
import MarkerUserGreen from "../../assets/marker_user_green.png";
import MarkerUserBlue from "../../assets/marker_user_blue.png";
import MarkerUserNavy from "../../assets/marker_user_navy.png";
import MarkerUserPurple from "../../assets/marker_user_purple.png";
import MarkerUserRed from "../../assets/marker_user_red.png";

import MarkerHereAlert from "../../assets/marker_here_alert.png";
import MarkerHereOrange from "../../assets/marker_here_orange.png";
import MarkerHereYellow from "../../assets/marker_here_yellow.png";
import MarkerHereGreen from "../../assets/marker_here_green.png";
import MarkerHereBlue from "../../assets/marker_here_blue.png";
import MarkerHereNavy from "../../assets/marker_here_navy.png";
import MarkerHerePurple from "../../assets/marker_here_purple.png";
import MarkerHereRed from "../../assets/marker_here_red.png";

export const MARKER_TYPE = {
  NONE: "none",
  STATION: "station",
  STORE: "store",
  USER: "user",
  HERE: "here",
};

export const MARKER_COLOR = {
  ALERT: "alert",
  ORANGE: "orange",
  YELLOW: "yellow",
  GREEN: "green",
  BLUE: "blue",
  NAVY: "navy",
  PURPLE: "purple",
  RED: "red",
};

const markers = {
  [MARKER_TYPE.NONE]: {
    [MARKER_COLOR.ALERT]: MarkerNoneAlert,
    [MARKER_COLOR.ORANGE]: MarkerNoneOrange,
    [MARKER_COLOR.YELLOW]: MarkerNoneYellow,
    [MARKER_COLOR.GREEN]: MarkerNoneGreen,
    [MARKER_COLOR.BLUE]: MarkerNoneBlue,
    [MARKER_COLOR.NAVY]: MarkerNoneNavy,
    [MARKER_COLOR.PURPLE]: MarkerNonePurple,
    [MARKER_COLOR.RED]: MarkerNoneRed,
  },
  [MARKER_TYPE.STATION]: {
    [MARKER_COLOR.ALERT]: MarkerStationAlert,
    [MARKER_COLOR.ORANGE]: MarkerStationOrange,
    [MARKER_COLOR.YELLOW]: MarkerStationYellow,
    [MARKER_COLOR.GREEN]: MarkerStationGreen,
    [MARKER_COLOR.BLUE]: MarkerStationBlue,
    [MARKER_COLOR.NAVY]: MarkerStationNavy,
    [MARKER_COLOR.PURPLE]: MarkerStationPurple,
    [MARKER_COLOR.RED]: MarkerStationRed,
  },
  [MARKER_TYPE.STORE]: {
    [MARKER_COLOR.ALERT]: MarkerStoreAlert,
    [MARKER_COLOR.ORANGE]: MarkerStoreOrange,
    [MARKER_COLOR.YELLOW]: MarkerStoreYellow,
    [MARKER_COLOR.GREEN]: MarkerStoreGreen,
    [MARKER_COLOR.BLUE]: MarkerStoreBlue,
    [MARKER_COLOR.NAVY]: MarkerStoreNavy,
    [MARKER_COLOR.PURPLE]: MarkerStorePurple,
    [MARKER_COLOR.RED]: MarkerStoreRed,
  },
  [MARKER_TYPE.USER]: {
    [MARKER_COLOR.ALERT]: MarkerUserAlert,
    [MARKER_COLOR.ORANGE]: MarkerUserOrange,
    [MARKER_COLOR.YELLOW]: MarkerUserYellow,
    [MARKER_COLOR.GREEN]: MarkerUserGreen,
    [MARKER_COLOR.BLUE]: MarkerUserBlue,
    [MARKER_COLOR.NAVY]: MarkerUserNavy,
    [MARKER_COLOR.PURPLE]: MarkerUserPurple,
    [MARKER_COLOR.RED]: MarkerUserRed,
  },
  [MARKER_TYPE.HERE]: {
    [MARKER_COLOR.ALERT]: MarkerHereAlert,
    [MARKER_COLOR.ORANGE]: MarkerHereOrange,
    [MARKER_COLOR.YELLOW]: MarkerHereYellow,
    [MARKER_COLOR.GREEN]: MarkerHereGreen,
    [MARKER_COLOR.BLUE]: MarkerHereBlue,
    [MARKER_COLOR.NAVY]: MarkerHereNavy,
    [MARKER_COLOR.PURPLE]: MarkerHerePurple,
    [MARKER_COLOR.RED]: MarkerHereRed,
  },
};

export const getMarker = (type, color) => {
  return {
    src: markers[type][color],
    size: { width: 32, height: 39 },
    options: { offset: { x: 16, y: 39 } },
  };
};
