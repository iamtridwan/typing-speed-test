// src/hooks/useTimer.ts
import { useEffect, useRef } from "react";
import { useAppContext } from "../context/AppContext";

const INTERVAL = 1000; // ms – feel free to make it 1000 for a 1‑second step

export function useTimer() {
  const { state, dispatch } = useAppContext();
  const intervalRef = useRef<any>(null);

  /**
   * Effect that creates the interval when a round starts (`playStarted === true`)
   * and destroys it when the round ends or the component unmounts.
   */
  useEffect(() => {
    // -------------------------------------------------------------
    // If we are *not* playing, make sure no interval lingers.
    // -------------------------------------------------------------
    if (!state.playStarted) {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      return;
    }

    console.log(state)

    // -------------------------------------------------------------
    // We are in a playing state – initialise the countdown.
    // -------------------------------------------------------------
    let msLeft = state.clock * 1000; // clock is stored in seconds

    intervalRef.current = setInterval(() => {
      msLeft -= INTERVAL;

      // ---------------------------------------------------------
      // 1️⃣ USER finished typing → stop timer *at its current value*
      // ---------------------------------------------------------
      if (state.userInput.length >= state.currentText.length) {
        clearInterval(intervalRef.current!);
        intervalRef.current = null;
        // Do NOT dispatch a new TIMER action – keep the current number.
        dispatch({ type: "START_PLAY", payload: false });
        return;
      }

      // ---------------------------------------------------------
      // 2️⃣ NORMAL tick – update the clock (seconds left)
      // ---------------------------------------------------------
      const secondsLeft = Math.max(0, Math.round(msLeft / 1000));
      dispatch({ type: "TIMER", payload: secondsLeft });

      // ---------------------------------------------------------
      // 3️⃣ TIME‑OUT → stop and show 0
      // ---------------------------------------------------------
      if (msLeft <= 0) {
        clearInterval(intervalRef.current!);
        intervalRef.current = null;
        dispatch({ type: "TIMER", payload: 0 });
        dispatch({ type: "START_PLAY", payload: false });
      }
    }, INTERVAL);

    // -------------------------------------------------------------
    // Cleanup when playStarted changes or component unmounts
    // -------------------------------------------------------------
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [
    state.playStarted,
    state.userInput,
    state.currentText, // needed so the effect re‑runs if you load a new passage
  ]);

  /**
   * Public helper that UI components can call to start a new round.
   * Example: `start(60)` → 60‑second round.
   */
  const start = (seconds: number) => {
    dispatch({ type: "TIMER", payload: seconds });
  };

  return { start };
}
