import React, { useEffect, useState } from "react";
import UserLayout from "@/layouts/userLayout";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import style from "./auth.style.css";

export default function Login() {
  const router = useRouter();
  const auth_state = useSelector((state) => {
    state.auth;
  });

  useEffect(() => {
    if (auth_state.loggedIn) {
      router.push("/dashboard");
    }
  }, []);

  const [IsSignInMethod, SetIsSignInMethod] = useState(false);

  return (
    <UserLayout>
      <div className={style.cardContainer}>
        <div className={style.cardContainer_left}>
          <p>{IsSignInMethod ? "Sign In" : "Sign up"}</p>
        </div>
        <div className={style.cardContainer_right}></div>
      </div>
    </UserLayout>
  );
}