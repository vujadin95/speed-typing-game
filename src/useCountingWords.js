import { useState, useRef, useEffect } from "react";

function useCountingWords(defaultTime = 10) {
  const [text, setText] = useState("");
  const [timeRemaining, setTimeRemaining] = useState(defaultTime);
  const [isTimeCounting, setIsTimeCounting] = useState(false);
  const [wordCount, setWordCount] = useState(0);

  const textareaRef = useRef(null);

  function startGame() {
    setIsTimeCounting(true);
    setText("");
    setTimeRemaining(defaultTime);
    setWordCount(0);
  }

  useEffect(() => {
    textareaRef.current.focus();
  }, [isTimeCounting]);

  function endGame() {
    setIsTimeCounting(false);
    setWordCount(calculateWordCount(text));
  }

  function calculateWordCount(text) {
    const textArray = text
      .split(" ")
      .filter((word) => word !== "" && word !== "\n");
    return textArray.length;
  }

  useEffect(() => {
    if (timeRemaining > 0 && isTimeCounting) {
      setTimeout(() => {
        setTimeRemaining((prevState) => prevState - 1);
      }, 1000);
    } else {
      endGame();
    }
  }, [timeRemaining, isTimeCounting]);

  return {
    textareaRef,
    text,
    setText,
    isTimeCounting,
    timeRemaining,
    startGame,
    wordCount,
  };
}
export default useCountingWords;
