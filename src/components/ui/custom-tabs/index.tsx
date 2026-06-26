import TabComponent from "./tabs";
import Wrapper from "../../other/Wrapper";

interface ITabs {
  label: string;
  content: React.ReactElement;
}

function RandomComponent() {
  return <h1>Some random content</h1>;
}

const Tabs = () => {
  const tabs: ITabs[] = [
    {
      label: "Tab 1",
      content: <div>This is content for Tab 1</div>,
    },
    {
      label: "Tab 2",
      content: <div>This is content for Tab 2</div>,
    },
    {
      label: "Tab 3",
      content: <RandomComponent />,
    },
  ];
  return (
    <Wrapper bgColor="bg-green-200" heading="Tabs">
      <TabComponent tabContent={tabs} />
    </Wrapper>
  );
};

export default Tabs;
