import React from "react";
import { Link, NavLink, Outlet } from "react-router";
import Logoosman from "../Page/Shared/Logoosman";
import {
  FaUserEdit,
  FaMoneyCheckAlt,
  FaWallet,
  FaBullhorn,
  FaUserCheck,
  FaTasks,
  FaBoxOpen,
} from "react-icons/fa";
import useUserRole from "../Hooks/useUserRole";

const DashboardLayout = () => {
  const { role, roleLoading } = useUserRole();
  return (
    <div className="drawer lg:drawer-open">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col">
        {/* Navbar */}
        <div className="navbar bg-base-300 w-full lg:hidden">
          <div className="flex-none ">
            <label
              htmlFor="my-drawer-2"
              aria-label="open sidebar"
              className="btn btn-square btn-ghost"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="inline-block h-6 w-6 stroke-current"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                ></path>
              </svg>
            </label>
          </div>
          <div className="mx-2 flex-1 px-2 lg:hidden">Dashboard</div>
        </div>
        {/* Page content here */}
        <Outlet></Outlet>
        {/* Page content here */}
      </div>
      <div className="drawer-side">
        <label
          htmlFor="my-drawer-2"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4">
          {/* Logo */}
          <Link to="/" className=" text-xl">
            <Logoosman />
          </Link>

          {/* My Profile */}
          <li>
            <Link className="bg-amber-200" to="/dashboard">
              <FaUserEdit className="inline-block mr-2 " />
              My Profile
            </Link>
          </li>

          {/* Announcements */}
          <li>
            <NavLink to="/dashboard/announcements">
              <FaBullhorn className="inline-block mr-2" />
              Announcements
            </NavLink>
          </li>

          {/* member only routes */}

          {!roleLoading && role === "member" && (
            <>
              {/* Make Payment */}
              <li>
                <NavLink to="/dashboard/make-payment">
                  <FaMoneyCheckAlt className="inline-block mr-2" />
                  Make Payment
                </NavLink>
              </li>

              {/* Payment History */}
              <li>
                <NavLink to="/dashboard/payment-history">
                  <FaWallet className="inline-block mr-2" />
                  Payment History
                </NavLink>
              </li>
            </>
          )}
          {!roleLoading && role === "admin" && (
            <>
              {/* Manage Members */}
              <li>
                <NavLink to="/dashboard/manage-members">
                  <FaUserCheck className="inline-block mr-2" />
                  Manage Members
                </NavLink>
              </li>

              {/* Make Announcement */}
              <li>
                <NavLink to="/dashboard/make-announcement">
                  <FaBullhorn className="inline-block mr-2" />
                  Make Announcement
                </NavLink>
              </li>

              {/* Agreement Requests */}
              <li>
                <NavLink to="/dashboard/agreement-requests">
                  <FaTasks className="inline-block mr-2" />
                  Agreement Requests
                </NavLink>
              </li>

              {/* Manage Coupons */}
              <li>
                <NavLink to="/dashboard/manage-coupons">
                  <FaBoxOpen className="inline-block mr-2" />
                  Manage Coupons
                </NavLink>
              </li>
            </>
          )}

          {/* admin only routes */}
        </ul>
      </div>
    </div>
  );
};

export default DashboardLayout;
