import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center flex-grow py-20 px-4 gap-4 text-center">
      <h1 className="text-3xl font-extrabold mb-4">MojiMoji</h1>
      <p className="mb-6 text-muted-foreground">나를 담은 이모지를 찾아보세요 👋</p>
      <Button asChild className="mb-8">
        <Link href="/question">시작하기</Link>
      </Button>
    </main>
  );
}
