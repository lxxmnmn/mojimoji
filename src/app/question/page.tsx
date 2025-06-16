'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useAnswerStore } from '@/stores';
import { Progress } from '@/components/ui/progress';

import type { EmojiQuestionKey } from '@/types/emoji';

import { questions } from './question';

export default function QuestionPage() {
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(0);
  const updateAnswer = useAnswerStore((state) => state.updateAnswer);

  const totalQuestions = questions.length;
  const currentQuestion =
    currentIndex < totalQuestions ? questions[currentIndex] : questions[totalQuestions - 1];
  const progressPercent = Math.min((currentIndex / totalQuestions) * 100, 100);

  const selectAnswer = (key: EmojiQuestionKey, value: string) => {
    updateAnswer(key, value);
    setCurrentIndex((prev) => prev + 1);
  };

  return (
    <>
      <header className="w-full fixed top-0 left-0 z-10">
        <Progress value={progressPercent} onComplete={() => router.push('/result')} />
      </header>
      <main className="flex flex-col items-center justify-center flex-grow py-20 px-4 text-center">
        <h2 className="text-xl font-bold mb-6">{currentQuestion.question.label}</h2>
        <ul className="space-y-3 w-full max-w-md">
          {currentQuestion.options.map((option) => {
            return (
              <li key={option.value}>
                <button
                  type="button"
                  className="w-full border rounded p-3 text-sm hover:bg-muted"
                  style={{ cursor: 'pointer' }}
                  onClick={() => selectAnswer(currentQuestion.question.key, option.value)}
                  disabled={currentIndex >= totalQuestions}
                >
                  {option.label} {option.emoji}
                </button>
              </li>
            );
          })}
        </ul>
      </main>
    </>
  );
}
