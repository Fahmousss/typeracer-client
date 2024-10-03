import { Button } from "@/components/ui/button";
import TypingTest from "./components/TypingTest";
import Navbar from "@/components/ui/navbar";
import { Info, Rocket } from "lucide-react";
import Link from "next/link";
// import { ModeToggle } from "./components/utils/toggle";

export default function Home() {
  return (
    <div className="grid grid-rows-[100px_1fr_20px] items-center justify-items-center  px-8 sm:px-20 font-[family-name:var(--font-geist-sans)] ">
      {/* The main content */}
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-center">
        <TypingTest />
        <Link
          href="wordbyword"
          className="underline decoration-wavy decoration-cyan-500 underline-offset-2 hover:scale-125 transition ease-in-out duration-700 font-[family-name:var(--font-geist-mono)]"
        >
          Belajar mengetik per kata!🚀
        </Link>
      </main>
    </div>
  );
}
