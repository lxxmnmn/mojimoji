import axios from 'axios';
import type { EmojiAnswers } from '@/types/emoji';

interface EmojiApiResponse {
  result: string;
}

export const fetchEmojiResult = async (answers: EmojiAnswers): Promise<string> => {
  const response = await axios.post<EmojiApiResponse>('/api/emoji', { answers });
  return response.data.result;
};
