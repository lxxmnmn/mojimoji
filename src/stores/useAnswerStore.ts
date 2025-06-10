import { create } from 'zustand';
import type { Answers } from '@/types';

interface AnswerState {
  answers: Answers;
  setAnswers: (a: Answers) => void;
}

export const useAnswerStore = create<AnswerState>((set) => ({
  answers: {} as Answers,
  setAnswers: (a) => set({ answers: a }),
}));
