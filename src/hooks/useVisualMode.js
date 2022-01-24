import { useState } from "react";

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  function transition(next, replace=false) {
    setMode(next);
    const historyArray = [...history]
    if (!replace) {
      historyArray.push(next)
    }
    setHistory(historyArray)
  }

  function back() {
    const historyArray = [...history]
    if (historyArray.length > 1) {
      historyArray.pop()
      setMode(historyArray[historyArray.length - 1])
      setHistory(historyArray)
    }
  }

  return { mode, transition, back };
}
