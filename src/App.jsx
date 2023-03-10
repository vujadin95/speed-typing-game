import useCountingWords from "./useCountingWords";
import { useState, useRef, useEffect } from "react";

function App() {
  const [userTime, setUserTime] = useState("");
  const timeInputRef = useRef(null);

  const {
    textareaRef,
    text,
    setText,
    isTimeCounting,
    timeRemaining,
    startGame,
    wordCount,
  } = useCountingWords(userTime ? userTime : 10);

  useEffect(() => {
    setUserTime("");
  }, [isTimeCounting]);

  function handleKeyDown(e) {
    ["e", "E", "+", "-"].includes(e.key) && e.preventDefault();
    if (e.key === "Enter" && !isTimeCounting) {
      timeInputRef.current.focus();
    }
  }
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
      <div className="user-time">
        <p>Enter time to count: </p>
        <input
          onPaste={(e) => {
            e.preventDefault();
            return false;
          }}
          disabled={isTimeCounting}
          className="time-test"
          type="number"
          name={userTime}
          value={userTime}
          onKeyDown={(e) => handleKeyDown(e)}
          onChange={(e) => setUserTime(e.target.value)}
        />
      </div>
      <h4>Time remaining: {timeRemaining}</h4>
      <button ref={timeInputRef} disabled={isTimeCounting} onClick={startGame}>
        START
      </button>
      <h1>Word count: {wordCount}</h1>
    </div>
  );
}

export default App;
