import { useState } from "react";
import Wrapper from "../../other/Wrapper";
import ACCORDION_DATA from "./data";

export default function Accordion() {
  const [selected, setSelected] = useState<string | null>(null);
  const [isMultiSelect, setIsMultiSelect] = useState<boolean>(false);
  const [multiple, setMultiple] = useState<string[]>([]);

  const handleSingleSelection = (selectedId: string): void => {
    setSelected(selectedId === selected ? null : selectedId);
  };

  const handleMultipleSelection = (selectedId: string): void => {
    const clone = [...multiple];
    const selectedIdIndex = clone.indexOf(selectedId);

    if (selectedIdIndex === -1) {
      clone.push(selectedId);
    } else {
      clone.splice(selectedIdIndex, 1);
    }

    setMultiple(clone);
  };

  const toggleMode = (): void => {
    setIsMultiSelect((prev) => !prev);
    setSelected(null);
    setMultiple([]);
  };

  return (
    <Wrapper bgColor="bg-violet-100" isFlex>
      <div className="flex flex-col gap-4">
        {/* Toggle Button */}
        <div className="flex gap-3 items-center mb-4">
          <div
            className={`w-10 h-5 rounded-full cursor-pointer transition-all ${
              isMultiSelect ? "bg-blue-300" : "bg-gray-300"
            }`}
            onClick={toggleMode}
          >
            <div
              className={`w-5 h-5 bg-blue-600 rounded-full shadow-lg transition-all ${
                isMultiSelect ? "translate-x-5" : "translate-x-0"
              }`}
            />
          </div>

          <p className="text-md font-semibold">
            Toggle Multi-Select Accordion
          </p>
        </div>

        {ACCORDION_DATA?.length > 0 ? (
          ACCORDION_DATA.map((item) => {
            const isOpen = isMultiSelect
              ? multiple.includes(item.id)
              : selected === item.id;

            return (
              <div
                key={item.id}
                className="max-w-130 cursor-pointer px-3 py-2 rounded-lg bg-slate-300 select-none"
                onClick={
                  isMultiSelect
                    ? () => handleMultipleSelection(item.id)
                    : () => handleSingleSelection(item.id)
                }
              >
                {/* Title */}
                <div className="flex items-center justify-between gap-4">
                  <h3 className="text-md font-semibold">
                    {item.question}
                  </h3>

                  <span className="text-2xl">
                    {isOpen ? "–" : "+"}
                  </span>
                </div>

                {/* Content */}
                <div
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${
                    isOpen
                      ? "max-h-40 opacity-100 py-3"
                      : "max-h-0 opacity-0 py-0"
                  }`}
                >
                  <div className="px-2 py-3">{item.answer}</div>
                </div>
              </div>
            );
          })
        ) : (
          <div>No Data Found</div>
        )}
      </div>
    </Wrapper>
  );
}