import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';

import { theme } from '../../assets/constant/DesignTheme';

import KeywordBadge from './KeywordBadge';

const KeywordSelector = ({ classification, keywords, selected, onPress }) => {
  const renderKeywordBadges = keywords => {
    if (Array.isArray(keywords)) {
      return keywords.map(keyword => (
        <KeywordBadge
          keyword={keyword}
          selected={selected.find(id => id === keyword.id) ? true : false}
          onPress={onPress}
          key={keyword.id}
        />
      ));
    }
  };

  return (
    <View style={styles.SelectorView}>
      <View style={styles.keywordClassificationView}>
        <Text style={styles.keywordClassificationText}>{classification}</Text>
      </View>
      <View style={styles.keywordBadgeView}>{renderKeywordBadges(keywords)}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  SelectorView: {
    marginVertical: 10,
  },
  keywordClassificationView: {
    marginBottom: 5,
  },
  keywordClassificationText: {
    color: theme.font.color,
    fontWeight: 'bold',
  },
  keywordBadgeView: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
});

export default KeywordSelector;
