import { useAppContext } from "../context/AppContext";

const TestHistory = () => {
  const { state, dispatch } = useAppContext();

  const formatDate = (isoString: string) => {
    const date = new Date(isoString);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    if (date.toDateString() === today.toDateString()) {
      return `Today at ${date.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
      })}`;
    } else if (date.toDateString() === yesterday.toDateString()) {
      return `Yesterday at ${date.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
      })}`;
    } else {
      return date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  if (state.testHistory.length === 0) {
    return (
      <div className="bg-black absolute top-18 md:top-20 left-0 w-full h-screen backdrop-blur-3xl flex items-center justify-center">
        <div className="w-[90%] md:w-[70%] mx-auto mt-8 p-6 bg-[#262626] rounded-lg border border-[#949497]/20">
          <div className="flex items-center justify-between w-full mb-2">
            <h3 className="text-white text-xl font-bold ">Speed Test History</h3>
            <button
              type="button"
              onClick={() => dispatch({type:'SET_SHOW_HISTORY_MODAL', payload: false})}
              className="bg-[#717178] text-sm cursor-pointer h-10 w-10 text-while  border border-[#FFFFFF]/20 rounded-full flex items-center justify-center"
            >
              X
            </button>
          </div>
          <p className="text-[#949497]">
            No tests completed yet. Start typing to see your history!
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-black absolute top-18 md:top-20 left-0 w-full backdrop-blur-3xl flex items-center justify-center">
    <div className="w-[90%] md:w-[70%] mx-auto mt-8 p-6 bg-[#262626] rounded-lg border border-[#949497]/20">
      <div className="flex items-center justify-between w-full mb-4">
        <h3 className="text-white text-xl font-bold">Speed Test History</h3>
        <button
          type="button"
          onClick={() => dispatch({type:'SET_SHOW_HISTORY_MODAL', payload: false})}
          className="bg-[#717178] h-10 w-10 cursor-pointer text-while text-sm border border-[#FFFFFF]/20 rounded-full flex items-center justify-center"
        >
          X
        </button>
      </div>

      <div className="space-y-3 max-h-96 overflow-y-auto">
        {state.testHistory.map((test) => (
          <div
            key={test.id}
            className="bg-[#1a1a1a] rounded-lg p-4 border border-[#949497]/10 hover:border-[#177DFF]/30 transition-colors"
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-3">
                <span
                  className={`px-2 py-1 rounded text-xs font-semibold ${
                    test.level === "Easy"
                      ? "bg-[#4DD67B]/20 text-[#4DD67B]"
                      : test.level === "Medium"
                      ? "bg-[#177DFF]/20 text-[#177DFF]"
                      : "bg-[#D64D5B]/20 text-[#D64D5B]"
                  }`}
                >
                  {test.level}
                </span>
                <span className="text-[#949497] text-sm">
                  {formatDate(test.date)}
                </span>
              </div>
              <span className="text-white font-bold text-xl">
                {test.wpm} WPM
              </span>
            </div>

            <div className="grid grid-cols-3 gap-4 text-sm">
              <div>
                <p className="text-[#949497] text-xs">Accuracy</p>
                <p
                  className={`font-semibold ${
                    test.accuracy === 100
                      ? "text-[#4DD67B]"
                      : test.accuracy >= 95
                      ? "text-white"
                      : "text-[#D64D5B]"
                  }`}
                >
                  {test.accuracy}%
                </p>
              </div>
              <div>
                <p className="text-[#949497] text-xs">Characters</p>
                <p className="text-white font-semibold">
                  <span className="text-[#4DD67B]">{test.correctChars}</span>/
                  <span className="text-[#D64D5B]">{test.wrongChars}</span>
                </p>
              </div>
              <div>
                <p className="text-[#949497] text-xs">Time</p>
                <p className="text-white font-semibold">
                  {formatTime(test.timeElapsed)}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>

    </div>
  );
};

export default TestHistory;
