import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';
import { fetchEmojiResult } from '@/services/emoji';
import type { Answers } from '@/types';

const EMOJI_KEY = 'emoji';

export const useEmojiMutation = () => {
  return useMutation({
    mutationFn: (answers: Answers) => fetchEmojiResult(answers),
    mutationKey: [EMOJI_KEY],
    onError: () => toast.error('이모지 생성에 실패했어요.'),
  });
};
