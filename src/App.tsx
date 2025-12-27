import { useEffect, useState } from "react";
import "./App.css";
import Header from "./components/Header";
import ScoreBoard from "./components/ScoreBoard";
import Controls from "./components/Controls";
import TextArea from "./components/TextArea";
import { getData } from "./lib/utils";

function App() {
  const [score, setScore] = useState(92);
  const [currentLevel, setCurrentLevel] = useState("Easy");
  const [currentTime, setCurrentTime] = useState("Time (60s)");
  const [startTime, setStartTime] = useState(false);
  const [currentText, setCurrentText] = useState("");
  const [clearInput, setClearInput] = useState(false);

  const handleGetData = () => {
    const text = getData(currentLevel);
    setCurrentText(text);
  };

  useEffect(() => {
    handleGetData();
  }, [currentLevel]);

  return (
    <>
      <Header score={score} />
      <div className="flex items-center md:items-start lg:items-center flex-col lg:flex-row justify-between gap-4 mt-16 pb-3 border-b border-[#949497]">
        <ScoreBoard />
        <Controls
          handleRefresh={() => {
            handleGetData()
            setClearInput(!clearInput)
          }}
          currentLevel={currentLevel}
          currentTime={currentTime}
          hasStarted={startTime}
          setLevel={setCurrentLevel}
          setTime={setCurrentTime}
        />
      </div>
      <TextArea
        currentText={currentText}
        startTime={startTime}
        clearInput={clearInput}
        setStartTime={() => setStartTime(true)}
      />
    </>
  );
}

export default App;
