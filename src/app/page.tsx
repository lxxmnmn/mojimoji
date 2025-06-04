export default function Home() {
  return (
    <div className="grid grid-rows-[1fr_auto] min-h-screen place-items-center gap-16 p-8 sm:p-20 font-[var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 items-center sm:items-start row-start-1">
        <h1>MojiMoji</h1>
      </main>
      <footer className="flex flex-wrap items-center justify-center gap-6 row-start-2">
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://github.com/lxxmnmn"
          target="_blank"
          rel="noopener noreferrer"
        >
          https://github.com/lxxmnmn
        </a>
      </footer>
    </div>
  );
}
