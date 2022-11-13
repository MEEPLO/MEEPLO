import React, { useRef } from 'react';
import LottieView from 'lottie-react-native';

const AnimationLikes = ({ isLiked }) => {
  const likeLottieRef = useRef();

  React.useEffect(() => {
    isLiked ? likeLottieRef.current?.play(100, 181) : likeLottieRef.current?.play(0, 100);
  }, [isLiked]);
  return <LottieView ref={likeLottieRef} source={require('../../assets/image/94181-like.json')} loop={false} autoPlay={false} />;
};

export default AnimationLikes;
