import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { theme } from '../../assets/constant/DesignTheme';
import Toast from 'react-native-toast-message';

import ModalRound from '../common/ModalRound';
import KeywordSelector from './KeywordSelector';
import config from '../../config';

const screen = Dimensions.get('screen');

const KeywordsModalInput = ({ type, value, onConfirm, keywordsData }) => {
  const [showModal, setShowModal] = useState(false);
  const [categories, setCategories] = useState();
  const [selected, setSelected] = useState([]);

  useEffect(() => {
    const categorized = {};

    if (Array.isArray(keywordsData)) {
      keywordsData.forEach(keyword => {
        if (Array.isArray(categorized[keyword.category])) {
          categorized[keyword.category].push(keyword);
        } else {
          categorized[keyword.category] = [keyword];
        }
      });
    }

    setCategories(categorized);
  }, []);

  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);

  const onPressConfirm = () => {
    onConfirm(selected);
    closeModal();
  };

  const onPressKeywordBadge = selectedId => {
    if (selected.find(id => id === selectedId)) {
      setSelected(selected.filter(id => id !== selectedId));
    } else {
      if (selected.length >= config.schedule.MAX_SELECT_KEYWORD_COUNT) {
        Toast.show({
          type: 'error',
          text1: '더 이상 선택할 수 없어요!',
        });
        return;
      } else {
        setSelected([...selected, selectedId]);
      }
    }
  };

  const renderCategories = categories => {
    if (categories) {
      return Object.keys(categories).map(classification => renderKeywords(classification, categories[classification]));
    }
  };

  const renderKeywords = (classification, keywords) => {
    return (
      <KeywordSelector
        classification={classification}
        keywords={keywords}
        key={classification}
        selected={selected}
        onPress={onPressKeywordBadge}
      />
    );
  };

  return (
    <View>
      <Text style={styles.titleStyle}>{type}</Text>

      <TouchableOpacity onPress={openModal}>
        <Text style={{ color: theme.font.color }}>{value}</Text>
        <View style={styles.keywordsInputView} />
      </TouchableOpacity>

      <ModalRound title="키워드" visible={showModal} onRequestClose={closeModal}>
        <View style={{ alignSelf: 'flex-end' }}>
          <Text>
            {selected.length} / {config.schedule.MAX_SELECT_KEYWORD_COUNT}
          </Text>
        </View>

        {renderCategories(categories)}

        <View style={styles.confirmButtonView}>
          <TouchableOpacity style={styles.confirmButtonStyle} onPress={onPressConfirm}>
            <Text style={styles.confirmButtonTextStyle}> 확인 </Text>
          </TouchableOpacity>
        </View>

        <Toast />
      </ModalRound>
    </View>
  );
};

const styles = StyleSheet.create({
  titleStyle: {
    color: theme.font.color,
    fontWeight: '800',
    marginBottom: 40,
  },
  keywordsInputView: {
    width: screen.width * 0.9,
    borderColor: theme.color.disabled,
    borderBottomWidth: 1,
  },
  confirmButtonView: {
    alignItems: 'center',
  },
  confirmButtonStyle: {
    width: screen.width * 0.7,
    height: 50,

    borderWidth: 2,
    borderColor: theme.color.border,
    borderRadius: theme.radius.base,

    alignItems: 'center',
    justifyContent: 'center',
  },
  confirmButtonTextStyle: {
    fontSize: 20,
    color: theme.color.bright.red,
  },
});

export default KeywordsModalInput;
