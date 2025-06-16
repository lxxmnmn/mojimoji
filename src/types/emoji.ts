import { QUESTION_LIST } from '@/constants';

export type EmojiQuestionKey = (typeof QUESTION_LIST)[number]['key'];

export type EmojiAnswers = {
  [key in EmojiQuestionKey]: string;
};

export interface EmojiQuestion {
  id: string;
  question: { label: string; key: EmojiQuestionKey };
  options: { label: string; value: string; emoji: string }[];
}
