import { useAppContext } from "../context/AppContext";
import { handleTimer, stopTimer } from "../lib/utils";

const Modal = () => {
  const { state, dispatch } = useAppContext();
  
  return (
    <div
      className="absolute top-0 left-0 w-full h-full backdrop-blur-md bg-black/5"
      onClick={() => {
        dispatch({ type: "START_PLAY", payload: true });
        dispatch({ type: "SET_PLAY_RESET", payload: false });
        handleTimer(state, dispatch);
      }}
    >
      <div className="w-full h-full flex items-center flex-col justify-center">
        {state.isPlayReset ? (
          <>
            <p className="text-white mt-2">Are you sure you want to restart?</p>
            <div className="flex items-center justify-center gap-4 mt-6">
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation(); // Prevent parent div click
                  
                  // Clear any existing timer
                  stopTimer(state, dispatch);
                  
                  // Reset everything to initial state
                  dispatch({ type: "UPDATE_USERINPUT", payload: '' });
                  dispatch({ type: "UPDATE_CORRECT_CHARS", payload: 0 });
                  dispatch({ type: "UPDATE_WRONG_CHARS", payload: 0 });
                  dispatch({ type: "UPDATE_WPM", payload: 0 });
                  dispatch({ type: "SET_ACCURACY", payload: 0 });
                  dispatch({ type: "SET_CURRENT_TEXT" });
                  dispatch({ type: "TIMER", payload: state.mode === "Passage" ? 0 : 60 });
                  dispatch({ type: "SET_PLAY_RESET", payload: false });
                  dispatch({ type: "START_PLAY", payload: true });
                  
                  // Start new timer
                  handleTimer(state, dispatch);
                }}
                className="bg-[#D64D5B] hover:cursor-pointer w-24 text-white rounded-lg p-3 text-base font-medium"
              >
                Restart
              </button>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation(); // Prevent parent div click
                  
                  dispatch({ type: "START_PLAY", payload: true });
                  dispatch({ type: "SET_PLAY_RESET", payload: false });
                  dispatch({ type: "UPDATE_LIVE_WPM", payload: 0 });
                  // Don't call handleTimer again - the timer is already running!
                }}
                className="bg-[#177DFF] hover:cursor-pointer w-24 text-white rounded-lg p-3 text-base font-medium"
              >
                Continue
              </button>
            </div>
          </>
        ) : (
          <>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation(); // Prevent parent div click
                dispatch({ type: "START_PLAY", payload: true });
                dispatch({ type: "SET_PLAY_RESET", payload: false });
                handleTimer(state, dispatch);
              }}
              className="bg-[#177DFF] hover:cursor-pointer text-white rounded-lg p-3 text-base font-medium"
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