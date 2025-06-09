import { QUESTION_LIST } from '@/constants';

export type QuestionKey = (typeof QUESTION_LIST)[number]['key'];

export type Answers = {
  [key in QuestionKey]: string;
};

export interface Question {
  id: string;
  question: { label: string; key: QuestionKey };
  options: { label: string; value: string; emoji: string }[];
}
