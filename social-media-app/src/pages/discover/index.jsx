import React from "react";
import UserLayout from "@/layouts/userLayout";
import DashboardLayout from "@/layouts/dashboardLayout";

export default function Discover() {
  return (
    <UserLayout>
      <DashboardLayout>
        <h1>Discover Page</h1>
      </DashboardLayout>
    </UserLayout>
  );
}