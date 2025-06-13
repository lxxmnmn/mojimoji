import { create } from 'zustand';
import type { Answers, QuestionKey } from '@/types';

interface AnswerState {
  answers: Answers;
  setAnswers: (a: Answers) => void;
  resetAnswers: () => void;
  updateAnswer: (key: QuestionKey, value: string) => void;
}

export const useAnswerStore = create<AnswerState>((set) => ({
  answers: {} as Answers,
  setAnswers: (a) => set({ answers: a }),
  resetAnswers: () => set({ answers: {} as Answers }),
  updateAnswer: (key, value) =>
    set((state) => ({
      answers: {
        ...state.answers,
        [key]: value,
      },
    })),
}));
