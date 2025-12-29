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
  const ONE_MINUTE = 60_000;
  const INTERVAL =1_000;

  const [time, setTime] = useState(ONE_MINUTE / INTERVAL)
  const [accuracy, setAccuracy] = useState(0)

  const handleGetData = () => {
    const text = getData(currentLevel);
    setCurrentText(text);
  };

  const handleTimer = () => {
    if (currentTime === 'Passage') {
      setTime(0)
    } else {
      setTime(ONE_MINUTE / INTERVAL)
      let elapsed = ONE_MINUTE;
      const interval = setInterval(() => {
        elapsed -= INTERVAL;
        setTime(elapsed / 1000)
  
        if(elapsed <= 0) {
          clearInterval(interval);
          setTime(0)
          setStartTime(false)
        }
  
      }, INTERVAL)
    }


  }

  useEffect(() => {
    handleGetData();
  }, [currentLevel]);

  return (
    <>
      <Header score={score} />
      <div className="flex items-center md:items-start lg:items-center flex-col lg:flex-row justify-between gap-4 mt-16 pb-3 border-b border-[#949497]">
        <ScoreBoard time={time} accuracy={accuracy} />
        <Controls
          handleRefresh={() => {
            handleGetData()
            setClearInput(true)
          }}
          currentLevel={currentLevel}
          currentTime={currentTime}
          hasStarted={startTime}
          setLevel={setCurrentLevel}
          setTime={setCurrentTime}
        />
      </div>
      <TextArea
      setAccuracy={setAccuracy}
        currentText={currentText}
        startTime={startTime}
        clearInput={clearInput}
        setStartTime={() => {
          setStartTime(true);
          handleTimer()
          handleGetData()
          setClearInput(true);  
        
        }}
      />
    </>
  );
}

export default App;
