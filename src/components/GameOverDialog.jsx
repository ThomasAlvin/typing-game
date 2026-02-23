import { Button, CloseButton, Dialog, Flex, Portal } from "@chakra-ui/react";
import { useState } from "react";
import { useGameStore } from "../stores/gameStore";

export default function GameOverDialog() {
  const isGameOver = useGameStore((state) => state.gameState) === "gameOver";
  const resetGame = useGameStore((state) => state.resetGame);
  const score = useGameStore((state) => state.score);
  const setCurrentPage = useGameStore((state) => state.setCurrentPage);
  return (
    <Dialog.Root placement={"center"} lazyMount open={isGameOver}>
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content>
            <Dialog.Header>
              <Dialog.Title>Game Over</Dialog.Title>
            </Dialog.Header>
            <Dialog.Body>
              <Flex fontSize={"32px"} fontWeight={700}>
                Final Score: {score}
              </Flex>
            </Dialog.Body>
            <Dialog.Footer>
              <Dialog.ActionTrigger asChild>
                <Button
                  onClick={() => setCurrentPage("start")}
                  variant="outline"
                >
                  Back to main menu
                </Button>
              </Dialog.ActionTrigger>
              <Button onClick={() => resetGame()}>Retry</Button>
            </Dialog.Footer>
            <Dialog.CloseTrigger asChild>
              <CloseButton size="sm" />
            </Dialog.CloseTrigger>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
}
