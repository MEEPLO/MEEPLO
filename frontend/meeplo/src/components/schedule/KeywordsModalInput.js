import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, TextInput, StyleSheet, Dimensions } from 'react-native';
import { theme } from '../../assets/constant/DesignTheme';
import Toast from 'react-native-toast-message';

import StepTextInput from '../common/StepTextInput';
import ModalRound from '../common/ModalRound';
import KeywordBadge from './KeywordBadge';
import config from '../../config';

const screen = Dimensions.get('screen');

const KeywordsModalInput = ({ type, value, onConfirm }) => {
  const [showModal, setShowModal] = useState(false);
  const [selected, setSelected] = useState([]);
  const [selectBuffer, setSelectBuffer] = useState([]);
  const [input, setInput] = useState('');
  const [isValidInput, setIsValidInput] = useState(true);
  const [invalidText, setInvalidText] = useState('');

  useEffect(() => {
    setSelected([...value]);
  }, [value]);

  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);

  const onPressConfirm = () => {
    setSelected(selectBuffer);
    onConfirm(selectBuffer);
    closeModal();
  };

  const onChangeInput = newText => {
    setInput(newText);
    validateKeyword(newText);
  };

  const onAddKeywords = () => {
    if (selectBuffer.length === 5) {
      Toast.show({
        type: 'error',
        text1: '키워드는 최대 5개만 가능해요!',
      });

      return;
    }

    if (validateKeyword(input)) {
      setSelectBuffer([...selectBuffer, input]);
      setInput('');
    }
  };

  const onRemoveKeywords = target => {
    setSelectBuffer(selectBuffer.filter(keyword => target !== keyword));
  };

  const renderKeywordBadges = (keywords, disabled, onPress) => {
    return keywords.map(keyword => (
      <KeywordBadge key={keyword} value={keyword} selected={true} onPress={onPress} disabled={disabled} />
    ));
  };

  const validateKeyword = keyword => {
    const koreanRegex = /^[가-힣]*$/;
    if (keyword.length <= 0 || keyword.length > 6) {
      setIsValidInput(false);
      setInvalidText('키워드는 1자 이상, 6자 이하만 허용돼요!');
      return false;
    } else if (!koreanRegex.test(keyword)) {
      setIsValidInput(false);
      setInvalidText('한글 단어만 입력할 수 있어요!');
      return false;
    } else if (!!selectBuffer.find(key => key === keyword)) {
      setIsValidInput(false);
      setInvalidText('이미 추가된 키워드에요!');
      return false;
    } else {
      setIsValidInput(true);
      setInvalidText('');
      return true;
    }
  };

  return (
    <View>
      <Text style={styles.titleStyle}>{type}</Text>

      <TouchableOpacity
        style={{ marginTop: 10, minHeight: 40, borderBottomWidth: 1, borderColor: theme.color.disabled }}
        onPress={openModal}>
        <View style={styles.keywordBadgeView}>{renderKeywordBadges(selected, true)}</View>
      </TouchableOpacity>

      <ModalRound title="키워드" visible={showModal} onRequestClose={closeModal}>
        <View style={{ alignSelf: 'flex-end' }}>
          <Text>
            {selectBuffer.length} / {config.schedule.MAX_SELECT_KEYWORD_COUNT}
          </Text>
        </View>

        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
          <View></View>
          <TextInput
            style={{ borderBottomWidth: 1, width: screen.width * 0.6 }}
            multiline={false}
            value={input}
            onChangeText={onChangeInput}
            placeholder="새로운 키워드 입력"
          />
          <TouchableOpacity
            style={{
              width: 30,
              height: 30,
              borderWidth: 2,
              borderColor: theme.color.border,
              borderRadius: theme.radius.base,
              backgroundColor: theme.color.bright.red,
              alignItems: 'center',
              justifyContent: 'center',
            }}
            onPress={onAddKeywords}>
            <Text style={{ color: theme.color.border, fontSize: 14, fontWeight: 'bold' }}>+</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.invalidTextView}>
          <Text style={styles.invalidText}>{invalidText}</Text>
        </View>

        <View style={styles.keywordBadgeView}>{renderKeywordBadges(selectBuffer, false, onRemoveKeywords)}</View>

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
    fontWeight: 'bold',
  },
  invalidTextView: {
    marginBottom: 30,
  },
  invalidText: {
    color: theme.color.alert,
  },
  keywordBadgeView: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  keywordsInputView: {
    width: screen.width * 0.9,
    borderColor: theme.color.disabled,
    borderBottomWidth: 1,
  },
  confirmButtonView: {
    marginTop: 20,
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
