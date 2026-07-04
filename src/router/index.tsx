import { createBrowserRouter } from "react-router-dom";
import Portal from "../pages/Portal";
import MiniProjects from "../pages/MiniProjects";
import ComingSoon from "../pages/ComingSoon";
import AdvanceTodo from "../pages/AdvanceTodo";
import AdvanceCalculator from "../pages/AdvanceCalculator";
import GithubFinder from "../pages/GithubFinder";

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
    path: "/advance-todo",
    element: <AdvanceTodo />,
  },
  {
    path: "/advance-calculator",
    element: <AdvanceCalculator />,
  },
  {
    path: "/github-profile-finder",
    element: <GithubFinder />
  },
  {
    path: "*",
    element: <ComingSoon />,
  },
]);
