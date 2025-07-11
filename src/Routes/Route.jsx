import { createBrowserRouter } from "react-router";
import MainLayouts from "../Layouts/MainLayouts";
import Home from "../Page/Home/Home/Home";
import About from "../Page/Home/About/About";
import TermsAndConditions from "../Page/Home/Terms/TermsAndConditions";
import PrivacyPolicy from "../Page/Home/PrivacyPolicy/PrivacyPolicy";
import AuthLayout from "../Layouts/AuthLayout";
import Register from "../Page/Authentication/Register/Register";
import Login from "../Page/Authentication/Login/login";
import AllApartments from "../Page/All Apartments/Apartments";

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
      {
        path: "/appartment",
        Component: AllApartments,
      },
    ],
  },
  {
    path: "/",
    Component: AuthLayout,
    children: [
      {
        path: "/register",
        Component: Register,
      },
      {
        path: "/login",
        Component: Login,
      },
    ],
  },
]);
