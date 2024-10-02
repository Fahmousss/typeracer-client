"use client";

import { useEffect, useState, useRef } from "react";
import { paragraph as fullParagraph } from "@/lib/paragraph";
import TimerDisplay from "@/app/components/TimerComponent";
import { Controls } from "@/app/components/Controls";
import ParagraphDisplay from "@/app/components/ParagraphDisplay";
import InputField from "@/app/components/InputField";
import ResultMessage from "@/app/components/ResultMessage";
import { Skeleton } from "@/components/ui/skeleton";

// Helper function to shuffle an array
function shuffleArray(array: string[]) {
  return array.sort(() => Math.random() - 0.5);
}

// Function to remove punctuation from a string
function removePunctuation(text: string) {
  return text.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()?"']/g, "");
}

// Function to get a shuffled paragraph
function getShuffledParagraph(paragraph: string, excludePunctuation: boolean) {
  let modifiedParagraph = paragraph;

  // Exclude punctuation if the checkbox is selected
  if (excludePunctuation) {
    modifiedParagraph = removePunctuation(modifiedParagraph);
  }

  const wordsArray = modifiedParagraph.split(" ");
  const shuffledArray = shuffleArray(wordsArray);
  const slicedArray = shuffledArray.slice(0, 50); // Get first 50 words
  return slicedArray.join(" ");
}

const TypingTest: React.FC = () => {
  const inputRef = useRef<HTMLInputElement | null>(null); // Reference to the input field
  const timeLimitRef = useRef<number>(30); // Ref to store the current time limit
  const [inputValue, setInputValue] = useState<string>(""); // Input value for typing
  const [isFinished, setIsFinished] = useState<boolean>(false); // Track if typing is finished
  const [timeLeft, setTimeLeft] = useState<number>(timeLimitRef.current); // Timer starting at current time limit
  const [isTimeUp, setIsTimeUp] = useState<boolean>(false); // Track if time is up
  const [timerStarted, setTimerStarted] = useState<boolean>(false); // Track if timer has started
  const [isPaused, setIsPaused] = useState<boolean>(false); // Track if timer is paused
  const [shuffledParagraph, setShuffledParagraph] = useState<string>(""); // The paragraph to type
  const [excludePunctuation, setExcludePunctuation] = useState<boolean>(true); // Toggle for excluding punctuation
  const [isBlurVisible, setIsBlurVisible] = useState<boolean>(true); // Control visibility of blur layer
  const [loading, setLoading] = useState<boolean>(true); // State for loading
  const [useTimeBomb, setUseTimeBomb] = useState<boolean>(true); // Toggle for enabling/disabling the timer (time bomb)
  const musicRef = useRef<HTMLAudioElement | null>(null);
  const [isMuted, setIsMuted] = useState<boolean>(true);

  // State for WPM and CPM
  const [wpm, setWpm] = useState<number>(0);
  const [cpm, setCpm] = useState<number>(0);

  // Badges and titles based on WPM/CPM

  useEffect(() => {
    const generateParagraph = async () => {
      setLoading(true); // Set loading to true while generating the paragraph
      const newParagraph = getShuffledParagraph(
        fullParagraph,
        excludePunctuation
      );
      setShuffledParagraph(newParagraph);
      setLoading(false); // Set loading to false once paragraph is ready
    };

    generateParagraph();
  }, [excludePunctuation]); // Rerun effect when excludePunctuation changes

  useEffect(() => {
    // Initialize background music
    musicRef.current = new Audio("/audio/background-music-3.mp3");
    musicRef.current.currentTime = 20;
    musicRef.current.loop = true; // Loop the music
    musicRef.current.volume = isMuted ? 0 : 1.0; // Set volume (0.0 to 1.0)

    // Play the music when the component mounts
    musicRef.current.play().catch((error) => {
      console.error("Error playing music:", error);
    });

    return () => {
      musicRef.current?.pause(); // Pause music on component unmount
    };
  }, [isMuted]);
  useEffect(() => {
    let timer: NodeJS.Timeout;

    // Start the timer when the test begins, only if the time bomb is active
    if (
      useTimeBomb &&
      timeLeft > 0 &&
      !isFinished &&
      !isTimeUp &&
      timerStarted &&
      !isPaused
    ) {
      timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
        calculateWpmCpm(); // Call WPM/CPM calculation
      }, 1000);
    } else if (timeLeft === 0) {
      setIsTimeUp(true);
      setIsFinished(true);
    }

    return () => clearInterval(timer); // Cleanup timer on component unmount
  }, [timeLeft, isFinished, isTimeUp, timerStarted, isPaused, useTimeBomb]);

  // Function to calculate correct WPM and CPM based on the input
  const calculateWpmCpm = () => {
    const minutesPassed = (timeLimitRef.current - timeLeft) / 60;

    // Split the input and shuffled paragraph into words
    const inputWords = inputValue.trim().split(/\s+/);
    const paragraphWords = shuffledParagraph.split(/\s+/);

    // Calculate correct words and characters
    const correctWords = inputWords.filter(
      (word, index) => word === paragraphWords[index]
    ).length;
    const correctChars = inputWords.reduce((charCount, word, index) => {
      if (word === paragraphWords[index]) {
        return charCount + word.length;
      }
      return charCount;
    }, 0);

    // Calculate WPM and CPM based on correct input only
    if (minutesPassed > 0) {
      setWpm(Math.round(correctWords / minutesPassed));
      setCpm(Math.round(correctChars / minutesPassed));
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value; // Get the input value
    setInputValue(value); // Update the input value

    // Check if the input matches the entire paragraph
    if (value === shuffledParagraph) {
      setIsFinished(true); // Mark as finished if the entire paragraph is typed correctly
    }
  };

  const handleParagraphClick = () => {
    // Focus on the input field to start typing
    inputRef.current?.focus();
  };

  const handleInputFocus = () => {
    // Start the timer when the input is focused, only if the time bomb is active
    if (!timerStarted) {
      setTimerStarted(true);
    }
    setIsPaused(false); // Unpause the timer when focused
    setIsBlurVisible(false); // Hide the blur layer when focused
  };

  const handleInputBlur = () => {
    // Pause the timer when the input loses focus
    setIsPaused(true);
    setIsBlurVisible(true); // Show the blur layer when blurred
  };

  const handleMute = () => {
    setIsMuted(!isMuted);
  };

  const handleRestart = () => {
    // Reset input, finish state, and timer
    setInputValue("");
    setIsFinished(false);
    setIsTimeUp(false); // Reset time up state
    setTimerStarted(false); // Reset timer state
    setIsPaused(false); // Reset pause state
    setTimeLeft(timeLimitRef.current); // Reset to the current time limit
    setShuffledParagraph(
      getShuffledParagraph(fullParagraph, excludePunctuation)
    ); // Shuffle the paragraph
    setIsBlurVisible(true);
    setWpm(0); // Reset WPM
    setCpm(0); // Reset CPM
  };

  const handleTimeLimitChange = (newTime: number) => {
    timeLimitRef.current = newTime; // Update the time limit reference
    if (timerStarted) {
      // Restart the test when changing the time limit during the test
      handleRestart();
    }
    setTimeLeft(newTime); // Update the time left when selected
  };

  const togglePunctuation = () => {
    setExcludePunctuation(!excludePunctuation); // Toggle the exclusion of punctuation
    handleRestart();
  };

  const toggleTimeBomb = () => {
    setUseTimeBomb(!useTimeBomb); // Toggle the use of the time bomb (timer)
    handleRestart();
  };

  return (
    <div className="relative">
      {useTimeBomb && <TimerDisplay timeLeft={timeLeft} />}
      <Controls
        timeLeft={timeLeft}
        excludePunctuation={excludePunctuation}
        onChangeTimeLimit={handleTimeLimitChange}
        togglePunctuation={togglePunctuation}
        toggleTimeBomb={toggleTimeBomb} // Add toggleTimeBomb function
        useTimeBomb={useTimeBomb} // Pass the time bomb state
        handleRestart={handleRestart}
        muteAudio={handleMute}
        isMuted={isMuted}
      />
      <div
        className={`relative px-5 justify-center flex text-4xl transition-opacity select-none text-orange-400 font-medium duration-500 ${
          isBlurVisible ? "opacity-0" : "opacity-100"
        }`}
      >
        Start Typing!
      </div>
      {!loading ? (
        <>
          <ParagraphDisplay
            shuffledParagraph={shuffledParagraph}
            inputValue={inputValue}
            onParagraphClick={handleParagraphClick}
            isBlurVisible={isBlurVisible}
          />
        </>
      ) : (
        <Skeleton className="relative px-[170px] sm:px-[292px] md:px-[429.5px] lg:px-[595.5px]  sm:py-[150px] py-[232px]" />
      )}
      {!isFinished && !isTimeUp && (
        <InputField
          maxLength={shuffledParagraph.length}
          inputValue={inputValue}
          onInputChange={handleInputChange}
          onFocus={handleInputFocus}
          onBlur={handleInputBlur}
          ref={inputRef}
        />
      )}

      <ResultMessage
        isFinished={isFinished}
        isTimeUp={isTimeUp}
        handleRestart={handleRestart}
        wpm={wpm}
        cpm={cpm}
      />
    </div>
  );
};

export default TypingTest;
