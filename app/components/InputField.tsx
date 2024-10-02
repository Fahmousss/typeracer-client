import React, { forwardRef } from "react";

const InputField = forwardRef<
  HTMLInputElement,
  {
    inputValue: string;
    onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onFocus: () => void;
    onBlur: () => void;
    maxLength: number;
  }
>(({ inputValue, onInputChange, onFocus, onBlur, maxLength }, ref) => (
  <input
    maxLength={maxLength}
    type="text"
    id="input-field"
    ref={ref} // Attach the forwarded ref here
    value={inputValue}
    onChange={onInputChange}
    onFocus={onFocus}
    onBlur={onBlur}
    className="w-full h-full opacity-0 cursor-none inset-1 -z-10 absolute"
    autoComplete="off"
  />
));

export default InputField;
