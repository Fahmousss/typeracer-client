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
  isUseTimeBomb: boolean;
}

export function TimeLimitDropdown({
  onChange,
  isUseTimeBomb,
}: TimeLimitDropdownProps) {
  const timeOptions = [10, 20, 30, 40, 50, 60, 90, 120];
  return (
    <Select
      onValueChange={(value) => onChange(Number(value))}
      disabled={!isUseTimeBomb}
    >
      <SelectTrigger className="w-[180px]">
        <TimerIcon className=" w-5" />
        <SelectValue placeholder="Atur batas waktu" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Waktu</SelectLabel>
          {timeOptions.map((time) => (
            <SelectItem key={time} value={time.toString()}>
              {time} detik
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
