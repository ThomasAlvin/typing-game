import { Button, Flex } from "@chakra-ui/react";
import { useGameStore } from "../stores/gameStore";
import { IoMdHeart, IoMdHeartEmpty } from "react-icons/io";
import GameOverPopup from "./GameOverPopup";
// import SelectDifficultyModal from "./SelectDifficultyModal";

export default function LeftSidebar() {
  const boxes = useGameStore((state) => state.boxes);
  const score = useGameStore((state) => state.score);
  const lives = useGameStore((state) => state.lives);
  const selectedDifficulty = useGameStore((state) => state.selectedDifficulty);
  const gameState = useGameStore((state) => state.gameState);

  return (
    <Flex
      flexDir={"column"}
      bg={"#a38567"}
      w={"15%"}
      position={"fixed"}
      left={0}
      h={"100%"}
    >
      <Flex flexDir={"column"}>
        <Flex
          onClick={() => {
            console.log(selectedDifficulty);
          }}
          justify={"center"}
          alignItems={"center"}
          h={"80px"}
        >
          Game Logo
        </Flex>
        <Flex px={"16px"} py={"8px"} fontWeight={"700"}>
          Score: {score}
        </Flex>
        <Flex flexDir={"column"} px={"16px"} py={"8px"} fontWeight={"700"}>
          <Flex>Lives</Flex>
          <Flex fontSize={"24px"} color={"#dc143c"}>
            {Array.from({ length: lives }).map(() => (
              <IoMdHeart />
            ))}
            {Array.from({ length: 3 - lives }).map(() => (
              <IoMdHeartEmpty />
            ))}
          </Flex>
        </Flex>
        <Flex
          w={"100%"}
          px={"16px"}
          py={"8px"}
          fontSize={"24px"}
          fontWeight={700}
        >
          {selectedDifficulty.label}
        </Flex>
        <Flex w={"100%"} px={"16px"} py={"8px"}>
          <Button w={"100%"}>Menu</Button>
        </Flex>
        <Flex w={"100%"} px={"16px"} py={"8px"}>
          <Button
            onClick={() => {
              console.log(boxes);
            }}
            w={"100%"}
          >
            Log Boxes
          </Button>
        </Flex>
        <Flex>{gameState}</Flex>
        <GameOverPopup />
      </Flex>
    </Flex>
  );
}
