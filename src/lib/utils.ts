import data from "./data.json";
const ONE_MINUTE = 60_000;
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
    dispatch({ type: "TIMER", payload: 0 });
    return;
  }
  
  if (state.mode === "Time (60s)") {
    let elapsed = ONE_MINUTE;
    
    const intervalId = setInterval(() => {
      elapsed -= INTERVAL;
      
      if (elapsed <= 0) {
        clearInterval(intervalId);
        clearInterval(state.intervalId);
        
        // Calculate final metrics when timer expires
        const totalChars = state.correctChars + state.wrongChars;
        const accuracy = totalChars > 0 
          ? Math.round((state.correctChars / totalChars) * 100) 
          : 0;
        
        // Calculate WPM (full 60 seconds elapsed)
        const wordsTyped = state.correctChars / 5;
        const wpm = Math.round(wordsTyped); // 1 minute = wordsTyped / 1
        
        dispatch({ type: "SET_ACCURACY", payload: accuracy });
        dispatch({ type: "UPDATE_WPM", payload: wpm });
        dispatch({ type: "TIMER", payload: 0 });
        dispatch({ type: "START_PLAY", payload: false });
        dispatch({ type: "END_PLAY", payload: true });
        dispatch({ type: "SET_INTERVAL_ID", payload: null });
      } else {
        dispatch({ type: "TIMER", payload: elapsed / 1000 });
      }
    }, INTERVAL);
    
    // Store the interval ID in state
    dispatch({ type: "SET_INTERVAL_ID", payload: intervalId as any });
    
    return intervalId;
  }
}

// Add a new function to stop the timer
export const stopTimer = (state: any, dispatch: (action: any) => void) => {
  if (state.intervalId) {
    clearInterval(state.intervalId);
    dispatch({ type: "SET_INTERVAL_ID", payload: null });
  }
  
  // Only calculate metrics if user actually typed something
  if (state.userInput.length > 0) {
    const totalChars = state.correctChars + state.wrongChars;
    const accuracy = totalChars > 0 
      ? Math.round((state.correctChars / totalChars) * 100) 
      : 0;
    
    const timeElapsed = (60 - state.clock) / 60;
    const wordsTyped = state.correctChars / 5;
    const wpm = timeElapsed > 0 ? Math.round(wordsTyped / timeElapsed) : 0;
    
    dispatch({ type: "SET_ACCURACY", payload: accuracy });
    dispatch({ type: "UPDATE_WPM", payload: wpm });
  }
};

