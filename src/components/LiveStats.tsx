import { useAppContext } from "../context/AppContext";
import { useEffect, useState } from "react";

const LiveStats = () => {
  const { state } = useAppContext();
  const [elapsedTime, setElapsedTime] = useState(0);

  // Track elapsed time for Passage mode
  useEffect(() => {
    if (state.mode === "Passage" && state.playStarted && !state.playEnded && state.startTime) {
      const interval = setInterval(() => {
        const elapsed = Math.floor((Date.now() - state.startTime!) / 1000);
        setElapsedTime(elapsed);
      }, 100); // Update every 100ms for smooth display

      return () => clearInterval(interval);
    } else if (!state.playStarted || state.playEnded) {
      setElapsedTime(0);
    }
  }, [state.mode, state.playStarted, state.playEnded, state.startTime]);

  // Format time as MM:SS
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  // Calculate progress percentage
  const progressPercentage = state.currentText.length > 0
    ? Math.round((state.userInput.length / state.currentText.length) * 100)
    : 0;

  // Calculate live accuracy
  const totalChars = state.correctChars + state.wrongChars;
  const liveAccuracy = totalChars > 0
    ? Math.round((state.correctChars / totalChars) * 100)
    : 100;

  return (
    <div className="w-full mt-4 space-y-4">
      {/* Progress Bar */}
      <div className="w-full">
        <div className="flex justify-between items-center mb-2">
          <span className="text-[#949497] text-sm">Progress</span>
          <span className="text-white text-sm font-medium">{progressPercentage}%</span>
        </div>
        <div className="w-full h-2 bg-[#262626] rounded-full overflow-hidden">
          <div
            className="h-full bg-linear-to-r from-[#177DFF] to-[#4DD67B] transition-all duration-300 ease-out rounded-full"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>
      </div>

      {/* Live Stats Grid */}
      {state.playStarted && !state.playEnded && (
        <div className="grid grid-cols-4 gap-3">
          {/* Live WPM */}
          <div className="bg-[#262626] rounded-lg p-3 border border-[#949497]/20">
            <p className="text-[#949497] text-xs mb-1">Live WPM</p>
            <p className="text-white text-xl font-bold">{state.liveWpm}</p>
          </div>

          {/* Live Accuracy */}
          <div className="bg-[#262626] rounded-lg p-3 border border-[#949497]/20">
            <p className="text-[#949497] text-xs mb-1">Accuracy</p>
            <p className={`text-xl font-bold ${liveAccuracy === 100 ? 'text-[#4DD67B]' : liveAccuracy >= 95 ? 'text-white' : 'text-[#D64D5B]'}`}>
              {liveAccuracy}%
            </p>
          </div>

          {/* Time - Shows countdown for Timed mode, elapsed for Passage mode */}
          <div className="bg-[#262626] rounded-lg p-3 border border-[#949497]/20">
            <p className="text-[#949497] text-xs mb-1">
              {state.mode === "Passage" ? "Time Elapsed" : "Time Left"}
            </p>
            <p className="text-white text-xl font-bold">
              {state.mode === "Passage" 
                ? formatTime(elapsedTime)
                : formatTime(Math.round(state.clock))
              }
            </p>
          </div>

          {/* Characters Typed */}
          <div className="bg-[#262626] rounded-lg p-3 border border-[#949497]/20">
            <p className="text-[#949497] text-xs mb-1">Characters</p>
            <p className="text-white text-xl font-bold">
              {state.userInput.length}/{state.currentText.length}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default LiveStats;