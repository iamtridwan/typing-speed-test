import { useAppContext } from "../context/AppContext";
import { handleTimer } from "../lib/utils";

const Modal = () => {
  const { state, dispatch } = useAppContext();
  return (
    <div className="absolute top-0 left-0 w-full h-full  backdrop-blur-md bg-black/5">
      <div className="w-full h-full flex items-center flex-col justify-center">
        {state.isPlayReset ? (
          <>
            <p className="text-white mt-2">Are you sure you want to restart?</p>
            <div className="flex items-center justify-center gap-4 mt-6">
              <button
                type="button"
                onClick={() => {
                  dispatch({ type: "START_PLAY", payload: true });
                  dispatch({ type: "SET_PLAY_RESET", payload: false });
                  dispatch({ type: "SET_INTERVAL_ID", payload: null });
                  dispatch({ type: "SELECT_LEVEL", payload: state.level });
                  dispatch({
                    type: "TIMER",
                    payload: state.mode === "Passage" ? 0 : 60,
                  });
                  dispatch({ type: "SELECT_LEVEL", payload: state.level });
                  dispatch({ type: "SET_CURRENT_TEXT" });
                  handleTimer(state, dispatch);
                }}
                className="bg-[#D64D5B] hover:cursor-pointer w-24 text-white rounded-lg p-3 text-base font-medium"
              >
                Restart
              </button>
              <button
                type="button"
                onClick={() => {
                  dispatch({ type: "START_PLAY", payload: true });
                  dispatch({ type: "SET_PLAY_RESET", payload: false });
                  dispatch({ type: "SET_INTERVAL_ID", payload: state.clock });
                  dispatch({
                    type: "TIMER",
                    payload: state.mode === "Passage" ? 0 : state.clock,
                  });
                  handleTimer(state, dispatch);
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
              onClick={() => {
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
