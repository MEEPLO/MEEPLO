const MESSAGE_TYPE = {
  INIT_MAP: 101,

  UPDATE_CENTER: 111,
  UPDATE_ZOOM_LEVEL: 112,

  SEND_NEAR_LOCATIONS: 201,
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
