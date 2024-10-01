import { Button } from "@/components/ui/button";
import { RotateCcw } from "lucide-react";

// ResultMessage.tsx
const ResultMessage: React.FC<{
  isFinished: boolean;
  isTimeUp: boolean;
  handleRestart: () => void;
}> = ({ isFinished, isTimeUp, handleRestart }) => {
  if (isFinished || isTimeUp) {
    return (
      <div className="flex justify-center">
        <Button
          variant="ghost"
          className="text-gray-400"
          onClick={handleRestart}
        >
          <RotateCcw className="mr-2 w-4 h-4" /> Try Again
        </Button>
      </div>
    );
  }
};

export default ResultMessage;
