import { useEffect } from "react";
import "./App.css";
import Header from "./components/Header";
import ScoreBoard from "./components/ScoreBoard";
import Controls from "./components/Controls";
import TextArea from "./components/TextArea";
import { useAppContext } from "./context/AppContext";
import CompleteModal from "./components/CompleteModal";
import { loadBestScores, loadTestHistory } from "./lib/storage";
import TestHistory from "./components/TestHistory";

function App() {
  const { state, dispatch } = useAppContext();
  useEffect(() => {
    dispatch({ type: "SET_CURRENT_TEXT" });
    // Load best scores
    const bestScores = loadBestScores();
    dispatch({ type: "SET_BEST_SCORES", payload: bestScores });

    // Load test history
    const history = loadTestHistory();
    dispatch({ type: "LOAD_TEST_HISTORY", payload: history });

    // const storedBestScore = localStorage.getItem('typingTestBestScore');
    // if (storedBestScore) {
    //   dispatch({ type: "SET_BEST_SCORE", payload: parseInt(storedBestScore) });
    // }
  }, []);

  return (
    <>
      <Header />
      <div className="flex items-center md:items-start lg:items-center flex-col lg:flex-row justify-between gap-4 mt-16 pb-3 border-b border-[#949497]/30">
        <ScoreBoard />
        <Controls />
      </div>
      <TextArea />
      {state.showHistoryModal && <TestHistory />}
      {state.playEnded && <CompleteModal />}
    </>
  );
}

export default App;
