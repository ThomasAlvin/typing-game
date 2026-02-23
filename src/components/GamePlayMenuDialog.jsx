import { Button, CloseButton, Dialog, Flex, Portal } from "@chakra-ui/react";
import { useState } from "react";
import { useGameStore } from "../stores/gameStore";

export default function GamePlayMenuDialog() {
  const isPaused = useGameStore((state) => state.gameState) === "paused";
  const resetGame = useGameStore((state) => state.resetGame);
  const togglePauseGame = useGameStore((state) => state.togglePauseGame);
  const score = useGameStore((state) => state.score);
  const setCurrentPage = useGameStore((state) => state.setCurrentPage);
  return (
    <Dialog.Root placement={"center"} lazyMount open={isPaused}>
      <Dialog.Trigger asChild>
        <Button onClick={togglePauseGame} w={"100%"}>
          Menu
        </Button>
      </Dialog.Trigger>
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content>
            <Dialog.Header>
              <Dialog.Title>Menu</Dialog.Title>
            </Dialog.Header>
            <Dialog.Body>
              <Flex flexDir={"column"} gap={"10px"}>
                <Button onClick={() => resetGame()}>Retry</Button>
                <Button onClick={() => console.log("belom lol")}>
                  Change Difficulty
                </Button>
                <Button onClick={() => console.log("belom lol")}>
                  Settings
                </Button>
                <Button onClick={() => setCurrentPage("start")}>
                  Back to Main Menu
                </Button>
              </Flex>
            </Dialog.Body>
            <Dialog.CloseTrigger asChild>
              <CloseButton onClick={togglePauseGame} size="sm" />
            </Dialog.CloseTrigger>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
}
