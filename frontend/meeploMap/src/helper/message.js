const MESSAGE_TYPE = {
  UPDATE_CENTER: 101,
  UPDATE_ZOOM_LEVEL: 102,

  SEND_NEAR_LOCATIONS: 201,
};

const createMessage = (messageType, message) => {
  return JSON.stringify({
    messageType: messageType,
    message: message,
  });
};

const parseMessage = (message) => {
  return JSON.parse(message);
};

export { createMessage, parseMessage, MESSAGE_TYPE };
