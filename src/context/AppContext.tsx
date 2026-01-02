import { createContext, useContext, useReducer, type ReactNode } from "react";
import { getData } from "../lib/utils";
import { type BestScores, type StateType, type TestResult } from "../lib/types";

// type StateType = {
//   level: "Easy" | "Hard" | "Medium";
//   mode: "Time (60s)" | "Passage";
//   accuracy: number;
//   bestScore: number;
//   correctChars: number;
//   wrongChars: number;
//   wpm: number;
//   resetTime: false;
//   currentText: string;
//   userInput: string;
//   playStarted: boolean;
//   playEnded: boolean;
//   isPlayReset: boolean;
//   isHighestScore: boolean;
//   clock: number;
//   intervalId: number | null;
//   liveWpm: number;
// };

type ActionType =
  | { type: "SELECT_LEVEL"; payload: "Easy" | "Medium" | "Hard" }
  | { type: "SELECT_MODE"; payload: "Time (60s)" | "Passage" }
  | { type: "SET_ACCURACY"; payload: number }
  | { type: "SET_CURRENT_TEXT" }
  | { type: "SET_BEST_SCORE"; payload: number }
  | { type: "SET_BEST_SCORES"; payload: BestScores }
  | { type: "ADD_TEST_RESULT"; payload: TestResult }
  | { type: "LOAD_TEST_HISTORY"; payload: TestResult[] }
  | { type: "UPDATE_USERINPUT"; payload: string }
  | { type: "START_PLAY"; payload: boolean }
  | { type: "END_PLAY"; payload: boolean }
  | { type: "TIMER"; payload: number }
  | { type: "SET_PLAY_RESET"; payload: boolean }
  | { type: "UPDATE_WPM"; payload: number }
  | { type: "UPDATE_LIVE_WPM"; payload: number }
  | { type: "UPDATE_CORRECT_CHARS"; payload: number }
  | { type: "SET_SHOW_HISTORY_MODAL"; payload: boolean }
  | { type: "UPDATE_WRONG_CHARS"; payload: number }
  | { type: "SET_IS_HIGHEST_SCORE"; payload: boolean }
  | { type: "SET_START_TIME"; payload: number | null }
  | { type: "SET_PAUSED"; payload: boolean }
  | { type: "SET_PAUSED_TIME"; payload: number | null }
  | { type: "SET_INTERVAL_ID"; payload: number | null };

const initialState: StateType = {
  level: "Easy",
  mode: "Time (60s)",
  accuracy: 0,
  bestScore: 0,
  currentText: "",
  userInput: "",
  wpm: 0,
  resetTime: false,
  playStarted: false,
  clock: 60,
  intervalId: null,
  isPlayReset: false,
  playEnded: false,
  correctChars: 0,
  wrongChars: 0,
  isHighestScore: false,
  showHistoryModal: false,
  liveWpm: 0,
  bestScores: { easy: 0, medium: 0, hard: 0 },
  testHistory: [],
  startTime: null,
   isPaused: false,
  pausedTime: null,
};

function reducer(state: StateType, action: ActionType): StateType {
  switch (action.type) {
    case "SELECT_MODE":
      return {
        ...state,
        mode: action.payload,
      };

    case "SET_BEST_SCORE":
      return {
        ...state,
        bestScore: action.payload,
      };

    case "SET_PAUSED":
      return {
        ...state,
        isPaused: action.payload,
      };
    
    case "SET_PAUSED_TIME":
      return {
        ...state,
        pausedTime: action.payload,
      };

    case "SET_START_TIME":
      return {
        ...state,
        startTime: action.payload,
      };

    case "SET_BEST_SCORES":
      return {
        ...state,
        bestScores: action.payload,
      };
    case "ADD_TEST_RESULT":
      return {
        ...state,
        testHistory: [action.payload, ...state.testHistory].slice(0, 20), // Keep last 20 tests
      };
    case "LOAD_TEST_HISTORY":
      return {
        ...state,
        testHistory: action.payload,
      };
    case "SET_SHOW_HISTORY_MODAL":
      return {
        ...state,
        showHistoryModal: action.payload,
      };

    case "UPDATE_LIVE_WPM":
      return {
        ...state,
        liveWpm: action.payload,
      };

    case "SET_IS_HIGHEST_SCORE":
      return {
        ...state,
        isHighestScore: action.payload,
      };

    case "SET_INTERVAL_ID":
      return {
        ...state,
        intervalId: action.payload,
      };

    case "SET_PLAY_RESET":
      return {
        ...state,
        isPlayReset: action.payload,
      };
    case "UPDATE_CORRECT_CHARS":
      return {
        ...state,
        correctChars: Number(action.payload),
      };
    case "UPDATE_WRONG_CHARS":
      return {
        ...state,
        wrongChars: Number(action.payload),
      };

    case "UPDATE_WPM":
      return {
        ...state,
        wpm: action.payload,
      };

    case "SET_CURRENT_TEXT":
      const currentMode = state.level.toLowerCase() as
        | "easy"
        | "medium"
        | "hard";

      return {
        ...state,
        currentText: getData(currentMode),
      };

    case "SELECT_LEVEL":
      return {
        ...state,
        level: action.payload,
        currentText: getData(action.payload.toLowerCase()),
      };

    case "UPDATE_USERINPUT":
      return {
        ...state,
        userInput: action.payload,
      };

    case "START_PLAY":
      return {
        ...state,
        playStarted: action.payload,
      };

    case "END_PLAY":
      return {
        ...state,
        playEnded: action.payload,
      };

    case "SET_ACCURACY":
      // work to do
      return {
        ...state,
        accuracy: action.payload,
      };

    case "TIMER":
      return {
        ...state,
        clock: action.payload,
      };

    default:
      return state;
  }
}

const AppContext = createContext<{
  state: StateType;
  dispatch: React.Dispatch<ActionType>;
}>({
  state: initialState,
  dispatch: () => null,
});

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
