import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { getAllPosts } from "@/config/redux/action/postAction/PostAction";
import { fetchUserProfile, fetchAllUser } from "@/config/redux/action/authAction/AuthAction";
import UserLayout from "@/layouts/userLayout";
import DashboardLayout from "@/layouts/dashboardLayout";

export default function Dashboard() {
  const router = useRouter();
  const [IsTokenPresent, SetIsTokenPresent] = useState(false);
  const dispatch = useDispatch();
  const authState = useSelector((state) => {
    state.auth;
  });

  // useEffect(() => {
  //   if (localStorage.getItem("token") === "null") {
  //     router.push("/auth/login");
  //   }

  //   SetIsTokenPresent(true);
  // }, []);

  // useEffect(() => {
  //   if (IsTokenPresent) {
  //     dispatch(getAllPosts());
  //     dispatch(fetchUserProfile({ token: localStorage.getItem("token") }));
  //   }
  // }, [IsTokenPresent]);
  useEffect(() => {
    if (authState?.isTokenThere) {
      dispatch(getAllPosts());
      dispatch(fetchUserProfile({ token: localStorage.getItem("token") }));
    }
    if (!authState.allProfilesFetched) {
      dispatch(fetchAllUser());
    }
  }, [authState?.isTokenThere]);

  return (
    <UserLayout>
      {/* {authState?.profileFetched && <div>Hey {authState?.user.userId.name}</div>} */}
      <DashboardLayout>
        <h1>Dashboard Page</h1>
      </DashboardLayout>
    </UserLayout>
  );
}
