import { Text } from 'react-native';
import React, { useEffect, useState } from 'react';

const FontText = ({ style, children, bold }) => {
  const [isBold, setIsBold] = useState(false);
  const [fontStyle, setFontStyle] = useState(style);
  useEffect(() => {
    if (style && style.fontWeight) {
      if (style.fontWeight === 'bold') {
        setIsBold(true);
      }
      const st = {};
      for (const key in style) {
        if (key !== 'fontWeight') {
          st[key] = style[key];
        }
      }
      setFontStyle(st);
    }
  }, [style]);

  const getFamily = bold => {
    if (bold) return 'NanumSquareRoundB';
    return 'NanumSquareRoundR';
  };
  return <Text style={{ fontFamily: getFamily(bold || isBold), ...fontStyle }}>{children}</Text>;
};

<FontText bold={true} />;

export default FontText;
