import React, { useState, useEffect } from "react";
import { Map, MapMarker } from "react-kakao-maps-sdk";
import { createMessage, MESSAGE_TYPE } from "../helper/message";

const KakaoMap = () => {
  const [state, setState] = useState({
    center: { lat: 37.50119278, lng: 127.03975728 },
    isPanto: false,
  });

  useEffect(() => {
    const isAndroid = () => {
      return navigator?.userAgent?.toLowerCase()?.indexOf("android") > -1;
    };

    const target = isAndroid() ? document : window;

    target.addEventListener("message", onMessage);
    return () => {
      target.removeEventListener("message", onMessage);
    };
  }, []);

  const onMessage = (e) => {
    console.log("recevied from app", e.data);
  };

  const postMessage = (msg) => {
    ReactNativeWebView?.postMessage(msg);
  };

  const onClickHandler = (_t, mouseEvent) => {
    const clickedPosition = {
      lat: mouseEvent.latLng.getLat(),
      lng: mouseEvent.latLng.getLng(),
    };

    postMessage(
      createMessage(MESSAGE_TYPE.UPDATE_CENTER, {
        position: clickedPosition,
      })
    );

    setState({
      center: clickedPosition,
      isPanto: true,
    });
  };

  const onZoomChangedHandler = (target) => {
    postMessage(
      createMessage(MESSAGE_TYPE.UPDATE_ZOOM_LEVEL, {
        level: target.getLevel(),
      })
    );
  };

  return (
    <>
      <Map
        center={state.center}
        isPanto={state.isPanto}
        style={{ width: "100%", height: "400px" }}
        onClick={onClickHandler}
        onZoomChanged={onZoomChangedHandler}
      >
        <MapMarker position={state.center}>
          <div style={{ color: "#000" }}>중심</div>
        </MapMarker>
      </Map>
    </>
  );
};

export default KakaoMap;
