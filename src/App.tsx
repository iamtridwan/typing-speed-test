import { useEffect } from "react";
import "./App.css";
import Header from "./components/Header";
import ScoreBoard from "./components/ScoreBoard";
import Controls from "./components/Controls";
import TextArea from "./components/TextArea";
import { useAppContext } from "./context/AppContext";

function App() {

  const { dispatch } = useAppContext()
  useEffect(() => {
    dispatch({type: 'SET_CURRENT_TEXT'})
  }, [])


  return (
    <>
      <Header />
      <div className="flex items-center md:items-start lg:items-center flex-col lg:flex-row justify-between gap-4 mt-16 pb-3 border-b border-[#949497]">
        <ScoreBoard />
        <Controls />
      </div>
      <TextArea />
    </>
  );
}

export default App;
