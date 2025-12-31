import { useEffect, useRef, useState } from "react";
import Modal from "./Modal";
import { useAppContext } from "../context/AppContext";
import { handleTimer } from "../lib/utils";

// type Props = {
//   currentText: string;
//   startTime: boolean;
//   clearInput: boolean;
//   setStartTime: () => void;
//   setAccuracy: (val: number) => void;
// };

const TextArea = () => {
  const { state, dispatch } = useAppContext();
  const [userInput, setUserInpur] = useState("");
  const inputRef = useRef<HTMLInputElement | null>(null);
  //   const [typeScore, setTypeScore] = useState({
  //     corrent: 0,
  //     wrong: 0,
  //     total: currentText.length,
  //   });

  useEffect(() => {
    if (state.playStarted) {
      inputRef.current?.focus();
    }
  }, [state.playStarted]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (state.userInput.length < state.currentText.length) {
      dispatch({ type: "UPDATE_USERINPUT", payload: e.target.value });
      setUserInpur(e.target.value);
    } 
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>): void => {
    // `e.key` works in all modern browsers and is clearer than keyCode
    if (e.key === "Backspace" || e.key === "Delete" || e.key === "Tab") {
      // If you want to *completely* forbid any removal, just block it:
      e.preventDefault(); // ← stops the default delete action
      // (optional) give the user feedback – e.g. flash the input border
      // console.warn("Backspace/Delete are disabled in this field");
      return;
    }
  };

  useEffect(() => {
    if (state.userInput.length >= state.currentText.length) {
      inputRef.current!.value = "";
      inputRef.current?.blur();
      setUserInpur("");
      handleTimer(state, dispatch, 'textarea')
      // dispatch({type: 'UPDATE_USERINPUT', payload: ''})
      dispatch({ type: "START_PLAY", payload: false });
    } 
  }, [state.userInput]);

  return (
    <div className="w-full p-2 md:p-5 h-fit relative">
      <input
        type="text"
        ref={inputRef}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        className="absolute top-0 left-0 opacity-0 w-full cursor-default"
      />
      <p className="text-start text-lg md:text-xl lg:text-2xl leading-8 md:leading-12 text-[#949497]">
        {state.currentText.split("").map((char, index) => {
          let color = "#949497";
          let borderBottom = 'none'
          if (index < state.userInput.length) {
            color = char === userInput[index] ? "#4DD67B" : "#D64D5B";
            borderBottom = char === userInput[index] ? 'none' : '1px solid #D64D5B'
          }
          return (
            <span key={index} style={{ color, borderBottom }}>
              {char}
            </span>
          );
        })}
      </p>
      {!state.playStarted && <Modal />}
    </div>
  );
};

export default TextArea;
