const TOAST_MESSAGE = {
  INPUT_ERROR: '입력을 확인해주세요',
  REQUIRED_FIELD_ERROR: '필수 항목이 입력되지 않았어요',

  SCHEDULE_NO_NAME: '약속의 이름은 필요해요!',
  SCHEDULE_NO_DATE: '약속 일시가 필요해요!',
  SCHEDULE_NO_GROUP: '그룹을 선택해주세요!',
  SCHEDULE_NO_MEMBERS: '약속 인원이 없어요!',
  SCHEDULE_NO_PLACE: '장소를 선택해주세요!',
  SCHEDULE_SUCCESS_CREATE_TEXT1: '약속 생성 성공',
  SCHEDULE_SUCCESS_CREATE_TEXT2: '새로운 약속이 만들어졌어요!',

  MOMENT_NO_GROUP: '그룹을 선택해주세요!',
  MOMENT_NO_SCHEDULE: '약속을 선택해주세요!',
  MOMENT_NO_FRAME: '프레임을 선택해주세요!',
  MOMENT_NO_PICTURE: '사진을 확정해주세요!',
  MOMENT_NO_COMMENT: '댓글을 작성해주세요!',

  START_LOCATION_NO_NAME: '출발지 이름을 입력해주세요!',
  START_LOCATION_NO_ADDRESS: '주소를 입력해주세요!',
  START_LOCATION_NAME_LENGTH_EXCESS: '제목은 최대 10자까지 입력 가능합니다.',

  USER_NO_NICKNAME: '닉네임을 입력해주세요!',
  USER_NO_PROFILEPHOTO: '사진을 선택해주세요!',
  USER_NAME_LENGTH_EXCESS: '닉네임은 최대 8자까지 입력 가능합니다.',

  GROUP_NO_NAME: '그룹 이름을 입력해주세요!',
  GROUP_NO_PHOTO: '사진을 선택해주세요!',
  GROUP_NAME_LENGTH_EXCESS: '그룹 이름은 최대 20자까지 입력 가능합니다.',
  GROUP_DESCRIPTION_LENGTH_EXCESS: '그룹 설명은 최대 200자까지 입력 가능합니다.',

  NO_SEARCH_RESULT: '검색 결과가 없습니다!',
};

const ALERT_MESSAGE = {
  SCHEDULE_ASK_CANCEL_CREATE_TEXT1: '약속 생성을 취소하시겠습니까?',
  SCHEDULE_ASK_CANCEL_CREATE_TEXT2: '입력 중인 값들이 모두 초기화됩니다.',
  STAY: '남아있기',
  LEAVE: '나가기',
};

const COMMON_TEXT = {
  NO_SHCEDULE_EXISTS: '아무 약속이 없습니다.',
  MIDDLE_POINT_MODAL_TEXT_1: '여러분들의 중간 지점은...',
  MIDDLE_POINT_MODAL_TEXT_2: '선택하신 역은',
};

const BUTTON_TEXT = {
  RECOMMENDATE_LOCATION_BUTTON: '키워드 기반 장소 추천 받기',
  RECOMMENDATE_MIDDLE_POINT: '중간 지점 추천 받기',
  FIND_NEAR_LOCATINO_BUTTON: '현 지도에서 장소 찾기',
};

export { TOAST_MESSAGE, COMMON_TEXT, ALERT_MESSAGE, BUTTON_TEXT };
