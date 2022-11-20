import React, { useRef } from 'react';
import LottieView from 'lottie-react-native';

const AnimationComment = () => {
  const commentLottieRef = useRef();

  React.useEffect(() => {
    commentLottieRef.current?.play(0, 30);
  }, []);

  return (
    <LottieView
      style={{ width: '95%', height: '95%' }}
      ref={commentLottieRef}
      source={require('../../assets/image/9109-comment.json')}
      loop={false}
      autoPlay={false}
    />
  );
};

export default AnimationComment;
