import { useCallback, useState } from "react";
import { containsTwoDigits, hasSpecialChar } from "./helpers";
import type { IHistoryState } from "./interfaces";

export function useCalculator() {
  const [expressions, setExpressions] = useState<string[]>([]);
  const [result, setResult] = useState<number>(0);
  const [history, setHistory] = useState<IHistoryState[]>([]);

  const operators = ["+", "-", "×", "÷", "%"];

  const calculateResult = useCallback(() => {
    const expr = expressions.join("").replace(/×/g, "*").replace(/÷/g, "/");

    try {
      if (containsTwoDigits(expr) && !hasSpecialChar(expr)) {
        const res = Function(`return ${expr}`)();
        setResult(res);
        setHistory((prev) => [
          ...prev,
          {
            id: Date.now().toString(),
            expression: expressions.join(""),
            result: res.toString(),
          },
        ]);
      }
    } catch {
      setResult(0);
    }
  }, [expressions]);

  const handleBtnClick = useCallback(
    (clickedInfo: string): void => {
      switch (clickedInfo) {
        case "Ac":
          setExpressions([]);
          setResult(0);
          break;

        case "del":
          setExpressions((prev) => prev.slice(0, -1));
          break;

        case "=":
          calculateResult();
          break;

        default:
          setExpressions((prev) => {
            const last = prev[prev.length - 1];

            const isCurrentOperator = operators.includes(clickedInfo);
            const isLastOperator = operators.includes(last);

            // Prevent: + +, + ×, ÷ -, etc.
            if (isCurrentOperator && isLastOperator) {
              return prev;
            }

            return [...prev, clickedInfo];
          });
      }
    },
    [calculateResult]
  );

  return {
    handleBtnClick,
    expressions,
    result,
    calculateResult,
    history,
    setHistory,
  };
}
