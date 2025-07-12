import React from "react";
import useUserRole from "../../../Hooks/useUserRole";
import UserDashboard from "./UserDashboard";
import MemberDashboard from "./MemberDashboard";
import AdminDashboard from "./AdminDashboard";
import Forbidden from "../../Shared/Forbidden";

const DashboardHome = () => {
  const { role, roleLoading } = useUserRole();

  if (roleLoading) {
    return <p className="text-center mt-10">Loading requests...</p>;
  }

  let content;

  if (role === "user") {
    content = <UserDashboard />;
  } else if (role === "member") {
    content = <MemberDashboard />;
  } else if (role === "admin") {
    content = <AdminDashboard />;
  } else {
    content = <Forbidden />;
  }

  return <>{content}</>;
};

export default DashboardHome;
