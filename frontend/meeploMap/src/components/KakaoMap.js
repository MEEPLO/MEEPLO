import React, { useState, useEffect } from 'react';
import { Map, MapMarker } from 'react-kakao-maps-sdk';
import { createMessage, MESSAGE_TYPE } from '../helper/message';

const KakaoMap = () => {
  const [test, setTest] = useState('검색바 업데이트');
  const [state, setState] = useState({
    center: { lat: 37.50119278, lng: 127.03975728 },
    level: 3,
    isPanto: false,
  });

  useEffect(() => {
    const isAndroid = () => {
      return navigator?.userAgent?.toLowerCase()?.indexOf('android') > -1;
    };

    postMessage(
      createMessage(MESSAGE_TYPE.INIT_MAP, {
        center: state.center,
        level: state.level,
      }),
    );

    const target = isAndroid() ? document : window;
    target.addEventListener('message', onMessage);
    return () => {
      target.removeEventListener('message', onMessage);
    };
  }, []);

  const onMessage = e => {
    console.log('recevied from app', e.data);
    setTest(e.data);
  };

  const postMessage = msg => {
    if (typeof ReactNativeWebView !== 'undefined') {
      ReactNativeWebView?.postMessage(msg);
    }
  };

  const onClickHandler = (_t, mouseEvent) => {
    const clickedPosition = {
      lat: mouseEvent.latLng.getLat(),
      lng: mouseEvent.latLng.getLng(),
    };

    postMessage(
      createMessage(MESSAGE_TYPE.UPDATE_CENTER, {
        center: clickedPosition,
      }),
    );

    setState({
      center: clickedPosition,
      isPanto: true,
    });
  };

  const onZoomChangedHandler = target => {
    postMessage(
      createMessage(MESSAGE_TYPE.UPDATE_ZOOM_LEVEL, {
        level: target.getLevel(),
      }),
    );
  };

  const onDragEnd = map => {
    postMessage(
      createMessage(MESSAGE_TYPE.UPDATE_CENTER, {
        position: {
          lat: map.getCenter().getLat(),
          lng: map.getCenter().getLng(),
        },
      }),
    );
  };

  return (
    <>
      <Map
        center={state.center}
        level={state.level}
        isPanto={state.isPanto}
        style={{ width: '100%', height: '1024px' }}
        onClick={onClickHandler}
        onZoomChanged={onZoomChangedHandler}
        onDragEnd={onDragEnd}>
        <MapMarker position={state.center}>
          <div style={{ color: '#000' }}>{test}</div>
        </MapMarker>
      </Map>
    </>
  );
};

export default KakaoMap;
