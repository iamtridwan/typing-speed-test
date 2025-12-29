import { useEffect, useRef, useState } from "react";
import Modal from "./Modal";

type Props = {
  currentText: string;
  startTime: boolean;
  clearInput: boolean;
  setStartTime: () => void;
  setAccuracy: (val: number) => void;
};

const TextArea = ({
  currentText,
  startTime,
  setStartTime,
  clearInput,
  setAccuracy,
}: Props) => {
  const [userInput, setUserInpur] = useState("");
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [typeScore, setTypeScore] = useState({
    corrent: 0,
    wrong: 0,
    total: currentText.length,
  });

  useEffect(() => {
    if (startTime) {
      inputRef.current?.focus();
    }
  }, [startTime]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (userInput.length === currentText.length) {
      let accuracy = (typeScore["corrent"] / typeScore["total"]) * 100;
      setAccuracy(accuracy);
    } else {
      setUserInpur(e.target.value);
    }
  };

  useEffect(() => {
    if (clearInput) {
      inputRef.current!.value = "";
      inputRef.current?.focus();
      setUserInpur("");
    }
  }, [clearInput]);

  return (
    <div className="w-full p-2 md:p-5 h-fit relative">
      <input
        type="text"
        ref={inputRef}
        onChange={handleChange}
        className="absolute top-0 left-0 opacity-0 w-full cursor-default"
      />
      <p className="text-start text-lg md:text-xl lg:text-2xl leading-8 md:leading-12 text-[#949497]">
        {currentText.split("").map((char, index) => {
          let color = "#949497";
          if (index < userInput.length) {
            color = char === userInput[index] ? "#4DD67B" : "#D64D5B";
          }
          return (
            <span key={index} style={{ color }}>
              {char}
            </span>
          );
        })}
      </p>
      {!startTime && <Modal setStartTime={setStartTime} />}
    </div>
  );
};

export default TextArea;
