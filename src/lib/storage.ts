import { type BestScores, type TestResult } from "./types";

export const loadBestScores = (): BestScores => {
  const stored = localStorage.getItem("typingTestBestScores");
  if (stored) {
    return JSON.parse(stored);
  }

  return {
    easy: 0,
    medium: 0,
    hard: 0,
  };
};

export const saveBestScores = (scores: BestScores): void => {
  localStorage.setItem("typingTestBestScores", JSON.stringify(scores));
};

export const updateBestScore = (
  level: "Easy" | "Medium" | "Hard",
  wpm: number,
  currentScores: BestScores
): BestScores => {
  const levelkey = level.toLowerCase() as "easy" | "medium" | "hard";
  const newScores = { ...currentScores };

  if (wpm > newScores[levelkey]) {
    newScores[levelkey] = wpm;
    saveBestScores(newScores);
  }

  return newScores;
};

export const loadTestHistory = (): TestResult[] => {
  const stored = localStorage.getItem('typingTestHistory');
  if (stored) {
    return JSON.parse(stored);
  }
  return [];
};


export const saveTestHistory = (history: TestResult[]): void => {
    const trimmedHistory = history.slice(0, 20);
    localStorage.setItem('typingTestHistory', JSON.stringify(trimmedHistory))
}


export const addTestResult = (result: TestResult): TestResult[] => {
  const history = loadTestHistory();
  const newHistory = [result, ...history].slice(0, 20);
  saveTestHistory(newHistory);
  return newHistory;
};

export const getStatistics = (history: TestResult[]) => {
  if (history.length === 0) {
    return {
      averageWpm: 0,
      averageAccuracy: 0,
      totalTests: 0,
      totalTimeSpent: 0,
      bestTest: null,
    };
  }

  const totalWpm = history.reduce((sum, test) => sum + test.wpm, 0);
  const totalAccuracy = history.reduce((sum, test) => sum + test.accuracy, 0);
  const totalTimeSpent = history.reduce((sum, test) => sum + test.timeElapsed, 0);
  
  const bestTest = history.reduce((best, test) => 
    test.wpm > best.wpm ? test : best
  );

  return {
    averageWpm: Math.round(totalWpm / history.length),
    averageAccuracy: Math.round(totalAccuracy / history.length),
    totalTests: history.length,
    totalTimeSpent: Math.round(totalTimeSpent),
    bestTest,
  };
};