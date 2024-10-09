import TypingTest from "./components/TypingTest";
import { Leaderboard } from "./components/Leaderboard";
import { LeaderboardDialog } from "./components/utils/LeaderboardDialog";
import { auth } from "./lib/auth";
// import { ModeToggle } from "./components/utils/toggle";

export default async function Home() {
  const session = await auth();
  return (
    <div className="grid grid-rows-1 h-screen p-8 sm:p-20 font-[family-name:var(--font-geist-sans)] ">
      {/* The main content */}
      <main className="grid lg:grid-cols-4 gap-8 self-center ">
        <div className="hidden lg:block col-span-1 mt-5 lg:order-first order-last">
          <Leaderboard />
        </div>
        <div className="lg:col-span-3 col-span-4">
          <div>
            <TypingTest userId={session?.user?.id} />
          </div>
        </div>
        {/* <Link
          href="wordbyword"
          className="underline decoration-wavy decoration-cyan-500 underline-offset-2 hover:scale-125 transition ease-in-out duration-700 font-[family-name:var(--font-geist-mono)]"
        >
          Belajar mengetik per kata!🚀
        </Link> */}
      </main>
    </div>
  );
}
