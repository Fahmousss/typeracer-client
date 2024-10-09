import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { insertResultToDB } from "@/app/lib/actions"; // Import your server action

const ResultMessage: React.FC<{
  isFinished: boolean;
  isTimeUp: boolean;
  handleRestart: () => void;
  wpm: number;
  cpm: number;
  userId: string | null; // Handle case where userId might be null
}> = ({ isFinished, isTimeUp, handleRestart, wpm, cpm, userId }) => {
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

  // Function to submit result to database
  const handleResultSubmission = async () => {
    if (userId) {
      await insertResultToDB(userId, wpm, cpm); // Call server action
      //   console.log(userId);
    }
  };

  return (
    <Dialog
      defaultOpen
      onOpenChange={handleResultSubmission} // Trigger when dialog opens/closes
    >
      <DialogContent className="sm:max-w-lg max-w-sm">
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
        <blockquote className="text-center italic">
          {getFeedback(wpm)}
        </blockquote>
      </DialogContent>
    </Dialog>
  );
};

export default ResultMessage;
