
export type TestResult = {
    id: string;
    date: string;
    level: 'Easy' | 'Medium' | 'Hard',
    mode: 'Time (60s)' | 'Passage',
    wpm: number;
    accuracy: number;
    correctChars: number;
    wrongChars: number;
    timeElapsed: number;
}


export type BestScores = {
    easy: number;
    medium: number;
    hard: number;
}


export type StateType = {
  level: "Easy" | "Hard" | "Medium";
  mode: "Time (60s)" | "Passage";
  accuracy: number;
  bestScore: number; // Keep for backward compatibility, or remove if not needed
  bestScores: BestScores;
  testHistory: TestResult[];
  correctChars: number;
  wrongChars: number;
  wpm: number;
  liveWpm: number;
  resetTime: false;
  currentText: string;
  userInput: string;
  playStarted: boolean;
  playEnded: boolean;
  isPlayReset: boolean;
  isPaused: boolean;
  isHighestScore: boolean;
  clock: number;
  intervalId: number | null;
  startTime: number | null;
  pausedTime: number | null;
  showHistoryModal: boolean;
};


