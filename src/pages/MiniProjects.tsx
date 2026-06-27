import { lazy, Suspense } from "react";
import { Analytics } from "@vercel/analytics/react";

const Accordion = lazy(() => import("../components/ui/accordian"));
const RandomColor = lazy(() => import("../components/ui/random-color-gen"));
const StarRating = lazy(() => import("../components/ui/star-rating"));
const ImageSlider = lazy(() => import("../components/ui/image-slider"));
const LoadMore = lazy(() => import("../components/ui/load-more"));
const TreeView = lazy(() => import("../components/ui/tree-view"));
const QRCodeGenerator = lazy(() => import("../components/ui/qr-code-generator"));
const ThemeSwitcher = lazy(() => import("../components/ui/theme-switcher"));
const ScrollIndicator = lazy(() => import("../components/ui/scroll-indicator"));
const Tabs = lazy(() => import("../components/ui/custom-tabs"));
const ModalParent = lazy(() => import("../components/ui/custom-modal"));

const LoaderComponent = ({ compName }: { compName: string }) => (
  <p>Loading {compName}...</p>
);

export default function MiniProjects() {
  return (
    <>
      <Analytics />
      <Suspense fallback={<LoaderComponent compName="Accordion" />}>
        <Accordion />
      </Suspense>
      <Suspense fallback={<LoaderComponent compName="Random Color" />}>
        <RandomColor />
      </Suspense>
      <Suspense fallback={<LoaderComponent compName="Star Rating" />}>
        <StarRating />
      </Suspense>
      <Suspense fallback={<LoaderComponent compName="Image Slider" />}>
        <ImageSlider url="https://picsum.photos/v2/list" page="1" limit="10" />
      </Suspense>
      <Suspense fallback={<LoaderComponent compName="Load More" />}>
        <LoadMore />
      </Suspense>
      <Suspense fallback={<LoaderComponent compName="Tree View" />}>
        <TreeView />
      </Suspense>
      <Suspense fallback={<LoaderComponent compName="QR Code Generator" />}>
        <QRCodeGenerator />
      </Suspense>
      <Suspense fallback={<LoaderComponent compName="Theme Switcher" />}>
        <ThemeSwitcher />
      </Suspense>
      <Suspense fallback={<LoaderComponent compName="Scroll Indicator" />}>
        <ScrollIndicator />
      </Suspense>
      <Suspense fallback={<LoaderComponent compName="Tabs" />}>
        <Tabs />
      </Suspense>
      <Suspense fallback={<LoaderComponent compName="Custom Modal" />}>
        <ModalParent />
      </Suspense>
    </>
  );
}
