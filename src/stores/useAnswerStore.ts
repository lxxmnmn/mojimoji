import { create } from 'zustand';
import type { EmojiAnswers, EmojiQuestionKey } from '@/types/emoji';

interface AnswerState {
  answers: EmojiAnswers;
  setAnswers: (a: EmojiAnswers) => void;
  resetAnswers: () => void;
  updateAnswer: (key: EmojiQuestionKey, value: string) => void;
}

export const useAnswerStore = create<AnswerState>((set) => ({
  answers: {} as EmojiAnswers,
  setAnswers: (a) => set({ answers: a }),
  resetAnswers: () => set({ answers: {} as EmojiAnswers }),
  updateAnswer: (key, value) =>
    set((state) => ({
      answers: {
        ...state.answers,
        [key]: value,
      },
    })),
}));
