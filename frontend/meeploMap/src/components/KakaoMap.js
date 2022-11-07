import React, { useState, useEffect } from "react";
import { Map, MapMarker } from "react-kakao-maps-sdk";

const center = { lat: 37.50119278, lng: 127.03975728 };

let test = 1;
const KakaoMap = () => {
  const [position, setPosition] = useState({});
  const [message, setMessage] = useState("");

  useEffect(() => {
    window?.addEventListener("message", onMessageHandler);
    return () => window?.removeEventListener("message", onMessageHandler);
  }, []);

  const onMessageHandler = (e) => {
    setMessage(test++);
    // setMessage(e.data.data);
  };

  const postMessageHandler = () => {
    window?.ReactNativeWebView?.postMessage("Data from WebView / Website");
  };

  // useEffect(() => {
  //   const isUIWebView = () => {
  //     return navigator.userAgent
  //       .toLowerCase()
  //       .match(/\(ip.*applewebkit(?!.*(version|crios))/);
  //   };

  //   const receiver = isUIWebView() ? window : document;

  //   receiver.addEventListener("message", onMessageHandler);
  //   return () => {
  //     receiver.removeEventListener("message", onMessageHandler);
  //   };
  // });

  return (
    <>
      <Map
        center={center}
        style={{ width: "100%", height: "400px" }}
        onClick={(_t, mouseEvent) => {
          postMessageHandler();
          setPosition({
            lat: mouseEvent.latLng.getLat(),
            lng: mouseEvent.latLng.getLng(),
          });
        }}
      >
        <MapMarker position={center}>
          <div style={{ color: "#000" }}>Hello World!</div>
        </MapMarker>
        <MapMarker position={position} draggable={true}>
          <div>Good to see you</div>
        </MapMarker>
      </Map>
      {position?.lat} and {position?.lng}
      {message}
    </>
  );
};

export default KakaoMap;
