import * as React from "react";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { TimerIcon } from "lucide-react";

interface TimeLimitDropdownProps {
  onChange: (time: number) => void;
}

export function TimeLimitDropdown({ onChange }: TimeLimitDropdownProps) {
  const timeOptions = [10, 20, 30, 40, 50, 60, 90, 120];
  return (
    <Select onValueChange={(value) => onChange(Number(value))}>
      <SelectTrigger className="w-[180px]">
        <TimerIcon className=" w-5" />
        <SelectValue placeholder="Adjust time limit" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Times</SelectLabel>
          {timeOptions.map((time) => (
            <SelectItem key={time} value={time.toString()}>
              {time} seconds
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
