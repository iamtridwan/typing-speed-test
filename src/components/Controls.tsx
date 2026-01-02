import Icon from "../assets/images/icon-down-arrow.svg";
import RestartIcon from "../assets/images/icon-restart.svg";
import { useRef, useState } from "react";
import { useAppContext } from "../context/AppContext";


const Controls = () => {
  const levels = ["Easy", "Medium", "Hard"];
  const mode = ["Time (60s)", "Passage"];
  const [showLevels, setShowLevels] = useState(false);
  const [showTime, setShowTime] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);
  const { state, dispatch } = useAppContext();

  return (
    <div className="flex items-center md:gap-4 md:mt-10 justify-between md:justify-start w-full md:w-fit">
      <div className="hidden md:flex items-center gap-2">
        <p className="text-[#949497] text-base m-0 md:text-lg">Difficulty:</p>
        {levels.map((level) => (
          <button
            key={level}
            onClick={() =>
              dispatch({
                type: "SELECT_LEVEL",
                payload: level as "Easy" | "Medium" | "Hard",
              })
            }
            disabled={state.playStarted}
            className={`${
              level === state.level
                ? "text-[#177DFF] hover:text-[#4CA6FF] border-[#177DFF] hover:border-[#4CA6FF]"
                : "text-white hover:text-white border-[#949497] hover:border-[#949497]"
            }
             px-3 py-1.5 border rounded-[10px] bg-none transition-colors cursor-pointer text-base`}
          >
            {level}
          </button>
        ))}
        <button
          onClick={() => {
            dispatch({
              type: "SET_CURRENT_TEXT",
            });
            const img = imgRef.current;
            if (!img) return;

            // Prevent double‑clicks while animation is running
            if (img.classList.contains("spin-once")) return;

            img.classList.add("spin-once");

            const cleanUp = () => {
              img.classList.remove("spin-once");
              img.removeEventListener("animationend", cleanUp);
            };
            img.addEventListener("animationend", cleanUp);
          }}
          disabled={state.playStarted}
        >
          <img src={RestartIcon} alt="refresh icon" ref={imgRef} />
        </button>
      </div>
      <div className="hidden md:flex items-center gap-2 ">
        <p className="text-[#949497] text-base m-0">Mode:</p>
        {mode.map((level) => (
          <button
            key={level}
            onClick={() =>
              dispatch({
                type: "SELECT_MODE",
                payload: level as "Time (60s)" | "Passage",
              })
            }
            disabled={state.playStarted}
            className={`${
              level === state.mode
                ? "text-[#177DFF] hover:text-[#4CA6FF] border-[#177DFF] hover:border-[#4CA6FF]"
                : "text-white hover:text-white border-[#949497] hover:border-[#949497]"
            }
             px-3 py-1.5 border rounded-[10px] bg-none transition-colors cursor-pointer text-base`}
          >
            {level}
          </button>
        ))}
      </div>
      {/* mobile view for controls */}
      <div className="flex md:hidden w-full items-center gap-4">
        <div className="relative w-full">
          <button
          type="button"
            className="flex items-center justify-center w-full gap-3 text-white hover:text-white border-[#949497] hover:border-[#949497] px-3 py-1.5 border rounded-[10px] bg-none transition-colors cursor-pointer text-base md:text-lg"
            onClick={() => {
              setShowLevels(!showLevels)
              setShowTime(false);
            }}
            disabled={state.playStarted}
          >
            <span>{state.level}</span>
            <img src={Icon} alt="dropdown arrow" />
          </button>
          {showLevels && (
            <ul className="absolute -bottom-38 z-10 bg-[#262626] w-full rounded-xl p-3">
              {levels.map((level) => (
                <li
                key={level}
                  className={`w-full ${
                    level === "Hard" ? "" : "border-b border-[#949497] mb-3"
                  } `}
                >
                  <label
                    className={`flex items-start ${
                      level === "Hard" ? "" : "pb-3"
                    } gap-3 cursor-pointer`}
                  >
                    <input
                      type="radio"
                      id={level}
                      value={level}
                      checked={level === state.level}
                      onChange={(e) => {
                        dispatch({
                          type: "SELECT_LEVEL",
                          payload: e.target.value as "Easy" | "Medium" | "Hard",
                        });
                      }}
                      name="list-radio"
                      className="sr-only peer"
                    />
                    <span
                      className="w-6 h-6 rounded-full border-2 border-gray-400 flex items-center justify-center
               radio-appearance
               peer-checked:border-6
               peer-checked:border-[#4CA6FF]
               peer-checked:bg-none
               peer-focus:outline-none
               "
                    ></span>
                    <span className="ml-2 text-white">{level}</span>
                  </label>
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className="relative w-full">
          <button
          type="button"
            className="flex items-center justify-center w-full gap-3 text-white hover:text-white border-[#949497] hover:border-[#949497] px-5 py-3 border rounded-[14px] bg-none transition-colors cursor-pointer text-base md:text-lg"
            onClick={() => {
              setShowTime(!showTime)
              setShowLevels(false)
            }}
            disabled={state.playStarted}
          >
            <span>{state.mode}</span>
            <img src={Icon} alt="dropdown arrow" />
          </button>
          {showTime && (
            <ul className="absolute -bottom-26 z-10 bg-[#262626] w-full rounded-xl p-3">
              {mode.map((level) => (
                <li
                key={level}
                  className={`w-full ${
                    level === "Passage" ? "" : "border-b border-[#949497] mb-3"
                  } `}
                >
                  <label
                    className={`flex items-start ${
                      level === "Passage" ? "" : "pb-3"
                    } gap-3 cursor-pointer`}
                  >
                    <input
                      type="radio"
                      id={level}
                      value={level}
                      checked={level === state.mode}
                      onChange={(e) => {
                        dispatch({
                          type: "SELECT_MODE",
                          payload: e.target.value as "Time (60s)" | "Passage",
                        });
                        // setShowLevels(false);
                      }}
                      name="list-radio"
                      className="sr-only peer"
                    />
                    <span
                      className="w-6 h-6 rounded-full border-2 border-gray-400 flex items-center justify-center
               radio-appearance
               peer-checked:border-6
               peer-checked:border-[#4CA6FF]
               peer-checked:bg-none
               peer-focus:outline-none
               "
                    ></span>
                    <span className="ml-2 text-white">{level}</span>
                  </label>
                </li>
              ))}
            </ul>
          )}
        </div>
        <button
          className="absolute top-18 right-8 md:hidden"
          onClick={() => {
            dispatch({
              type: "SET_CURRENT_TEXT",
            });
            const img = imgRef.current;
            if (!img) return;

            // Prevent double‑clicks while animation is running
            if (img.classList.contains("spin-once")) return;

            img.classList.add("spin-once");

            const cleanUp = () => {
              img.classList.remove("spin-once");
              img.removeEventListener("animationend", cleanUp);
            };
            img.addEventListener("animationend", cleanUp);
          }}
          disabled={!state.playStarted}
        >
          <img src={RestartIcon} alt="refresh icon" ref={imgRef} />
        </button>
      </div>
    </div>
  );
};

export default Controls;
