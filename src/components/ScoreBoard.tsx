import { useAppContext } from "../context/AppContext";

// type Props = {
//   time: number;
// };

const ScoreBoard = () => {
    const { state } = useAppContext()

  const formatTime = () => {
    if (state.clock < 10) {
      return `0:0${state.clock}`;
    } else {
      return `0:${state.clock}`;
    }
  };

  return (
    <div className="flex items-center md:gap-4 justify-between md:justify-start w-full md:w-fit">
      <div className="flex items-center md:gap-2 pr-12 md:pr-4 border-r border-[#949497] flex-col md:flex-row justify-center">
        <p className="text-[#949497] text-base m-0 md:text-lg">WPM:</p>
        <p className="text-white font-bold m-0 text-xl md:text-lg">0</p>
      </div>
      <div className="flex items-center md:gap-2 pr-12 md:pr-4 border-r border-[#949497] flex-col md:flex-row justify-center">
        <p className="text-[#949497] m-0 text-base md:text-lg">Accuracy:</p>
        <p className="text-white font-bold m-0 text-xl md:text-lg">
          {state.accuracy}%
        </p>
      </div>
      <div className="flex items-center md:gap-2 flex-col md:flex-row justify-center">
        <p className="text-[#949497] text-base m-0 md:text-lg">Time:</p>
        <p
          className={`${
            state.clock < 10
              ? "text-[#D64D5B]"
              : state.clock >= 10 && state.clock <= 20
              ? "text-[#F4DC73]"
              : "text-white"
          } font-bold m-0 text-xl md:text-lg`}
        >
          {formatTime()}
        </p>
      </div>
    </div>
  );
};

export default ScoreBoard;
