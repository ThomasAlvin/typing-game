import { Flex, Input } from "@chakra-ui/react";
import { useGameStore } from "../stores/gameStore";

export default function InputFooter() {
  const markBoxForRemoval = useGameStore((state) => state.markBoxForRemoval);
  const removeBox = useGameStore((state) => state.removeBox);
  const addScore = useGameStore((state) => state.addScore);
  const boxes = useGameStore((state) => state.boxes);
  const typingInput = useGameStore((state) => state.typingInput);
  const setTypingInput = useGameStore((state) => state.setTypingInput);

  function inputHandler(event) {
    const { value } = event.target;
    setTypingInput(value.toUpperCase());
  }
  function onKeyDownHandler(e) {
    console.log(e.key);

    if (e.key === "Enter" || e.key === " ") {
      submitWord();
    }
  }
  function submitWord() {
    setTypingInput(""); // Clear input
    const selectedBoxId = boxes.find((box) => box.word === typingInput)?.id;
    markBoxForRemoval(selectedBoxId);

    // Delay actual removal
    setTimeout(() => {
      removeBox(selectedBoxId);
      addScore(100);
    }, 300); // Duration matches CSS animation time
  }

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
          onKeyDown={onKeyDownHandler}
          onChange={inputHandler}
          value={typingInput}
          bg={"#dc143c"}
          color={"white"}
        ></Input>
      </Flex>
    </Flex>
  );
}
