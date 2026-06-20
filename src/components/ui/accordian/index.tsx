import { useState } from "react";
import Wrapper from "../../other/Wrapper";
import ACCORDION_DATA from "./data";

export default function Accordion() {
  const [isMultiple, setIsMultiple] = useState<boolean>(false);
  const [singleSelect, setSingleSelect] = useState<string | null>(null);
  const [multipleSelect, setMultipleSelect] = useState<string[]>([]);

  const handleSingleSelection = (selectedId: string): void =>
    setSingleSelect(selectedId === singleSelect ? null : selectedId);

  const handleMultipleSelection = (selectedId: string): void => {
    let cloneArray = [...multipleSelect];

    const selectedIndex = cloneArray.indexOf(selectedId);

    if (selectedIndex === -1) {
      cloneArray.push(selectedId);
    } else {
      cloneArray.splice(selectedIndex, 1);
    }

    setMultipleSelect(cloneArray);
  };

  const toggleMultiple = () => {
    setIsMultiple((prev) => !prev);
    setSingleSelect(null);
    setMultipleSelect([]);
  };

  return (
    <Wrapper bgColor="bg-violet-100" heading="Accordion">
      <div className="flex flex-col gap-4">
        {/* Toggle Button */}
        <div className="flex gap-3 items-center mb-4">
          <div
            className={`w-10 h-5 rounded-full cursor-pointer transition-all ${
              isMultiple ? "bg-blue-300" : "bg-gray-300"
            }`}
            onClick={toggleMultiple}
          >
            <div
              className={`w-5 h-5 bg-blue-600 rounded-full shadow-lg transition-all ${
                isMultiple ? "translate-x-5" : "translate-x-0"
              }`}
            />
          </div>

          <p className="text-md font-semibold">
            Toggle Multi-Select Accordion {isMultiple ? "Off" : "On"}
          </p>
        </div>

        {ACCORDION_DATA?.length > 0 ? (
          ACCORDION_DATA.map((item) => {
            const isOpen = isMultiple
              ? multipleSelect.includes(item.id)
              : singleSelect === item.id;
            return (
              <div
                key={item.id}
                className="max-w-130 cursor-pointer px-3 py-2 rounded-lg bg-slate-300 select-none"
                onClick={() =>
                  !isMultiple
                    ? handleSingleSelection(item.id)
                    : handleMultipleSelection(item.id)
                }
              >
                {/* Title */}
                <div className="flex items-center justify-between gap-4">
                  <h3 className="text-md font-semibold">{item.question}</h3>

                  <span className="text-2xl">{isOpen ? "–" : "+"}</span>
                </div>

                {/* Content */}
                <div
                  className={`overflow-hidden transition-all duration-300 ease-in-out
                    ${isOpen ? "max-h-40 opacity-100" : "max-h-0 opacity-0"}
                    `}
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
