import axios from 'axios';
import type { Answers } from '@/types';

interface EmojiApiResponse {
  result: string;
}

export const fetchEmojiResult = async (answers: Answers): Promise<string> => {
  const response = await axios.post<EmojiApiResponse>('/api/emoji', { answers });
  return response.data.result;
};
