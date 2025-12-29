import { createContext, useContext, useReducer, type ReactNode } from "react";
import data from "../lib/data.json";

type StateType = {
  level: "Easy" | "Hard" | "Medium";
  mode: "Time (60s)" | "Passage";
  accuracy: number;
  bestScore: number;
  wpm: number;
  resetTime: false;
  currentText: string;
  userInput: string;
};

type ActionType =
  | { type: "SELECT_LEVEL"; payload: "Easy" | "Medium" | "Hard" }
  | { type: "SELECT_MODE"; payload: "Time (60s)" | "Passage" }
  | { type: "SET_ACCURACY"; payload: number }
  | { type: "SET_CURRENT_TEXT"; payload: "Easy" | "Medium" | "Hard" }
  | { type: "UPDATE_USERINPUT"; payload: string }
  | { type: "RESET_USERINPUT"; payload: string };

const initialState: StateType = {
  level: "Easy",
  mode: "Time (60s)",
  accuracy: 0,
  bestScore: 0,
  currentText: "",
  userInput: "",
  wpm: 0,
  resetTime: false,
};

function reducer(state: StateType, action: ActionType): StateType {
  switch (action.type) {
    case "SELECT_MODE":
      return {
        ...state,
        mode: action.payload,
      };

    case "SET_CURRENT_TEXT":
      const currentMode = state.level.toLowerCase() as
        | "easy"
        | "medium"
        | "hard";
      const texts: any[] = data[currentMode];
      const randomNumber = Math.random() * texts.length;
      return {
        ...state,
        currentText: texts[randomNumber],
      };

    case "SELECT_LEVEL":
      return {
        ...state,
        level: action.payload,
      };

    case "UPDATE_USERINPUT":
      return {
        ...state,
        userInput: action.payload,
      };

    case "RESET_USERINPUT":
      return {
        ...state,
        userInput: "",
      };

    case "SET_ACCURACY":
      // work to do
      return {
        ...state,
        accuracy: 100,
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
