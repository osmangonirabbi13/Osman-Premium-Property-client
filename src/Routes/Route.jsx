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
import ApartmentDetails from "../Page/All Apartments/ApartmentDetails";
import PrivateRoute from "../Provider/PrivateRoute";
import DashboardLayout from "../Layouts/DashboardLayout";
import Makepayment from "../Page/Dashboard/Makepayment/Makepayment";
import AgreementRequests from "../Page/Dashboard/AgreementRequests/AgreementRequests";
import PaymentHistory from "../Page/Dashboard/Payment History/PaymentHistory";
import CouponManager from "../Page/Dashboard/CouponManager/CouponManager";
import Makeadmin from "../Page/Dashboard/Makeadmin/Makeadmin";
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
      {
        path: "/apartment/:id",
        element: (
          <PrivateRoute>
            <ApartmentDetails></ApartmentDetails>
          </PrivateRoute>
        ),
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
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout />
      </PrivateRoute>
    ),
    children: [
      {
        path: "make-payment",
        Component: Makepayment,
      },
      {
        path: "agreement-requests",
        Component: AgreementRequests,
      },
      {
        path: "payment-history",
        Component: PaymentHistory,
      },
      {
        path: "manage-coupons",
        Component: CouponManager,
      },
      {
        path: "manage-members",
        Component: Makeadmin,
      },
    ],
  },
]);
