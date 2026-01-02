import { useEffect, useRef, useState } from "react";
import Modal from "./Modal";
import { useAppContext } from "../context/AppContext";
import { stopTimer } from "../lib/utils";
import RestartIcon from "../assets/images/icon-restart.svg";
import LiveStats from "./LiveStats"; // ✅ Import

const TextArea = () => {
  const { state, dispatch } = useAppContext();
  const [userInput, setUserInpur] = useState("");
  const inputRef = useRef<HTMLInputElement | null>(null);

  // make user able to type
  useEffect(() => {
    if (state.playStarted) {
      inputRef.current?.focus();
    }
  }, [state.playStarted]);

  // Calculate live WPM every second while typing
  useEffect(() => {
    if (!state.playStarted || state.playEnded) {
      return;
    }

    const wpmInterval = setInterval(() => {
      const timeElapsed = (60 - state.clock) / 60; // in minutes
      
      if (timeElapsed > 0 && state.correctChars > 0) {
        const wordsTyped = state.correctChars / 5; // Average word length
        const liveWpm = Math.round(wordsTyped / timeElapsed);
        dispatch({ type: "UPDATE_LIVE_WPM", payload: liveWpm });
      }
    }, 1000); // Update every second

    return () => clearInterval(wpmInterval);
  }, [state.playStarted, state.playEnded, state.clock, state.correctChars, dispatch]);

  // update user inputted text and track correct/wrong chars
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (state.userInput.length < state.currentText.length) {
      const newInput = e.target.value;
      const newCharIndex = newInput.length - 1;
      
      // Track the new character typed
      if (newCharIndex >= 0 && newCharIndex < state.currentText.length) {
        const isCorrect = newInput[newCharIndex] === state.currentText[newCharIndex];
        
        if (isCorrect) {
          dispatch({
            type: 'UPDATE_CORRECT_CHARS',
            payload: state.correctChars + 1
          });
        } else {
          dispatch({
            type: 'UPDATE_WRONG_CHARS',
            payload: state.wrongChars + 1
          });
        }
      }
      
      dispatch({ type: "UPDATE_USERINPUT", payload: newInput });
      setUserInpur(newInput);
    }
  };

  // disable tab, backspace and delete keys
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === "Backspace" || e.key === "Delete" || e.key === "Tab") {
      e.preventDefault();
      return;
    }
  };

  // stop timer when user finish typing before end of count down
  useEffect(() => {
    if (
      state.playStarted && 
      state.userInput.length > 0 && 
      state.userInput.length >= state.currentText.length
    ) {
      inputRef.current!.value = "";
      inputRef.current?.blur();
      setUserInpur("");

      // Stop the timer
      stopTimer(state, dispatch);
      dispatch({ type: "END_PLAY", payload: true });
    }
  }, [state.userInput]);

  // clear interval to avoid memory leak
  useEffect(() => {
    return () => {
      if (state.intervalId) {
        clearInterval(state.intervalId);
      }
    };
  }, [state.intervalId]);

  return (
    <div className="w-full p-2 md:p-5 h-fit relative">
      <input
        type="text"
        ref={inputRef}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        className="absolute top-0 left-0 opacity-0 w-full cursor-default"
      />
      
      {/* Live Stats - Show above text */}
      <LiveStats />

      <p className="text-start text-lg mb-2 md:text-xl lg:text-2xl leading-8 md:leading-12 text-[#949497] pb-5 border-[#949497] border-b mt-6">
        {state.currentText.split("").map((char, index) => {
          let color = "#949497";
          let borderBottom = "none";
          if (index < state.userInput.length) {
            color = char === userInput[index] ? "#4DD67B" : "#D64D5B";
            borderBottom =
              char === userInput[index] ? "none" : "1px solid #D64D5B";
          }
          return (
            <span key={index} style={{ color, borderBottom }}>
              {char}
            </span>
          );
        })}
      </p>
      
      <div className="w-full flex items-center justify-center mt-4">
        <button
          type="button"
          onClick={() => {
            dispatch({ type: "SET_PLAY_RESET", payload: true });
            dispatch({ type: "START_PLAY", payload: false });
            dispatch({ type: "END_PLAY", payload: false });
            dispatch({ type: "UPDATE_USERINPUT", payload: "" });
            dispatch({ type: "UPDATE_CORRECT_CHARS", payload: 0 });
            dispatch({ type: "UPDATE_WRONG_CHARS", payload: 0 });
            dispatch({ type: "UPDATE_WPM", payload: 0 });
            dispatch({ type: "UPDATE_LIVE_WPM", payload: 0 }); // ✅ Reset live WPM
            dispatch({ type: "SET_ACCURACY", payload: 0 });
            dispatch({ type: "TIMER", payload: 60 });
            setUserInpur("");
            stopTimer(state, dispatch);
          }}
          className="flex text-white gap-2 bg-[#262626] rounded-lg p-2 items-center justify-center hover:bg-[#333333] transition-colors"
        >
          <span>Restart Test</span>
          <img src={RestartIcon} alt="refresh icon" />
        </button>
      </div>
      {!state.playStarted && <Modal />}
    </div>
  );
};

export default TextArea;