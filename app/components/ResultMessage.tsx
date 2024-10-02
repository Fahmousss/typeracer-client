"use client";

import { Button } from "@/components/ui/button";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { RotateCcw } from "lucide-react";

// ResultMessage.tsx
const ResultMessage: React.FC<{
  isFinished: boolean;
  isTimeUp: boolean;
  handleRestart: () => void;
  wpm: number;
  cpm: number;
}> = ({ isFinished, isTimeUp, handleRestart, wpm, cpm }) => {
  const badges = [
    { name: "New Typist", wpm: 10, cpm: 100 },
    { name: "Speedster", wpm: 50, cpm: 300 },
    { name: "Typing Master", wpm: 70, cpm: 400 },
    { name: "Ultra Typist", wpm: 90, cpm: 500 },
  ];

  const getTitle = (wpm: number) => {
    if (wpm >= 80) return "Typing Legend";
    if (wpm >= 60) return "Expert Typist";
    if (wpm >= 40) return "Intermediate Typist";
    return "Beginner";
  };

  const getFeedback = (wpm: number) => {
    if (wpm >= 80) return "Incredible! You’re a typing legend!";
    if (wpm >= 60) return "Great job! You’re typing like a pro!";
    if (wpm >= 40) return "Good effort! Keep practicing and you'll be faster!";
    return "Keep practicing to improve your speed!";
  };

  const getUnlockedBadges = (wpm: number, cpm: number) => {
    return badges.filter((badge) => wpm >= badge.wpm || cpm >= badge.cpm);
  };
  if (isFinished || isTimeUp) {
    return (
      <>
        <Dialog defaultOpen>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Result</DialogTitle>
            </DialogHeader>
            <div className="flex justify-between px-9 pt-9">
              <div className="flex flex-col items-center gap-4 text-5xl">
                <div className="font-bold">WPM</div>
                <div>{wpm}</div>
              </div>
              <Separator orientation="vertical" />
              <div className="flex flex-col items-center gap-4 text-5xl">
                <div className="font-bold">CPM</div>
                <div>{cpm}</div>
              </div>
            </div>
            <div className="text-center">
              <p>You are a</p>
              <p className="font-semibold text-3xl text-green-400">
                {getTitle(wpm)}
              </p>
            </div>
            <blockquote className=" text-center italic">
              {getFeedback(wpm)}
            </blockquote>
          </DialogContent>
        </Dialog>
        <div className="flex justify-center">
          <Button
            variant="ghost"
            className="text-gray-400"
            onClick={handleRestart}
          >
            <RotateCcw className="mr-2 w-4 h-4" /> Try Again
          </Button>
        </div>
      </>
    );
  }
};

export default ResultMessage;
