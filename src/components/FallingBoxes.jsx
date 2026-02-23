import { useEffect, useRef, useState } from "react";
import { generate, count } from "random-words";
import difficultyArray from "../constants/difficultyArray";
import { Flex, Text } from "@chakra-ui/react";
import { useGameStore } from "../stores/gameStore";
import { v4 as uuid } from "uuid";

export default function FallingBoxes() {
  const boxes = useGameStore((state) => state.boxes);
  const addBox = useGameStore((state) => state.addBox);
  const tickBoxes = useGameStore((state) => state.tickBoxes);
  const typingInput = useGameStore((state) => state.typingInput);
  const selectedDifficulty = useGameStore((state) => state.selectedDifficulty);
  const wordVelocity = selectedDifficulty.wordVelocity;
  const wordSpawnRate = selectedDifficulty.wordSpawnRate;
  const gameState = useGameStore((state) => state.gameState);
  const containerRef = useRef();
  const animationRef = useRef();
  const isPaused = gameState === "paused";
  const isGameOver = gameState === "gameOver";

  // Create a box every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      if (isPaused || isGameOver) {
        return; // skip updating positions if paused
      }
      addBox({
        id: uuid(),
        top: 0,
        velocity: wordVelocity,
        word: generate({
          minLength: selectedDifficulty.wordGenerationMinLength,
          maxLength: selectedDifficulty.wordGenerationMaxLength,
        }).toUpperCase(),
        left: Math.random() * 90 + 5, // random left in %
      });
    }, wordSpawnRate);

    return () => clearInterval(interval);
  }, [selectedDifficulty, isPaused, isGameOver]);

  useEffect(() => {
    let lastTimestamp = null;
    function animate(timestamp) {
      if (isPaused) {
        animationRef.current = requestAnimationFrame(animate);
        return; // skip updating positions if paused
      }
      if (lastTimestamp === null) lastTimestamp = timestamp;
      const delta = timestamp - lastTimestamp; // in ms
      lastTimestamp = timestamp;
      const deltaSeconds = delta / 10;

      tickBoxes(deltaSeconds, containerRef.current?.clientHeight);

      animationRef.current = requestAnimationFrame(animate);
    }
    animationRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationRef.current);
  }, [isPaused]);
  // console.log(boxes);

  return (
    <Flex
      flexDir={"column"}
      position={"relative"}
      w={"70%"}
      h={"100%"}
      overflow={"hidden"}
      ref={containerRef}
      onClick={() => {
        console.log(typingInput);
      }}
    >
      {boxes.map((box) => {
        const word = box.word;
        const matchLength = typingInput
          ? word.startsWith(typingInput.toUpperCase())
            ? typingInput.length
            : 0
          : 0;

        const matched = word.slice(0, matchLength);
        const remaining = word.slice(matchLength);

        return (
          <Flex
            key={box.id}
            position={"absolute"}
            style={{
              top: `${box.top}px`,
              left: `${box.left}%`,
              transform: "translateX(-50%)",
            }}
          >
            {/* <div
              className={`transition duration-300 ease-in-out ${
                box?.markedForRemoval ? "opacity-100" : "opacity-0"
              }`}
            >
              + 100 POINTS
            </div> */}
            {box?.markedForRemoval && (
              <Flex
                position={"absolute"}
                opacity={100}
                fontWeight={700}
                fontSize={"14px"}
                whiteSpace={"nowrap"}
                mb={1}
                className="animate-fade-pop"
              >
                + 100 POINTS
              </Flex>
            )}
            <Flex
              onClick={() => {
                console.log(selectedDifficulty);
                console.log(selectedDifficultySettings);
              }}
              key={box.id}
              transition="all 0.3s ease-in-out"
              opacity={box?.markedForRemoval ? 0 : 1}
              px={4}
              py={1}
              fontSize="xl"
              bg="blue.500"
              borderRadius="md"
              boxShadow="md"
              display="flex"
              justifyContent="center"
              alignItems="center"
              fontWeight="bold"
            >
              <Flex>
                <Text color="yellow">{matched}</Text>
                <Text color="white">{remaining}</Text>
              </Flex>
            </Flex>
          </Flex>
        );
      })}
    </Flex>
  );
}
