import { AlarmClock } from "lucide-react";

const TimerDisplay: React.FC<{ timeLeft: number }> = ({ timeLeft }) => (
  <div className="absolute flex sm:justify-end lg:justify-center justify-end w-full h-12 p-5 mt-4 align-middle items-center -z-10">
    <p className="text-2xl text-orange-400 flex align-middle items-center">
      <AlarmClock className="mr-3" />
      {timeLeft}
    </p>
  </div>
);

export default TimerDisplay;
