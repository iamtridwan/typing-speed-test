import data from "./data.json";
import { addTestResult, updateBestScore } from "./storage";
// const ONE_MINUTE = 60_000;
const INTERVAL = 1_000;

export function getData(level: string) {
  const levelData = (data as any)[level.toLowerCase()];
  const randomIndex = Math.floor(Math.random() * levelData.length);
  return levelData[randomIndex]["text"];
}

// function stopTimer(state: any, dispatch: Function, intervalId: any) {
//   if (state.userInput.length >= state.currentText.length) {
//     dispatch({ type: "TIMER", payload: state.clock });
//     clearInterval(intervalId);
//   }
// }

// export function handleTimer(state: any, dispatch: (action: any) => void, component?:string) {
//   let intervalId: any = null;
//   console.log('is called', component)

//   if (state.mode === "Passage") {
//     dispatch({ type: "START_CLOCK", payload: 60 });
//     return;
//   }

//   if (state.mode === "Time (60s)") {
//     let elapsed = ONE_MINUTE;
//     if (state.userInput.length >= state.currentText.length) {
//       dispatch({ type: "TIMER", payload: state.clock });
//       return;
//     }
//     intervalId = setInterval(() => {
//       elapsed -= INTERVAL;
//       if (state.userInput.length >= state.currentText.length) {
//         clearInterval(intervalId);
//         console.log("timer stopped");
//         dispatch({ type: "TIMER", payload: state.clock });
//         dispatch({ type: "START_PLAY", payload: false }); // REMOVE
//         return;
//       }
//       if (state.userInput.length < state.currentText.length) {
//         dispatch({ type: "TIMER", payload: elapsed / 1000 });
//       }

//       if (elapsed <= 0) {
//         clearInterval(intervalId);
//         dispatch({ type: "TIMER", payload: 0 });
//         dispatch({ type: "START_PLAY", payload: false }); // REMOVE
//       }
//     }, INTERVAL);
//   }

//   return intervalId;
// }

export function handleTimer(state: any, dispatch: (action: any) => void) {
  
  if (state.mode === "Passage") {
    dispatch({ type: "SET_START_TIME", payload: Date.now() });
    dispatch({ type: "TIMER", payload: 0 });
    return;
  }
  
  if (state.mode === "Time (60s)") {
    let elapsed = state.clock * 1000;
    
    const intervalId = setInterval(() => {
      elapsed -= INTERVAL;
      
      if (elapsed <= 0) {
        clearInterval(intervalId);
        dispatch({ type: "SET_INTERVAL_ID", payload: null });
        
        // Just update the metrics, don't save yet
        const totalChars = state.correctChars + state.wrongChars;
        const accuracy = totalChars > 0 
          ? Math.round((state.correctChars / totalChars) * 100) 
          : 0;
        
        const wordsTyped = state.correctChars / 5;
        const wpm = Math.round(wordsTyped);
        
        dispatch({ type: "SET_ACCURACY", payload: accuracy });
        dispatch({ type: "UPDATE_WPM", payload: wpm });
        dispatch({ type: "TIMER", payload: 0 });
        
        // Now save the test result
        if (state.correctChars > 0) {
          const testResult = {
            id: `test_${Date.now()}`,
            date: new Date().toISOString(),
            level: state.level,
            mode: state.mode,
            wpm,
            accuracy,
            correctChars: state.correctChars,
            wrongChars: state.wrongChars,
            timeElapsed: 60,
          };
          
          addTestResult(testResult);
          dispatch({ type: "ADD_TEST_RESULT", payload: testResult });
          
          const newBestScores = updateBestScore(state.level, wpm, state.bestScores);
          dispatch({ type: "SET_BEST_SCORES", payload: newBestScores });
        }
        
        dispatch({ type: "START_PLAY", payload: false });
        dispatch({ type: "END_PLAY", payload: true });
      } else {
        dispatch({ type: "TIMER", payload: elapsed / 1000 });
      }
    }, INTERVAL);
    
    dispatch({ type: "SET_INTERVAL_ID", payload: intervalId as any });
    
    return intervalId;
  }
}

// Helper function to update best score
// function updateBestScore(currentWpm: number, dispatch: (action: any) => void) {
//   // Get best score from localStorage
//   const storedBestScore = localStorage.getItem('typingTestBestScore');
//   const bestScore = storedBestScore ? parseInt(storedBestScore) : 0;
  
//   // Update if current score is higher
//   if (currentWpm > bestScore) {
//     localStorage.setItem('typingTestBestScore', currentWpm.toString());
//     dispatch({ type: "SET_BEST_SCORE", payload: currentWpm });
//     dispatch({ type: "SET_IS_HIGHEST_SCORE", payload: true });
//   } else {
//     dispatch({ type: "SET_BEST_SCORE", payload: bestScore });
//     dispatch({ type: "SET_IS_HIGHEST_SCORE", payload: false });
//   }
// }

// Add a new function to stop the timer
export const stopTimer = (state: any, dispatch: (action: any) => void) => {
  console.log('stopTimer called', {
    mode: state.mode,
    userInputLength: state.userInput.length,
    correctChars: state.correctChars,
    wrongChars: state.wrongChars,
    startTime: state.startTime,
    clock: state.clock
  });

  if (state.intervalId) {
    clearInterval(state.intervalId);
    dispatch({ type: "SET_INTERVAL_ID", payload: null });
  }
  
  // Only calculate and save metrics if user actually typed something
  // AND either: it's Passage mode OR timer hasn't reached 0 (user finished early)
  const shouldSaveResult = state.userInput.length > 0 && 
    (state.mode === "Passage" || state.clock > 0) && !state.playEnded;
  
  if (shouldSaveResult) {
    const totalChars = state.correctChars + state.wrongChars;
    const accuracy = totalChars > 0 
      ? Math.round((state.correctChars / totalChars) * 100) 
      : 0;
    
    let timeElapsed: number;
    let wpm: number;
    
    if (state.mode === "Passage") {
      timeElapsed = state.startTime ? Math.round((Date.now() - state.startTime) / 1000) : 0;
      const wordsTyped = state.correctChars / 5;
      const timeInMinutes = timeElapsed / 60;
      wpm = timeInMinutes > 0 ? Math.round(wordsTyped / timeInMinutes) : 0;
      
      console.log('Passage mode calculations:', {
        timeElapsed,
        wordsTyped,
        timeInMinutes,
        wpm,
        accuracy
      });
    } else {
      timeElapsed = 60 - state.clock;
      const wordsTyped = state.correctChars / 5;
      wpm = timeElapsed > 0 ? Math.round((wordsTyped / timeElapsed) * 60) : 0;
      
      console.log('Timed mode (early finish) calculations:', {
        timeElapsed,
        wordsTyped,
        wpm,
        accuracy
      });
    }
    
    dispatch({ type: "SET_ACCURACY", payload: accuracy });
    dispatch({ type: "UPDATE_WPM", payload: wpm });
    
    // Save test result to history
    const testResult = {
      id: `test_${Date.now()}`,
      date: new Date().toISOString(),
      level: state.level,
      mode: state.mode,
      wpm,
      accuracy,
      correctChars: state.correctChars,
      wrongChars: state.wrongChars,
      timeElapsed,
    };
    
    console.log('Test result to save:', testResult);
    
    addTestResult(testResult);
    dispatch({ type: "ADD_TEST_RESULT", payload: testResult });
    
    // Update best scores
    const newBestScores = updateBestScore(state.level, wpm, state.bestScores);
    dispatch({ type: "SET_BEST_SCORES", payload: newBestScores });
  } else {
    console.log('Not saving - either no input or timer expired naturally');
  }
};


