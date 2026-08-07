import React from "react";
import styles from "./navbar.module.css";
import { useRouter } from "next/router";
import { useSelector, useDispatch } from "react-redux";
import { reset } from "@/config/redux/reducer/authReducer/AuthReducer";

const NavbarComponent = () => {
  const router = useRouter();
  const authState = useSelector((state) => {
    state.auth;
  });
  const dispatch = useDispatch();

  const handleLogout = () => {
    localStorage.removeItem("token");
    dispatch(reset);
    router.push("/auth/login");
  };

  return (
    <>
      <div className={styles.container}>
        <nav className={styles.navbar}>
          <h1
            className={styles.heading1}
            onClick={() => {
              router.push("/");
            }}
          >
            Pro Connect
          </h1>
          <div className={styles.navbarOptionsContainer}>
            {!authState?.profileFetched ? (
              <div
                className={styles.joinButton}
                onClick={() => {
                  router.push("/auth/login");
                }}
              >
                <p>Be a part</p>
              </div>
            ) : (
              <div style={styles.profileContainer}>
                <p>Hey, {authState.user.userId.name}Alex</p>
                <p>Profile</p>
                <p onClick={handleLogout}>Logout</p>
              </div>
            )}
          </div>
        </nav>
      </div>
    </>
  );
};

export default NavbarComponent;