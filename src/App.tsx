import { Analytics } from "@vercel/analytics/react";
import Accordion from "./components/ui/accordian";
import RandomColor from "./components/ui/random-color-gen";

function App() {
  return (
    <>
      <Accordion />
      <RandomColor />
      <Analytics />
    </>
  );
}

export default App;
