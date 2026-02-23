import { Flex, Input } from "@chakra-ui/react";
import { useGameStore } from "../stores/gameStore";
import { useEffect } from "react";

export default function InputFooter() {
  const markBoxForRemoval = useGameStore((state) => state.markBoxForRemoval);
  const removeBox = useGameStore((state) => state.removeBox);
  const addScore = useGameStore((state) => state.addScore);
  const boxes = useGameStore((state) => state.boxes);
  const togglePauseGame = useGameStore((state) => state.togglePauseGame);
  const typingInput = useGameStore((state) => state.typingInput);
  const setTypingInput = useGameStore((state) => state.setTypingInput);

  function submitWord() {
    console.log(typingInput);

    setTypingInput(""); // Clear input
    const selectedBoxId = boxes.find((box) => box.word === typingInput)?.id;
    console.log(boxes);
    console.log(selectedBoxId);
    markBoxForRemoval(selectedBoxId);

    // Delay actual removal
    setTimeout(() => {
      removeBox(selectedBoxId);
      addScore(100);
    }, 300); // Duration matches CSS animation time
  }
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Enter" || e.key === " ") {
        submitWord();
        return;
      }
      if (e.key === "Escape" || e.key === " ") {
        togglePauseGame();
        return;
      }

      if (e.key === "Backspace") {
        setTypingInput((prev) => prev.slice(0, -1));
        return;
      }

      if (e.key.length === 1) {
        console.log(e.key);
        setTypingInput((prev) => prev + e.key.toUpperCase());
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [submitWord]);

  return (
    <Flex
      w={"100%"}
      bg={"#dc143c"}
      gap={"20px"}
      justify={"center"}
      alignItems={"center"}
      position={"fixed"}
      bottom={0}
      left={"50%"}
      transform={"translateX(-50%)"}
    >
      <Flex
        py={"16px"}
        gap={"20px"}
        w={"600px"}
        justify={"center"}
        alignItems={"center"}
      >
        <Input
          _placeholder={{ color: "white" }}
          placeholder="Enter the falling words then press Enter or Space..."
          readOnly
          value={typingInput}
          bg={"#dc143c"}
          color={"white"}
        ></Input>
      </Flex>
    </Flex>
  );
}
