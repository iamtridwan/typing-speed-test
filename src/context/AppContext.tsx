import { createContext, useContext, useReducer, type ReactNode } from "react";
import { getData } from "../lib/utils";

type StateType = {
  level: "Easy" | "Hard" | "Medium";
  mode: "Time (60s)" | "Passage";
  accuracy: number;
  bestScore: number;
  wpm: number;
  resetTime: false;
  currentText: string;
  userInput: string;
  playStarted: boolean;
  isPlayReset: boolean;
  clock: number;
  intervalId: number | null;
};

type ActionType =
  | { type: "SELECT_LEVEL"; payload: "Easy" | "Medium" | "Hard" }
  | { type: "SELECT_MODE"; payload: "Time (60s)" | "Passage" }
  | { type: "SET_ACCURACY"; payload: number }
  | { type: "SET_CURRENT_TEXT" }
  | { type: "UPDATE_USERINPUT"; payload: string }
  | { type: "START_PLAY"; payload: boolean }
  | { type: "TIMER"; payload: number }
  | { type: "SET_PLAY_RESET"; payload: boolean }
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
};

function reducer(state: StateType, action: ActionType): StateType {
  switch (action.type) {
    case "SELECT_MODE":
      return {
        ...state,
        mode: action.payload,
      };

    case "SET_INTERVAL_ID":
      return {
        ...state,
        intervalId: action.payload,
      };

    case 'SET_PLAY_RESET':
        return {
            ...state,
            isPlayReset: action.payload
        }

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

    case "SET_ACCURACY":
      // work to do
      return {
        ...state,
        accuracy: 100,
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
