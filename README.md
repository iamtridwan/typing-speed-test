# Typing Speed Test 🖋️⚡

A lightweight typing test built with **React**, **TypeScript**, and **Vite**. It supports two modes (Timed 60s and Passage), three difficulty levels (Easy / Medium / Hard), shows live stats while you type, and persists best scores and recent test history to localStorage.

visit the live url here[https://typing-speed-test-one-mu.vercel.app/] to check it out

---

## Features ✅

- Modes: **Time (60s)** and **Passage**
- Difficulty: **Easy**, **Medium**, **Hard**
- Live stats: WPM, Accuracy, Characters typed, Progress, Time
- Persistence: Best scores per level and last 20 test results are saved to localStorage
- Responsive UI with keyboard-first typing input
- Centralized state management using React Context + useReducer

---

## Quick start 🚀

Requirements:
- Node 18+ (or latest LTS)
- npm or yarn

Install dependencies:

```bash
npm install
# or
# yarn
```

Run development server:

```bash
npm run dev
# or
# yarn dev
```

Build for production:

```bash
npm run build
```

Preview production build:

```bash
npm run preview
```

Lint the project:

```bash
npm run lint
```

---

## Project structure 🔍

Key files and folders inside `src/`:

- `src/main.tsx` — app entrypoint, wraps app with `AppProvider`
- `src/App.tsx` — bootstraps components and loads persisted data
- `src/context/AppContext.tsx` — central state + reducer and actions
- `src/lib/`
  - `data.json` — sample passages for `easy`, `medium`, and `hard`
  - `utils.ts` — timer logic and helpers (`handleTimer`, `stopTimer`)
  - `storage.ts` — localStorage helpers (`loadBestScores`, `addTestResult`, `getStatistics`)
  - `types.ts` — shared TypeScript types
- `src/components/`
  - `Header.tsx` — app header and personal best badge
  - `ScoreBoard.tsx` — displays best scores + opens history modal
  - `Controls.tsx` — selects level/mode and refreshes passage
  - `TextArea.tsx` — main typing UI and input tracking
  - `LiveStats.tsx` — live WPM, accuracy, progress, time
  - `TestHistory.tsx` — modal listing recent tests
  - `CompleteModal.tsx` — summary modal after a test completes

Assets:
- `src/assets/` — icons, logos and fonts

---

## Storage & metrics 🗃️

LocalStorage keys used:
- `typingTestBestScores` — stores `{ easy, medium, hard }`
- `typingTestHistory` — stores an array of test results (max 20 entries)

Metric calculations:
- WPM: words = characters / 5 (rounded)
- Accuracy: Math.round((correctChars / (correctChars + wrongChars)) * 100)
- Passage mode: elapsed time is tracked using `startTime`

---

## Development notes & tips 💡

- Add passages by editing `src/lib/data.json` under the respective difficulty key.
- To change how WPM or accuracy are calculated, update `src/lib/utils.ts`.
- `stopTimer` handles finalizing a test (saving result, updating best scores, etc.).
- Limit test history: `storage.ts` keeps the most recent 20 tests.

---

## Suggested improvements / TODO 📝

- Add unit tests (Vitest/Jest) for `utils` and `storage` helpers
- Add end-to-end tests (Playwright) for critical flows
- Add an export (CSV) option for history
- Add user settings (custom test durations, font options)
- Accessibility review and improvements (a11y)

---

## Contributing 🤝

1. Fork the repository
2. Create a branch: `git checkout -b feat/your-feature`
3. Commit changes and open a pull request

Please keep changes small and include tests where appropriate.

---

## credits 📄

Thanks to the folks at Frontend Mentor[https://www.frontendmentor.io/challenges/typing-speed-test] for providing this challenge.

Icons & fonts included under `src/assets/` — check their source files for attribution.

---

If you'd like, I can also add a `CONTRIBUTING.md` and `CHANGELOG.md`, or create a small `docs/` folder to document the data format and reducer actions.
