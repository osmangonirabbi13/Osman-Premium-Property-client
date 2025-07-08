import { createBrowserRouter } from "react-router";
import MainLayouts from "../Layouts/MainLayouts";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: MainLayouts,
  },
]);
