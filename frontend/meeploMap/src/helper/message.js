const MESSAGE_TYPE = {
  INIT_MAP: 100,
  INIT_MAP_HEIGHT: 101,

  UPDATE_APP_CENTER: 110,
  UPDATE_WEBVIEW_CENTER: 111,
  UPDATE_ZOOM_LEVEL: 112,

  UPDATE_NEAR_LOCATIONS: 200,
  SELECT_NEAR_LOCATION: 201,
  SELECT_STATION: 210,
  UPDATE_RECOMMENDED_STATIONS: 211,
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
