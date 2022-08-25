import { ITableHead } from '../types/etc';

export const longProblemTableHeads: ITableHead[] = [
  {
    id: 'id',
    name: 'Problem ID',
  },
  {
    id: 'title',
    name: '문제 제목',
  },
  {
    id: 'creator',
    name: '제작자',
  },
  {
    id: 'avgKeywordScore',
    name: '평균 키워드 점수',
  },
  {
    id: 'avgPromptScore',
    name: '평균 내용 점수',
  },
  {
    id: 'userAnswerCnt',
    name: '답변 수',
  },
  {
    id: 'isActive',
    name: '활성화 여부',
  },
];

export const multipleTableHeads: ITableHead[] = [
  {
    id: 'id',
    name: 'Problem ID',
  },
  {
    id: 'title',
    name: '문제 제목',
  },
  {
    id: 'creator',
    name: '제작자',
  },
  {
    id: 'answerRate',
    name: '정답률',
  },

  {
    id: 'userAnswerCnt',
    name: '답변 수',
  },
  {
    id: 'isActive',
    name: '활성화 여부',
  },
];

export const shortTableHeads: ITableHead[] = [
  {
    id: 'id',
    name: 'Problem ID',
  },
  {
    id: 'title',
    name: '문제 제목',
  },
  {
    id: 'creator',
    name: '제작자',
  },
  {
    id: 'answerRate',
    name: '정답률',
  },

  {
    id: 'userAnswerCnt',
    name: '답변 수',
  },
  {
    id: 'isActive',
    name: '활성화 여부',
  },
];
