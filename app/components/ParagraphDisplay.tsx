// ParagraphDisplay.tsx

const ParagraphDisplay: React.FC<{
  shuffledParagraph: string;
  inputValue: string;
  onParagraphClick: () => void;
  isBlurVisible: boolean;
  children: any;
}> = ({
  shuffledParagraph,
  inputValue,
  onParagraphClick,
  isBlurVisible,
  children,
}) => (
  <div className="relative p-5 font-[family-name:var(--font-geist-mono)]">
    <div
      className={`absolute flex inset-3 justify-center items-center bg-opacity-50 backdrop-blur-sm z-50 transition-all  select-none duration-500 ${
        isBlurVisible
          ? "opacity-100 cursor-pointer"
          : "opacity-0 pointer-events-none"
      }`}
      onClick={onParagraphClick}
    >
      <p className="dark:text-white md:text-5xl text-center text-3xl hover:scale-110 transition ease-in-out duration-700  ">
        Klik disini untuk mulai
      </p>
    </div>
    {children}

    <p
      id="paragraph"
      className="select-none text-2xl md:text-4xl text-gray-400"
    >
      {shuffledParagraph.split("").map((char, index) => {
        const isError =
          inputValue.length > index &&
          char !== inputValue[index] &&
          char !== " ";
        const isCorrect =
          inputValue.length > index && char === inputValue[index];

        const isCharSpaced =
          inputValue.length > index &&
          char === " " &&
          inputValue[index] !== char;
        return (
          <span
            key={index}
            className={`${
              isError
                ? "text-red-700"
                : isCorrect
                ? "text-green-500"
                : isCharSpaced
                ? "bg-red-700"
                : "text-gray-400"
            }`}
          >
            {char}
          </span>
        );
      })}
    </p>
  </div>
);

export default ParagraphDisplay;
