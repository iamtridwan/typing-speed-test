import { useAppContext } from "../context/AppContext";

// type Props = {
//   time: number;
// };

const ScoreBoard = () => {
  const { state, dispatch } = useAppContext();

  const currentLevelBest =
    state.bestScores[state.level.toLowerCase() as "easy" | "medium" | "hard"];

  return (
    <div className="relative flex items-center mt-6 md:mt-0 md:items-end md:gap-4 justify-between md:justify-start w-full md:w-fit">
      {/* Current Level Best Score */}
      <div className="bg-[#262626] rounded-lg p-4 border border-[#949497]/20">
        <p className="text-[#949497] text-sm mb-1">Best ({state.level})</p>
        <p className="text-white font-bold text-2xl">{currentLevelBest} WPM</p>
      </div>
      {/* All Best Scores */}
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <span className="text-[#949497] text-xs w-16">Easy:</span>
          <span className="text-white font-semibold">
            {state.bestScores?.easy}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[#949497] text-xs w-16">Medium:</span>
          <span className="text-white font-semibold">
            {state.bestScores?.medium}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[#949497] text-xs w-16">Hard:</span>
          <span className="text-white font-semibold">
            {state.bestScores?.hard}
          </span>
        </div>
      </div>
      <button
        type="button"
        onClick={() =>
          dispatch({ type: "SET_SHOW_HISTORY_MODAL", payload: true })
        }
        className="absolute -top-10 left-3 md:relative md:top-0 md:left-0 rounded-md text-white cursor-pointer bg-none hover:text-[#F4DC73] hover:underline transition-all"
      >
        See History
      </button>
    </div>
  );
};

export default ScoreBoard;
