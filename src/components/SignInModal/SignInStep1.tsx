import { TextField } from "@mui/material";
import React, { useState } from "react";
import * as Styles from "./style";
import firebase from "../../utils/firebase";
import { useNavigate } from "react-router-dom";
import {
  setLoginModalOpen,
  setRegisterModalOpen,
} from "../../reducers/controller";
import { useDispatch } from "react-redux";

interface SignStep1Props {
  mailValue: string;
}
const SignInStep1 = ({ mailValue }: SignStep1Props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [passwordValue, setPasswordValue] = useState<string>("");

  const [errorText, setErrorText] = useState<string>("");
  const handleSignIn = (): void => {
    if (passwordValue.length <= 0) return;

    firebase
      .auth()
      .signInWithEmailAndPassword(mailValue, passwordValue)
      .then(() => {
        navigate("/");
        dispatch(setLoginModalOpen(false));
        dispatch(setRegisterModalOpen(false));
      })
      .catch((error) => {
        if (error.code === "auth/wrong-password") {
          setErrorText("密碼錯誤");

          setTimeout(() => {
            setErrorText("");
          }, 3000);
        } else {
          console.log("太多的請求");
        }
      });
  };
  return (
    <Styles.SignInStep1>
      <div>
        <h1>輸入你的密碼</h1>
        <TextField disabled className="step1-mail" value={mailValue} />
        <TextField
          label="password"
          type="password"
          autoComplete="current-password"
          className="step1-password"
          value={passwordValue}
          onChange={(e) => {
            setPasswordValue(e.target.value);
          }}
        />
        <p className="forget-password-text">忘記密碼?</p>
      </div>
      <div>
        <div
          className={
            passwordValue.length >= 1
              ? "step1-sign-in can-press"
              : "step1-sign-in"
          }
          onClick={handleSignIn}
        >
          登入
        </div>
      </div>
      {errorText && <div className="password-error">密碼錯誤</div>}
    </Styles.SignInStep1>
  );
};

export default SignInStep1;
