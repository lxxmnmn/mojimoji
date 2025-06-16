import { NextResponse } from 'next/server';
import axios from 'axios';
import { parseJson } from '@/lib/utils';
import { QUESTION_LIST } from '@/constants';

import type { NextRequest } from 'next/server';
import type { EmojiAnswers, EmojiResult } from '@/types/emoji';
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
    'You are an assistant that recommends a single emoji to represent the user’s personality based on their answers to a multiple-choice quiz.\n\n' +
    'Always respond ONLY in the following JSON format:\n' +
    '{"emoji": "🎯", "description": "친근하고 부드러운 한국어 한 문장으로 설명해주세요."}\n\n' +
    'Do not include any extra text or formatting outside the JSON.\n' +
    'The "emoji" should be a single character emoji.\n' +
    'The "description" must be in Korean, written in a friendly and gentle tone.';

  const getUserPrompt = (answers: EmojiAnswers): string => {
    return (
      'The user has answered the following questions:\n\n' +
      QUESTION_LIST.map((item, index) => `${index + 1}. ${item.key}: ${answers[item.key]}`).join(
        '\n'
      ) +
      '\n\nBased on these answers, please recommend one emoji and one short Korean description in the format specified.'
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
        model: 'gpt-3.5-turbo',
        temperature: 0.8,
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

  const result = response.choices[0]?.message?.content;

  if (!result) {
    return NextResponse.json({ error: 'No response from OpenAI' }, { status: 502 });
  }

  const parsedResult = parseJson<EmojiResult>(result);

  if (!parsedResult) {
    return NextResponse.json({ error: 'Failed to parse OpenAI response' }, { status: 502 });
  }

  const requiredFields = ['emoji', 'description'] as const satisfies readonly (keyof EmojiResult)[];
  const hasInvalidFields = requiredFields.some((key) => {
    const value = parsedResult[key];
    return typeof value !== 'string' || !value.trim();
  });

  if (hasInvalidFields) {
    return NextResponse.json({ error: 'Invalid or missing fields from OpenAI' }, { status: 502 });
  }

  return NextResponse.json({ result: parsedResult });
}
