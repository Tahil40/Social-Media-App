import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { getAllPosts } from "@/config/redux/action/postAction/PostAction";
import {
  fetchUserProfile,
  fetchAllUser,
} from "@/config/redux/action/authAction/AuthAction";
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
        {authState?.user.length === 0 ? (
          <h2>Loading...</h2>
        ) : (
          <div className={styles.scrollComponent}>
            <div className={styles.createPostContainer}>
              <img
                src={`${BaseURL}/${authState.user.userId.profilePicture}`}
                alt="loading..."
              />
              <textarea name="" id=""></textarea>
              <label htmlFor="uploadFile">
                <div className={styles.fabContainer}>
                  <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="size-6"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M12 4.5v15m7.5-7.5h-15"
                  />
                </svg>
                </div>
              </label>
              <input type="file" hidden id="uploadFile" />
            </div>
          </div>
        )}
      </DashboardLayout>
    </UserLayout>
  );
}