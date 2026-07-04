import { DeleteIcon, HistoryIcon } from "lucide-react";
import { useState, useEffect } from "react";
import { ALLOWED_KEYS, BUTTONS } from "../features/calc/constant";
import CalcButton from "../features/calc/CalcButton";
import { isNumber, formatNumber } from "../features/calc/helpers";
import { useCalculator } from "../features/calc/useCalc";
import type { IHistoryState } from "../features/calc/interfaces";

const LOCALSTORAGE_KEY = "history";

const defaultHistory = () => {
  try {
    const data = JSON.parse(localStorage.getItem(LOCALSTORAGE_KEY) || "[]");
    return Array.isArray(data) ? data : [];
  } catch (error) {
    return [];
  }
};

function AdvanceCalculator() {
  const [showText, setShowText] = useState<boolean>(false);
  const [showHistory, setShowHistory] = useState<boolean>(false);
  const [history, setHistory] = useState<IHistoryState[]>(defaultHistory());
  const {
    handleBtnClick,
    expressions,
    result,
    history: calcHistory,
  } = useCalculator();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const keyMap: Record<string, string> = {
        Enter: "=",
        Backspace: "del",
        Delete: "Ac",
        Escape: "Ac",
        "*": "×",
        "/": "÷",
      };

      const value = keyMap[e.key] ?? e.key;

      if (ALLOWED_KEYS.includes(value)) {
        e.preventDefault();
        handleBtnClick(value);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleBtnClick]);

  useEffect(() => {
    if (calcHistory && calcHistory.length > 0) {
      const newEntry = calcHistory[calcHistory.length - 1];
      setHistory((prev) => {
        // Prevent duplicate saving if the id already exists
        if (prev.some((item) => item.id === newEntry.id)) {
          return prev;
        }
        const updated = [...prev, newEntry];
        localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(updated));
        return updated;
      });
    }
  }, [calcHistory]);

  const clearHistory = () => {
    setHistory([]);
    localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify([]));
  };

  return (
    <main className="bg-[#DAF0FF] h-screen w-full flex justify-center items-center gap-10">
      <div className="bg-[#17181A] min-w-200 p-8.5 rounded-[39px] text-white flex flex-col justify-center items-center">
        {/* TODO = History Section */}
        <button
          className="cursor-pointer transition-all active:scale-95 self-end flex items-center gap-2"
          onMouseEnter={() => setShowText(true)}
          onMouseLeave={() => setShowText(false)}
          onClick={() => setShowHistory((prev) => !prev)}
        >
          <HistoryIcon />
          <span
            className={`overflow-hidden whitespace-nowrap transition-all duration-300 ease-in-out ${
              showText
                ? "max-w-32 opacity-100 translate-x-0"
                : "max-w-0 opacity-0 translate-x-2"
            }`}
          >
            View History
          </span>
        </button>

        {/* Display Area */}
        <div className="w-full flex flex-col items-end mt-30 mb-10">
          {/* Input Area */}
          <div className="flex flex-wrap min-h-9">
            {expressions.map((item, index) => (
              <div
                key={index}
                className={`${isNumber(item) ? "text-[#818181]" : "text-[#109DFF]"} text-[24px]`}
              >
                {item}
              </div>
            ))}
          </div>
          {/* Output area */}
          <div className="text-[48px] flex flex-wrap">
            ={formatNumber(result)}
          </div>
        </div>

        {/* Main Grid Area */}
        <div className="grid grid-cols-4 gap-x-5 gap-y-5.5 min-w-200">
          {BUTTONS.map((item) => {
            if (item.vlabel === "del") {
              return (
                <CalcButton
                  key={item.id}
                  colorId={item.btnCategory}
                  clickHandler={() => handleBtnClick(item.vlabel)}
                >
                  <DeleteIcon />
                </CalcButton>
              );
            }

            if (item.vlabel.toLowerCase() === "ac") {
              return (
                <CalcButton
                  key={item.id}
                  colorId={item.btnCategory}
                  clickHandler={() => handleBtnClick(item.vlabel)}
                >
                  {item.vlabel}
                </CalcButton>
              );
            }

            if (item.vlabel === "+") {
              return (
                <CalcButton
                  key={item.id}
                  colorId={item.btnCategory}
                  className="row-start-3 row-end-5 col-start-4"
                  clickHandler={() => handleBtnClick(item.vlabel)}
                >
                  {item.vlabel}
                </CalcButton>
              );
            }
            if (item.vlabel === "0") {
              return (
                <CalcButton
                  key={item.id}
                  colorId={item.btnCategory}
                  className="col-start-1 col-end-3"
                  clickHandler={() => handleBtnClick(item.vlabel)}
                >
                  {item.vlabel}
                </CalcButton>
              );
            }
            if (item.vlabel === "=") {
              return (
                <CalcButton
                  key={item.id}
                  colorId={item.btnCategory}
                  clickHandler={() => handleBtnClick(item.vlabel)}
                >
                  {item.vlabel}
                </CalcButton>
              );
            }
            return (
              <CalcButton
                key={item.id}
                colorId={item.btnCategory}
                clickHandler={() => handleBtnClick(item.vlabel)}
              >
                {item.vlabel}
              </CalcButton>
            );
          })}
        </div>
      </div>

      {showHistory && (
        <div className="w-100 max-h-200 overflow-y-scroll self-start mt-50 relative hide-scrollbar rounded-[39px] m-8">
          <ul className="bg-[#17181A] text-white overflow-y-auto min-h-200 p-6 rounded-[39px] relative">
            {history && history.length > 0 ? (
              history.map((item) => (
                <li
                  key={item.id}
                  className="p-3 border-b border-gray-600 last:border-b-0"
                >
                  <div className="text-sm text-[#818181]">
                    {item.expression}
                  </div>
                  <div className="text-lg font-semibold text-[#109DFF]">
                    ={item.result}
                  </div>
                </li>
              ))
            ) : (
              <div className="text-center text-[#818181] py-4">
                No history yet
              </div>
            )}
            <button
              type="button"
              className="text-white absolute bottom-5 mt-4"
              onClick={clearHistory}
            >
              Clear History
            </button>
          </ul>
        </div>
      )}
    </main>
  );
}

export default AdvanceCalculator;
