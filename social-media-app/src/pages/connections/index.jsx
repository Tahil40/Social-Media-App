import React from "react";
import UserLayout from "@/layouts/userLayout";
import DashboardLayout from "@/layouts/dashboardLayout";

export default function MyConnectionPage() {
  return (
    <UserLayout>
      <DashboardLayout>
        <h1>My Connection Page</h1>
      </DashboardLayout>
    </UserLayout>
  );
}