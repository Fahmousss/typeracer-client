import { TimeLimitDropdown } from "./utils/TimeLimitDropdown";
import { Button } from "@/components/ui/button";
import { ShuffleIcon } from "lucide-react";
import { ThemeDropdown } from "./utils/ThemeDropdown";

interface ControlsProps {
  timeLeft: number;
  excludePunctuation: boolean;
  useTimeBomb: boolean;
  onChangeTimeLimit: (newTime: number) => void;
  togglePunctuation: () => void;
  toggleTimeBomb: () => void;
  handleRestart: () => void;
}

export function Controls({
  excludePunctuation,
  useTimeBomb,
  onChangeTimeLimit,
  togglePunctuation,
  toggleTimeBomb,
  handleRestart,
}: ControlsProps) {
  return (
    <div className="flex sm:flex-col flex-col lg:flex-row sm:justify-between p-5 gap-5">
      <TimeLimitDropdown
        onChange={onChangeTimeLimit}
        isUseTimeBomb={useTimeBomb}
      />
      <div className="flex flex-row sm:flex-row lg:flex-row md:flex-row gap-5 align-middle">
        {/* <LeaderboardDialog /> */}
        <ThemeDropdown
          excludePunctuation={excludePunctuation}
          togglePunctuation={togglePunctuation}
          toggleTimeBomb={toggleTimeBomb}
          useTimeBomb={useTimeBomb}
        />
        <Button onClick={handleRestart}>
          <ShuffleIcon className="mr-2 h-4 w-4" />
          Acak kata
        </Button>
      </div>
    </div>
  );
}
