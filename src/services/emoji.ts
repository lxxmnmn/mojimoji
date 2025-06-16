import axios from 'axios';
import type { EmojiAnswers, EmojiResult } from '@/types/emoji';

interface EmojiApiResponse {
  result: EmojiResult;
}

export const fetchEmojiResult = async (answers: EmojiAnswers): Promise<EmojiResult> => {
  const response = await axios.post<EmojiApiResponse>('/api/emoji', { answers });
  return response.data.result;
};
