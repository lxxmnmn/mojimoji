'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useAnswerStore } from '@/stores';
import type { Answers, QuestionKey } from '@/types';

import { questions } from './question';

export default function QuestionPage() {
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Answers>(
    () => Object.fromEntries(questions.map((item) => [item.question.key, ''])) as Answers
  );
  const [isFinished, setIsFinished] = useState(false);
  const setAllAnswers = useAnswerStore((state) => state.setAnswers);

  const currentQuestion = questions[currentIndex];

  const selectAnswer = (key: QuestionKey, value: string) => {
    setAnswers((prev) => ({ ...prev, [key]: value }));

    if (currentIndex + 1 < questions.length) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setIsFinished(true);
    }

    if (isFinished && Object.values(answers).length > 0) {
      setAllAnswers(answers);
      router.push('/result');
    }
  };

  return (
    <>
      <header>
        <></>
      </header>
      <main className="flex flex-col items-center justify-center flex-grow py-20 px-4 text-center">
        <h2 className="text-sm font-bold mb-6">{currentQuestion.question.label}</h2>
        <ul className="space-y-3 w-full max-w-md">
          {currentQuestion.options.map((option) => {
            return (
              <li key={option.value}>
                <button
                  type="button"
                  className="w-full border rounded p-3 text-sm hover:bg-muted"
                  style={{ cursor: 'pointer' }}
                  onClick={() => selectAnswer(currentQuestion.question.key, option.value)}
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
