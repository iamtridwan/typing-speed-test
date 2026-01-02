import { useAppContext } from "../context/AppContext";
import { handleTimer, stopTimer, resumeTimer } from "../lib/utils";

const Modal = () => {
  const { state, dispatch } = useAppContext();
  
  const handleRestart = (e: React.MouseEvent) => {
    e.stopPropagation();
    
    // Stop any running timer
    stopTimer(state, dispatch);
    
    // Reset ALL state completely
    dispatch({ type: "UPDATE_USERINPUT", payload: '' });
    dispatch({ type: "UPDATE_CORRECT_CHARS", payload: 0 });
    dispatch({ type: "UPDATE_WRONG_CHARS", payload: 0 });
    dispatch({ type: "UPDATE_WPM", payload: 0 });
    dispatch({ type: "UPDATE_LIVE_WPM", payload: 0 });
    dispatch({ type: "SET_ACCURACY", payload: 0 });
    dispatch({ type: "SET_START_TIME", payload: null });
    dispatch({ type: "SET_PAUSED_TIME", payload: null });
    dispatch({ type: "SET_PAUSED", payload: false });
    dispatch({ type: "SET_PLAY_RESET", payload: false });
    dispatch({ type: "END_PLAY", payload: false });
    dispatch({ type: "TIMER", payload: state.mode === "Passage" ? 0 : 60 });
    
    // Get new text for the selected level
    dispatch({ type: "SET_CURRENT_TEXT" });
    
    // Wait for state to update, then start
    setTimeout(() => {
      dispatch({ type: "START_PLAY", payload: true });
      // Use fresh state for timer
      const freshState = {
        ...state,
        clock: state.mode === "Passage" ? 0 : 60,
        userInput: '',
        correctChars: 0,
        wrongChars: 0,
      };
      handleTimer(freshState, dispatch);
    }, 50);
  };
  
  return (
    <div
      className="absolute top-0 left-0 w-full h-full backdrop-blur-md bg-black/5"
      onClick={() => {
        // Only allow click-through to start if not in pause mode
        if (!state.isPlayReset) {
          dispatch({ type: "START_PLAY", payload: true });
          dispatch({ type: "SET_PLAY_RESET", payload: false });
          handleTimer(state, dispatch);
        }
      }}
    >
      <div className="w-full h-full flex items-center flex-col justify-center">
        {state.isPlayReset && state.playStarted ? (
          // Pause Menu
          <>
            <p className="text-white text-xl font-semibold mb-2">Test Paused</p>
            <p className="text-[#949497] mb-6">Choose an option to continue</p>
            <div className="flex items-center justify-center gap-4">
              <button
                type="button"
                onClick={handleRestart}
                className="bg-[#D64D5B] hover:bg-[#c43d4d] hover:cursor-pointer w-32 text-white rounded-lg p-3 text-base font-medium transition-colors"
              >
                Restart
              </button>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  
                  // Resume from pause
                  dispatch({ type: "SET_PLAY_RESET", payload: false });
                  resumeTimer(state, dispatch);
                }}
                className="bg-[#177DFF] hover:bg-[#1565cc] hover:cursor-pointer w-32 text-white rounded-lg p-3 text-base font-medium transition-colors"
              >
                Continue
              </button>
            </div>
          </>
        ) : (
          // Initial Start Menu
          <>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                dispatch({ type: "START_PLAY", payload: true });
                dispatch({ type: "SET_PLAY_RESET", payload: false });
                handleTimer(state, dispatch);
              }}
              className="bg-[#177DFF] hover:bg-[#1565cc] hover:cursor-pointer text-white rounded-lg p-3 text-base font-medium transition-colors"
            >
              Start Typing Test
            </button>
            <p className="text-white mt-2">
              Or click the text and start typing
            </p>
          </>
        )}
      </div>
    </div>
  );
};

export default Modal;