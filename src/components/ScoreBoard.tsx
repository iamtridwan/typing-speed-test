import { useAppContext } from "../context/AppContext";

const ScoreBoard = () => {
  const { state } = useAppContext();
  
  // Get current level's best score
  const currentLevelBest = state.bestScores[state.level.toLowerCase() as 'easy' | 'medium' | 'hard'];

  return (
    <div className="flex items-center gap-4">
      {/* Current Level Best Score */}
      <div className="bg-[#262626] rounded-lg p-4 border border-[#949497]/20">
        <p className="text-[#949497] text-sm mb-1">Best ({state.level})</p>
        <p className="text-white font-bold text-2xl">{currentLevelBest} WPM</p>
      </div>

      {/* All Best Scores */}
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <span className="text-[#949497] text-xs w-16">Easy:</span>
          <span className="text-white font-semibold">{state.bestScores?.easy}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[#949497] text-xs w-16">Medium:</span>
          <span className="text-white font-semibold">{state.bestScores?.medium}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[#949497] text-xs w-16">Hard:</span>
          <span className="text-white font-semibold">{state.bestScores?.hard}</span>
        </div>
      </div>
    </div>
  );
};

export default ScoreBoard;