'use client';

import { useEffect } from 'react';
import { useAnswerStore } from '@/stores';
import { useEmojiMutation } from '@/hooks/useEmoji';

export default function ResultPage() {
  const { answers } = useAnswerStore();
  const { mutate, data, isPending, isError } = useEmojiMutation();

  useEffect(() => {
    if (Object.values(answers).length > 0) {
      mutate(answers);
    }
  }, [answers, mutate]);

  if (isPending) {
    return (
      <main>
        <p>Loading...</p>
      </main>
    );
  }

  if (isError) {
    return (
      <main>
        <p>Error</p>
      </main>
    );
  }

  return (
    <main className="flex flex-col items-center justify-center flex-grow py-20 px-4 text-center">
      {data && (
        <div>
          <h2>{data.emoji}</h2>
          <p>{data.description}</p>
        </div>
      )}
    </main>
  );
}
