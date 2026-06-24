import { Analytics } from "@vercel/analytics/react";
import Accordion from "./components/ui/accordian";
import RandomColor from "./components/ui/random-color-gen";
import StarRating from "./components/ui/star-rating";
import ImageSlider from "./components/ui/image-slider";
import LoadMore from "./components/ui/load-more";
import TreeView from "./components/ui/tree-view";

function App() {
  return (
    <>
      <Analytics />
      <Accordion />
      <RandomColor />
      <StarRating />
      <ImageSlider url="https://picsum.photos/v2/list" page="1" limit="10" />
      <LoadMore />
      <TreeView />
    </>
  );
}

export default App;
