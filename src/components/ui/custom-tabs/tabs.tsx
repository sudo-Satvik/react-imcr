import { useState, type FC } from "react";

interface ITabs {
  label: string;
  content: React.ReactElement;
}

interface TabsProps {
  tabContent: ITabs[];
}

const TabComponent: FC<TabsProps> = ({ tabContent }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  function handleOnClick(getCurrentIndex: number) {
    setCurrentIndex(getCurrentIndex);
  }

  return (
    <div className="flex flex-col items-center gap-5 max-w-100">
      <div className="px-5 py-3 flex justify-center items-center gap-5 rounded-lg bg-gray-300 w-full">
        {tabContent &&
          tabContent.map((tab: ITabs, index: number) => (
            <div
              className={`py-2 px-5 rounded-lg cursor-pointer ${currentIndex === index ? "bg-gray-500 text-white" : "text-black "}`}
              key={tab.label}
              onClick={() => handleOnClick(index)}
            >
              {tab.label}
            </div>
          ))}
      </div>

      <div>{tabContent[currentIndex] && tabContent[currentIndex].content}</div>
    </div>
  );
};

export default TabComponent;
