import { create } from "zustand";

export const useGameStore = create((set, get) => ({
  // state
  currentPage: "start",
  typingInput: "",
  boxes: [],
  score: 0,
  selectedDifficulty: "easy",
  lives: 1,
  gameState: null, // can be either: gamePlay,gameOver or paused

  // actions
  setCurrentPage: (value) => set({ currentPage: value }),
  setTypingInput: (value) => set({ typingInput: value }),
  setBoxes: (value) => set({ boxes: value }),
  setDifficulty: (difficulty) => {
    get().resetGame();
    set({ selectedDifficulty: difficulty, currentPage: "gamePlay" });
  },
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

  resetGame: () =>
    set({
      typingInput: "",
      boxes: [],
      score: 0,
      lives: 3,
      gameState: "gamePlay",
    }),
}));
