import { Analytics } from "@vercel/analytics/react";
import Accordion from "./components/ui/accordian";
import RandomColor from "./components/ui/random-color-gen";
import StarRating from "./components/ui/star-rating";

function App() {
  return (
    <>
      <Analytics />
      <Accordion />
      <RandomColor />
      <StarRating />
    </>
  );
}

export default App;
