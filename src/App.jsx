import { useState, useEffect, useRef } from "react";

function App() {
  const STARTING_TIME = 5;

  const [text, setText] = useState("");
  const [timeRemaining, setTimeRemaining] = useState(STARTING_TIME);
  const [isTimeCounting, setIsTimeCounting] = useState(false);
  const [wordCount, setWordCount] = useState(0);

  const textareaRef = useRef(null);

  function startGame() {
    setIsTimeCounting(true);
    setText("");
    setTimeRemaining(STARTING_TIME);
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
    const textArray = text.split(" ").filter((word) => word !== "");
    return textArray.length;
  }

  useEffect(() => {
    if (timeRemaining > 0 && isTimeCounting) {
      setTimeout(() => {
        setTimeRemaining((prevState) => prevState - 1);
      }, 1000);
    } else if (timeRemaining === 0) {
      endGame();
    }
  }, [timeRemaining, isTimeCounting]);

  return (
    <div className="main-content">
      <h1>How fast do you type?</h1>
      <textarea
        ref={textareaRef}
        name={text}
        value={text}
        onChange={(e) => setText(e.target.value)}
        disabled={!isTimeCounting}
      />
      <h4>Time remaining: {timeRemaining}</h4>
      <button disabled={isTimeCounting} onClick={startGame}>
        START
      </button>
      <h1>Word count:{wordCount}</h1>
    </div>
  );
}

export default App;
