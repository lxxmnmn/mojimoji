import { NextResponse } from 'next/server';
import axios from 'axios';
import { QUESTION_LIST } from '@/constants';

import type { NextRequest } from 'next/server';
import type { EmojiAnswers } from '@/types/emoji';
import type { OpenAIChatMessage, OpenAIResponse } from '@/types/openAI';

export async function POST(request: NextRequest) {
  const body = await request.json();

  if (!body?.answers) {
    return NextResponse.json({ error: 'Missing answers' }, { status: 400 });
  }

  const answers: EmojiAnswers = body.answers;

  if (Object.values(answers).some((v) => !v?.trim())) {
    return NextResponse.json({ error: 'Invalid answers' }, { status: 400 });
  }

  const systemPrompt: string =
    'You are an assistant that recommends a single emoji to represent the user’s personality based on their answers to a multiple-choice quiz. Choose only one emoji and explain your reasoning in one short sentence.';

  const getUserPrompt = (answers: EmojiAnswers): string => {
    return (
      'The user has answered the following questions:\n\n' +
      QUESTION_LIST.map((item, index) => `${index + 1}. ${item.key}: ${answers[item.key]}`).join(
        '\n'
      ) +
      '\n\nBased on these answers, please recommend one emoji that represents this user and explain briefly why you chose it.'
    );
  };

  const messages: OpenAIChatMessage[] = [
    {
      role: 'system',
      content: systemPrompt,
    },
    {
      role: 'user',
      content: getUserPrompt(answers),
    },
  ];

  const response = await axios
    .post<OpenAIResponse>(
      'https://api.openai.com/v1/chat/completions',
      {
        model: 'gpt-4o',
        temperature: 0.8,
        max_tokens: 100,
        messages,
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    )
    .then((res) => res.data);

  const result = response.choices[0]?.message?.content || 'No result.';

  return NextResponse.json({ result });
}
