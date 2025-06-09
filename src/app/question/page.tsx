'use client';

import { useState } from 'react';

interface Question {
  id: string;
  question: string;
  options: { label: string; value: string; emoji: string }[];
}

const questions: Question[] = [
  {
    id: 'q1',
    question: '너의 이상적인 주말은 어떤 모습이야?',
    options: [
      {
        label: '혼자 책 읽으며 생각에 잠기기',
        value: 'Reading alone and getting lost in thought',
        emoji: '📚',
      },
      {
        label: '친구들과 파티하거나 외출하기',
        value: 'Partying or going out with friends',
        emoji: '🎉',
      },
      {
        label: '자연 속으로 떠나는 여행',
        value: 'Taking a trip into nature',
        emoji: '🌲',
      },
      {
        label: '집에서 넷플릭스 정주행',
        value: 'Binge-watching Netflix at home',
        emoji: '📺',
      },
    ],
  },
  {
    id: 'q2',
    question: '일이 밀렸을 때는 어떻게 대응해?',
    options: [
      {
        label: '우선순위를 정리하고 계획부터 짠다',
        value: 'Organizing priorities and making a plan first',
        emoji: '📅',
      },
      {
        label: '포기할 건 포기하고 할 수 있는 것만 한다',
        value: 'Letting go of what’s unmanageable and focusing on what can be done',
        emoji: '🧘',
      },
      {
        label: '주변 도움을 요청해 함께 해결한다',
        value: 'Asking for help and solving problems together',
        emoji: '🤝',
      },
      {
        label: '손에 잡히는 일부터 빠르게 처리한다',
        value: 'Quickly tackling whatever’s at hand',
        emoji: '⚡',
      },
    ],
  },
  {
    id: 'q3',
    question: '어떤 장르의 콘텐츠를 가장 좋아해?',
    options: [
      {
        label: '감성적이고 설레는 로맨스',
        value: 'Emotional and heart-fluttering romance',
        emoji: '💓',
      },
      {
        label: '빠르고 자극적인 액션/스릴러',
        value: 'Fast-paced and intense action/thriller',
        emoji: '💥',
      },
      {
        label: '재미있는 예능이나 코미디',
        value: 'Fun variety shows or comedies',
        emoji: '😂',
      },
      {
        label: '지식이나 정보를 얻는 다큐',
        value: 'Documentaries for learning and information',
        emoji: '📖',
      },
    ],
  },
  {
    id: 'q4',
    question: '낯선 상황에서 주로 어떻게 행동해?',
    options: [
      {
        label: '조용히 관찰하며 기다린다',
        value: 'Observing quietly and waiting',
        emoji: '👀',
      },
      {
        label: '먼저 말을 걸며 관계를 주도한다',
        value: 'Initiating conversation and taking the lead in relationships',
        emoji: '🙌',
      },
      {
        label: '신경 쓰지 않고 나의 길을 간다',
        value: 'Not caring much and going my own way',
        emoji: '🌿',
      },
      {
        label: '긴장되지만 천천히 다가간다',
        value: 'Feeling nervous but slowly approaching',
        emoji: '🐢',
      },
    ],
  },
  {
    id: 'q5',
    question: '너는 주변 사람들에게 어떤 사람이야?',
    options: [
      {
        label: '차갑지만 때때로 다정한 츤데레',
        value: 'Cold but occasionally warm',
        emoji: '🧊',
      },
      {
        label: '상냥하고 사려 깊은 천사',
        value: 'Kind and considerate',
        emoji: '🧸',
      },
      {
        label: '활발하고 유쾌한 분위기 메이커',
        value: 'Lively and cheerful',
        emoji: '🤹',
      },
      {
        label: '차분하고 논리적인 똑쟁이',
        value: 'Composed and logical',
        emoji: '🧠',
      },
    ],
  },
];

export default function Question() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [isFinished, setIsFinished] = useState(false);

  const currentQuestion = questions[currentIndex];

  const selectAnswer = (value: string) => {
    const id = currentQuestion.id;
    setAnswers((prev) => ({ ...prev, [id]: value }));

    if (currentIndex + 1 < questions.length) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setIsFinished(true);
    }
  };

  return (
    <>
      <header>
        <></>
      </header>
      <main className="flex flex-col items-center justify-center flex-grow py-20 px-4 text-center">
        <h2 className="text-xl font-bold mb-6">{currentQuestion.question}</h2>
        <ul className="space-y-3 w-full max-w-md">
          {currentQuestion.options.map((option) => {
            return (
              <li key={option.value}>
                <button
                  type="button"
                  className="w-full border rounded p-3 hover:bg-muted"
                  style={{ cursor: 'pointer' }}
                  onClick={() => selectAnswer(option.value)}
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
