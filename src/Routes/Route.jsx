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
import Announcements from "../Page/Dashboard/MakeAnnouncements/Announcements";
import MakeAnnouncement from "../Page/Dashboard/MakeAnnouncements/MakeAnnouncements";
import Forbidden from "../Page/Shared/Forbidden";
import DashboardHome from "../Page/Dashboard/DashboardHome/DashboardHome";
import MemberRoute from "../Provider/MemberRoute";
import AdminRoute from "../Provider/AdminRoute";
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
        path: "/forbidden",
        Component: Forbidden,
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
        index: true,
        Component: DashboardHome,
      },
      {
        path: "announcements",
        Component: Announcements,
      },

      // member only routes

      {
        path: "make-payment",
        element: (
          <MemberRoute>
            <Makepayment></Makepayment>
          </MemberRoute>
        ),
      },

      {
        path: "payment-history",
        element: (
          <MemberRoute>
            <PaymentHistory />
          </MemberRoute>
        ),
      },

      // Admin only routes

      {
        path: "agreement-requests",
        element: (
          <AdminRoute>
            <AgreementRequests />
          </AdminRoute>
        ),
      },
      {
        path: "manage-coupons",
        element: (
          <AdminRoute>
            <CouponManager></CouponManager>
          </AdminRoute>
        ),
      },

      {
        path: "manage-members",
        element: (
          <AdminRoute>
            <Makeadmin />
          </AdminRoute>
        ),
      },
      {
        path: "make-announcement",
        element: (
          <AdminRoute>
            <MakeAnnouncement />
          </AdminRoute>
        ),
      },
    ],
  },
]);
