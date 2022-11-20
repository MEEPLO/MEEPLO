const MESSAGE_TYPE = {
  INIT_MAP: 100,
  INIT_MAP_HEIGHT: 101,

  UPDATE_APP_CENTER: 110,
  UPDATE_WEBVIEW_CENTER: 111,
  UPDATE_ZOOM_LEVEL: 112,

  UPDATE_NEAR_LOCATIONS: 200,
  SELECT_NEAR_LOCATION: 201,
  UPDATE_RECOMMENDED_STATIONS: 210,
  SELECT_RECOMMENDED_STATION: 211,

  UPDATE_SEARCHED_STATIONS: 220,
  SELECT_SEARCHED_STATION: 221,

  UPDATE_RECOMMENDED_AMUSES: 230,
  SELECT_RECOMMENDED_AMUSE: 231,
};

// 메시지 객체 예시
// {
//   messageType : 111,
//   messageBody: {
//     lat: 37.50119278,
//     lng: 127.03975728
//   }
// }

const createMessage = (messageType, messageBody) => {
  return JSON.stringify({
    messageType: messageType,
    messageBody: messageBody,
  });
};

const parseMessage = message => {
  return JSON.parse(message);
};

export { createMessage, parseMessage, MESSAGE_TYPE };
