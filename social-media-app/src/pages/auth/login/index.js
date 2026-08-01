import React, { useEffect, useState } from "react";
import UserLayout from "@/layouts/userLayout";
import { useRouter } from "next/router";
import { useSelector, useDispatch } from "react-redux";
import style from "./auth.module.css";
import {
  loginUser,
  registerUser,
} from "@/config/redux/action/authAction/AuthAction";

export default function Login() {
  const [Name, SetName] = useState("");
  const [UserName, SetUserName] = useState("");
  const [Email, SetEmail] = useState("");
  const [Password, SetPassword] = useState("");
  const router = useRouter();
  const auth_state = useSelector((state) => {
    state.auth;
  });
  const dispatch = useDispatch();

  useEffect(() => {
    if (auth_state?.loggedIn) {
      router.push("/dashboard");
    }
  }, [auth_state?.loggedIn]);

  const [IsSignInMethod, SetIsSignInMethod] = useState(false);

  const handleLogin = () => {
    dispatch(loginUser({ email: Email, password: Password }));
  };

  const handleSignUp = () => {
    dispatch(
      registerUser({
        name: Name,
        username: UserName,
        email: Email,
        password: Password,
      }),
    );
  };

  const handleSubmit = () => {
    if (IsSignInMethod) {
      handleLogin();
    } else {
      handleSignUp();
    }
  };

  return (
    <UserLayout>
      <div className={style.container}>
        <div className={style.cardContainer}>
          <div className={style.cardContainer_left}>
            <p className={style.cardContainer_left_heading}>
              {IsSignInMethod ? "Sign In" : "Sign up"}
            </p>
            <p
              className={auth_state?.isError ? style.red : style.green}
              style={{ marginTop: "0.5rem" }}
            >
              {auth_state?.message.message}
            </p>

            <div className={style.inputFormContainer}>
              {!IsSignInMethod && (
                <div className={style.innerRow1}>
                  <input
                    className={style.inputUserNameField}
                    type="text"
                    placeholder="Username"
                    value={UserName}
                    onChange={(e) => {
                      SetUserName(e.target.value);
                    }}
                  />
                  <input
                    className={style.inputNameField}
                    type="text"
                    placeholder="Name"
                    value={Name}
                    onChange={(e) => {
                      SetName(e.target.value);
                    }}
                  />
                </div>
              )}
              <div className={style.innerRow2}>
                <input
                  className={style.inputEmailField}
                  type="email"
                  placeholder="Email"
                  value={Email}
                  onChange={(e) => {
                    SetEmail(e.target.value);
                  }}
                />
                <input
                  className={style.inputPasswordField}
                  type="password"
                  placeholder="Password"
                  value={Password}
                  onChange={(e) => {
                    SetPassword(e.target.value);
                  }}
                />
                <button
                  className={style.inputSubmitField}
                  onClick={handleSubmit}
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
          <div className={style.cardContainer_right}>
            
          </div>
        </div>
      </div>
    </UserLayout>
  );
}