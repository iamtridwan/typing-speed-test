import SuccessIcon from "../assets/images/icon-completed.svg";
import StarOne from "../assets/images/pattern-star-1.svg";
import StarTwo from "../assets/images/pattern-star-2.svg";
import Confetti from "../assets/images/pattern-confetti.svg";
import NewPBIcon from "../assets/images/icon-new-pb.svg";
import { useAppContext } from "../context/AppContext";
import RestartIcon from "../assets/images/icon-restart.svg";
import { stopTimer } from "../lib/utils";

const CompleteModal = () => {
  const { state, dispatch } = useAppContext();

  // Check if this is a new best for current level
  const currentLevelBest =
    state.bestScores[state.level.toLowerCase() as "easy" | "medium" | "hard"];
  const isNewBest = state.wpm > 0 && state.wpm >= currentLevelBest;

  return (
    <div className="w-full h-screen z-10 absolute top-18 md:top-20 left-0 bg-[#121212] flex items-start pt-12 md:pt-28 md:items-center justify-center">
      <div className="flex items-center justify-center relative w-full flex-col gap-4">
        {isNewBest ? (
          <img src={NewPBIcon} alt="personal best icon" className="w-11 h-11" />
        ) : (
          <div className="rounded-full w-20 h-20 bg-[#4DD67B]/10 flex items-center justify-center">
            <div className="rounded-full w-15 h-15 bg-[#4DD67B]/40 flex items-center justify-center">
              <img
                src={SuccessIcon}
                alt="completed icon"
                className="w-11 h-11"
              />
            </div>
          </div>
        )}

        <div className="text-center">
          <h2 className="text-white font-bold text-lg md:text-xl lg:text-2xl">
            {
              isNewBest ? "High Score Smashed!" : " Test Complete!"
            }
           
          </h2>
          <p className="text-[#949497] w-[95%] mx-auto md:w-full">
            {
              isNewBest ? "You’re getting faster. That was incredible typing." : "Solid run. Keep pushing to beat your high score."
            }
          </p>
        </div>

        {/* New Best Score Badge */}
        {isNewBest && (
          <div className="bg-[#4DD67B]/10 border border-[#4DD67B] rounded-lg px-4 py-2 animate-pulse">
            <p className="text-[#4DD67B] font-semibold">
              🎉 New Best Score for {state.level}!
            </p>
          </div>
        )}

        <div className="flex px-8 gap-2 items-center flex-col md:flex-row w-full md:w-[80%] lg:w-[40%]">
          <div className="w-full border border-[#949497] text-start px-3 py-2 rounded-md">
            <p className="text-[#949497] text-base m-0 md:text-lg">WPM:</p>
            <p className="text-white font-bold m-0 text-xl md:text-lg">
              {state.wpm}
            </p>
          </div>
          <div className="w-full border border-[#949497] px-3 py-2 text-start rounded-md">
            <p className="text-[#949497] text-base m-0 md:text-lg">Accuracy:</p>
            <p
              className={`${
                state.accuracy < 100 ? "text-[#D64D5B]" : "text-white"
              } font-bold m-0 text-xl md:text-lg`}
            >
              {state.accuracy}%
            </p>
          </div>
          <div className="w-full border border-[#949497] px-3 py-2 text-start rounded-md">
            <p className="text-[#949497] text-base m-0 md:text-lg">
              Characters
            </p>
            <p className="text-[#949497] m-0 text-xl md:text-lg">
              <span className="text-[#4DD67B] font-bold">
                {state.correctChars}
              </span>
              /
              <span className="text-[#D64D5B] font-bold">
                {state.wrongChars}
              </span>
            </p>
          </div>
        </div>

        <div className="w-full mt-8 flex items-center justify-center">
          <button
            type="button"
            onClick={() => {
              stopTimer(state, dispatch);

              dispatch({ type: "END_PLAY", payload: false });
              dispatch({ type: "START_PLAY", payload: false });
              dispatch({ type: "UPDATE_USERINPUT", payload: "" });
              dispatch({ type: "UPDATE_CORRECT_CHARS", payload: 0 });
              dispatch({ type: "UPDATE_WRONG_CHARS", payload: 0 });
              dispatch({ type: "UPDATE_WPM", payload: 0 });
              dispatch({ type: "UPDATE_LIVE_WPM", payload: 0 });
              dispatch({ type: "SET_ACCURACY", payload: 0 });
              dispatch({ type: "SET_SHOW_HISTORY_MODAL", payload: false });
              dispatch({ type: "SET_START_TIME", payload: null });
              dispatch({ type: "SET_CURRENT_TEXT" });
              dispatch({ type: "TIMER", payload: 60 });
            }}
            className="transition-colors cursor-pointer flex text-white gap-2 bg-[#262626] rounded-lg p-2 items-center justify-center hover:bg-[#333333]"
          >
            <span>Restart Test</span>
            <img src={RestartIcon} alt="refresh icon" />
          </button>
        </div>
        <img
          src={StarOne}
          alt="star icon"
          className={`${
            isNewBest ? "hidden" : "max-w-[3rem] absolute -bottom-16 right-5"
          }`}
        />
        <img
          src={StarTwo}
          alt="star icon"
          className={`${
            isNewBest ? "hidden" : "max-w-[3rem] absolute top-6 left-12"
          }`}
        />
        <img
          src={Confetti}
          alt="star icon"
          className={`${isNewBest ? "max-w-full mt-10" : "hidden"}`}
        />
      </div>
    </div>
  );
};

export default CompleteModal;
