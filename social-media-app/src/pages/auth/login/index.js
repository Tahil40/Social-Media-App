import React, { useEffect, useState } from "react";
import UserLayout from "@/layouts/userLayout";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import style from "./auth.module.css";

export default function Login() {
  const router = useRouter();
  const auth_state = useSelector((state) => {
    state.auth;
  });

  useEffect(() => {
    if (auth_state?.loggedIn) {
      router.push("/dashboard");
    }
  }, []);

  const [IsSignInMethod, SetIsSignInMethod] = useState(false);

  return (
    <UserLayout>
      <div className={style.container}>
        <div className={style.cardContainer}>
          <div className={style.cardContainer_left}>
            <p className={style.cardContainer_left_heading}>
              {IsSignInMethod ? "Sign In" : "Sign up"}
            </p>

            <div className={style.inputFormContainer}>
              <div className={style.innerRow1}>
                <input
                className={style.inputUserNameField}
                type="text"
                placeholder="Username"
              />
              <input
                className={style.inputNameField}
                type="text"
                placeholder="Name"
              />
              </div>
              <div className={style.innerRow2}>
                <input className={style.inputEmailField} type="email" placeholder="Email"/>
                <input className={style.inputPasswordField} type="password" placeholder="Password"/>
                <button className={style.inputSubmitField}>Submit</button>
              </div>
            </div>
          </div>
          <div className={style.cardContainer_right}></div>
        </div>
      </div>
    </UserLayout>
  );
}