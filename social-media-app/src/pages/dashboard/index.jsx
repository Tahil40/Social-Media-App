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
import styles from "./index.module.css";

const BaseURL = "http://localhost:3000";

export default function Dashboard() {
  const router = useRouter();
  const [IsTokenPresent, SetIsTokenPresent] = useState(false);
  const dispatch = useDispatch();
  const authState = useSelector((state) => {
    state.auth;
  });
  const [PostContent, SetPostContent] = useState("");
  const [FileContent, SetFileContent] = useState();

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
    if (!authState?.allProfilesFetched) {
      dispatch(fetchAllUser());
    }
  }, [authState?.isTokenThere]);

  return (
    <UserLayout>
      {/* {authState?.profileFetched && <div>Hey {authState?.user.userId.name}</div>} */}
      <DashboardLayout>
        {authState?.user?.length === 0 ? (
          <h2>Loading...</h2>
        ) : (
          <div className={styles.scrollComponent}>
            <div className={styles.createPostContainer}>
              {/* <img
                src={`${BaseURL}/${authState?.user?.userId.profilePicture}`}
                alt="loading..."
              /> */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                />
              </svg>
              <textarea
                value={PostContent}
                onChange={(e) => {
                  SetPostContent(e.target.value);
                }}
                name=""
                id=""
                placeholder="What's in yout mind?"
              />
              {PostContent.length > 0 && (
                <label htmlFor="uploadFile">
                  <div className={styles.fabContainer}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="size-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 4.5v15m7.5-7.5h-15"
                      />
                    </svg>
                  </div>
                </label>
              )}
              <input type="file" hidden id="uploadFile" onChange={(e) => {SetFileContent(e.target.files[0])}} />
            </div>
          </div>
        )}
      </DashboardLayout>
    </UserLayout>
  );
}
