// Controls.tsx
"use client";

import { TimeLimitDropdown } from "./utils/TimeLimitDropdown";
import { Button } from "@/components/ui/button";
import { Moon, Pause, Play, Settings, ShuffleIcon, Sun } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { useTheme } from "next-themes";

interface ControlsProps {
  timeLeft: number;
  excludePunctuation: boolean;
  useTimeBomb: boolean;
  onChangeTimeLimit: (newTime: number) => void;
  togglePunctuation: () => void;
  toggleTimeBomb: () => void;
  handleRestart: () => void;
  muteAudio: () => void;
  isMuted: boolean;
}

export function Controls({
  excludePunctuation,
  useTimeBomb,
  onChangeTimeLimit,
  togglePunctuation,
  toggleTimeBomb,
  handleRestart,
  muteAudio,
  isMuted,
}: ControlsProps) {
  const { theme, setTheme } = useTheme();

  return (
    <div className="flex sm:flex-col flex-col lg:flex-row sm:justify-between p-5 gap-5">
      <TimeLimitDropdown onChange={onChangeTimeLimit} />
      <div className="flex flex-row sm:flex-row lg:flex-row md:flex-row gap-5 align-middle">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="icon">
              <Settings className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            <DropdownMenuLabel>Settings</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={muteAudio}>
              {isMuted ? (
                <Play className="h-[1.2rem] w-[1.2rem] transition-all " />
              ) : (
                <Pause className="h-[1.2rem] w-[1.2rem]  transition-all " />
              )}
              <span className="ml-2">Turn {isMuted ? "On" : "Off"} Music</span>
            </DropdownMenuItem>
            <DropdownMenuSub>
              <DropdownMenuSubTrigger>
                <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                <span className="ml-2">Set Theme</span>
              </DropdownMenuSubTrigger>
              <DropdownMenuPortal>
                <DropdownMenuSubContent>
                  <DropdownMenuItem onClick={() => setTheme("light")}>
                    Light
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setTheme("dark")}>
                    Dark
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setTheme("system")}>
                    System
                  </DropdownMenuItem>
                </DropdownMenuSubContent>
              </DropdownMenuPortal>
            </DropdownMenuSub>
            <DropdownMenuCheckboxItem
              checked={useTimeBomb}
              onCheckedChange={toggleTimeBomb}
            >
              Use Timer (Time Bomb)
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem
              checked={excludePunctuation}
              onCheckedChange={togglePunctuation}
            >
              Exclude Punctuation
            </DropdownMenuCheckboxItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <Button onClick={handleRestart}>
          <ShuffleIcon className="mr-2 h-4 w-4" />
          Shuffle Paragraph
        </Button>
      </div>
    </div>
  );
}
