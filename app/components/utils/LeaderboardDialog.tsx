import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Trophy } from "lucide-react";
import { Leaderboard } from "../Leaderboard";

export function LeaderboardDialog() {
  return (
    <div className="lg:hidden block font-[family-name:var(--font-geist-sans)]  ">
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline" size="default">
            <Trophy className="h-4 w-4 mr-4" /> Leaderboard
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-lg max-w-sm font-[family-name:var(--font-geist-sans)] ">
          <DialogHeader>
            <DialogTitle>Leaderboard</DialogTitle>
          </DialogHeader>
          <Leaderboard />
        </DialogContent>
      </Dialog>
    </div>
  );
}
