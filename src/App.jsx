import useCountingWords from "./useCountingWords";

function App() {
  const {
    textareaRef,
    text,
    setText,
    isTimeCounting,
    timeRemaining,
    startGame,
    wordCount,
  } = useCountingWords();

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
      <h1>Word count: {wordCount}</h1>
    </div>
  );
}

export default App;
