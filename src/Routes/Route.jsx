import { createBrowserRouter } from "react-router";
import MainLayouts from "../Layouts/MainLayouts";
import Home from "../Page/Home/Home/Home";
import About from "../Page/Home/About/About";
import TermsAndConditions from "../Page/Home/Terms/TermsAndConditions";
import PrivacyPolicy from "../Page/Home/PrivacyPolicy/PrivacyPolicy";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: MainLayouts,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: "/about",
        Component: About,
      },
      {
        path: "/TermsAndConditions",
        Component: TermsAndConditions,
      },
      {
        path: "/PrivacyPolicy",
        Component: PrivacyPolicy,
      },
    ],
  },
]);
