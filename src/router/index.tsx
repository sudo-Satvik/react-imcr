import { createBrowserRouter } from "react-router-dom";
import Portal from "../pages/Portal";
import MiniProjects from "../pages/MiniProjects";
import ComingSoon from "../pages/ComingSoon";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Portal />,
  },
  {
    path: "/mini-projects",
    element: <MiniProjects />,
  },
  {
    path: "*",
    element: <ComingSoon />,
  }
]);
