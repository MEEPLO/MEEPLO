import React, { useRef } from 'react';
import LottieView from 'lottie-react-native';

const AnimationDownload = () => {
  const commentLottieRef = useRef();

  React.useEffect(() => {
    commentLottieRef.current?.play(0, 80);
  }, []);

  return (
    <LottieView
      style={{ width: '95%', height: '95%' }}
      ref={commentLottieRef}
      source={require('../../assets/image/95271-download.json')}
      loop={false}
      autoPlay={false}
    />
  );
};

export default AnimationDownload;
