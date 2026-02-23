import { useState } from "react";
// import FallingBoxes from "../components/FallingBox";
// import InputFooter from "../components/InputFooter";
// import LeftSidebar from "../components/LeftSidebar";
// import SelectDifficultyModal from "../components/SelectDifficultyModal";
import TitleCard from "../components/TitleCard";
import { motion } from "framer-motion";
import { Button, Flex } from "@chakra-ui/react";
import { ColorModeButton } from "../components/ui/color-mode";
import InputFooter from "../components/InputFooter";
import FallingBoxes from "../components/FallingBoxes";
import LeftSidebar from "../components/LeftSidebar";
import { useGameStore } from "../stores/gameStore";
import difficultyArray from "../constants/difficultyArray";
import { FaArrowLeftLong } from "react-icons/fa6";
export default function HomePage() {
  const currentPage = useGameStore((state) => state.currentPage);

  return (
    <Flex flexDir={"column"} w={"100%"} h={"100%"}>
      {currentPage === "start" ? (
        <StartingMenuPage />
      ) : currentPage === "gamePlay" ? (
        <GamePlayPage />
      ) : currentPage === "settings" ? (
        <Flex>settings</Flex>
      ) : currentPage === "selectDifficulty" ? (
        <SelectDifficultyPage />
      ) : currentPage === "customMenu" ? (
        <Flex>custom menu</Flex>
      ) : currentPage === "campaignMap" ? (
        <Flex>campaign map</Flex>
      ) : currentPage === "credits" ? (
        <Flex>credits</Flex>
      ) : currentPage === "gameOver" ? (
        <Flex>game over</Flex>
      ) : (
        <StartingMenuPage />
      )}
    </Flex>
  );
}

function StartingMenuPage() {
  const setCurrentPage = useGameStore((state) => state.setCurrentPage);
  const startingMenuButtons = [
    {
      title: "Start",
      onClickFn: () => setCurrentPage("selectDifficulty"),
    },
    {
      title: "Campaign",
      onClickFn: () => {},
    },
    {
      title: "Custom Mode",
      onClickFn: () => {},
    },
    {
      title: "Settings",
      onClickFn: () => {},
    },
    {
      title: "Credits",
      onClickFn: () => {},
    },
  ];
  return (
    <Flex
      flexDir={"column"}
      justify={"center"}
      alignItems={"center"}
      w={"100%"}
      h={"100%"}
    >
      <Flex flexDir={"column"} gap={"30px"}>
        <TitleCard />
        <Flex flexDir={"column"} alignItems={"center"} gap={5}>
          {startingMenuButtons.map((startMenuButton) => (
            <motion.div
              initial={{ y: "20vw" }} // start far left
              animate={{ y: 0 }} // move to center
              transition={{
                type: "spring",
                stiffness: 120, // controls bounce speed
                damping: 15, // lower = more bounce
              }}
            >
              <Button
                onClick={startMenuButton.onClickFn}
                fontSize={"20px"}
                w={"160px"}
              >
                {startMenuButton.title}
              </Button>
            </motion.div>
          ))}{" "}
        </Flex>
      </Flex>
    </Flex>
  );
}
function GamePlayPage() {
  return (
    <Flex
      flexDir={"column"}
      justify={"center"}
      alignItems={"center"}
      w={"100%"}
      h={"100%"}
    >
      <LeftSidebar />
      <FallingBoxes />
      <InputFooter />
    </Flex>
  );
}
function SelectDifficultyPage() {
  const setDifficulty = useGameStore((state) => state.setDifficulty);
  const setCurrentPage = useGameStore((state) => state.setCurrentPage);
  return (
    <Flex
      flexDir={"column"}
      justify={"center"}
      alignItems={"center"}
      w={"100%"}
      h={"100%"}
    >
      <Flex flexDir={"column"} gap={"30px"}>
        <TitleCard />
        <Flex flexDir={"column"} alignItems={"center"} gap={5}>
          {difficultyArray.map((difficulty) => (
            <motion.div
              initial={{ y: "20vw" }} // start far left
              animate={{ y: 0 }} // move to center
              transition={{
                type: "spring",
                stiffness: 120, // controls bounce speed
                damping: 15, // lower = more bounce
              }}
            >
              <Button
                onClick={() => setDifficulty(difficulty)}
                fontSize={"20px"}
                w={"160px"}
              >
                {difficulty.label}
              </Button>
            </motion.div>
          ))}{" "}
          <motion.div
            initial={{ y: "20vw" }} // start far left
            animate={{ y: 0 }} // move to center
            transition={{
              type: "spring",
              stiffness: 120, // controls bounce speed
              damping: 15, // lower = more bounce
            }}
          >
            <Button
              onClick={() => setCurrentPage("start")}
              fontSize={"20px"}
              w={"160px"}
              alignItems={"center"}
              gap={"10px"}
            >
              <Flex mt={"2px"}>
                <FaArrowLeftLong />
              </Flex>
              <Flex>Back</Flex>
            </Button>
          </motion.div>
        </Flex>
      </Flex>
    </Flex>
  );
}
