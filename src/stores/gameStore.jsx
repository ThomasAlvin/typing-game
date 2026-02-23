import { create } from "zustand";

export const useGameStore = create((set, get) => ({
  // state
  currentPage: "start",
  typingInput: "",
  boxes: [],
  score: 0,
  selectedDifficulty: "easy",
  lives: 3,
  gameState: null, // can be either: gamePlay,gameOver or paused

  // actions
  setCurrentPage: (value) => set({ currentPage: value }),
  setTypingInput: (valueOrUpdater) =>
    set((state) => ({
      typingInput:
        typeof valueOrUpdater === "function"
          ? valueOrUpdater(state.typingInput)
          : valueOrUpdater,
    })),
  setBoxes: (value) => set({ boxes: value }),
  setDifficulty: (difficulty) => {
    get().resetGame(difficulty.startingLives);
    set({ selectedDifficulty: difficulty, currentPage: "gamePlay" });
  },
  togglePauseGame: () =>
    set((state) => ({
      gameState: state.gameState === "paused" ? "gamePlay" : "paused",
    })),
  addScore: (value) => set((state) => ({ score: state.score + value })),
  addBox: (boxOrBoxes) =>
    set((state) => {
      const newBoxes = Array.isArray(boxOrBoxes) ? boxOrBoxes : [boxOrBoxes];
      return {
        boxes: [...state.boxes, ...newBoxes],
      };
    }),
  tickBoxes: (deltaSeconds, containerHeight) =>
    set((state) => {
      if (state.lives === 0) {
        return { gameState: "gameOver" };
      }
      const maxTop = (containerHeight ?? 600) - 64;

      let removedCount = 0;

      const updatedBoxes = state.boxes.map((box) => {
        const newTop = box.top + box.velocity * deltaSeconds;

        if (newTop >= maxTop) {
          removedCount++;
          return null;
        }

        return {
          ...box,
          top: newTop,
        };
      });

      const finalizedBoxes = updatedBoxes.filter(Boolean);

      return {
        boxes: finalizedBoxes,
        lives: Math.max(0, state.lives - removedCount),
      };
    }),
  markBoxForRemoval: (boxId) =>
    set((state) => ({
      boxes: state.boxes.map((box) =>
        box.id === boxId ? { ...box, markedForRemoval: true } : box,
      ),
    })),
  removeBox: (boxId) =>
    set((state) => ({ boxes: state.boxes.filter((box) => box.id !== boxId) })),
  setScore: (value) => set({ score: value }),
  setSelectedDifficulty: (value) => set({ selectedDifficulty: value }),
  resetGame: (startingLives) =>
    set((state) => {
      return {
        typingInput: "",
        boxes: [],
        score: 0,
        lives: startingLives || state?.selectedDifficulty?.startingLives,
        gameState: "gamePlay",
      };
    }),
}));
