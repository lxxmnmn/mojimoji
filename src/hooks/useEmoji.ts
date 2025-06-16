import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';
import { fetchEmojiResult } from '@/services/emoji';

import type { EmojiAnswers } from '@/types/emoji';

const EMOJI_KEY = 'emoji';

export const useEmojiMutation = () => {
  return useMutation({
    mutationFn: (answers: EmojiAnswers) => fetchEmojiResult(answers),
    mutationKey: [EMOJI_KEY],
    onError: () => toast.error('이모지 생성에 실패했어요.'),
  });
};
