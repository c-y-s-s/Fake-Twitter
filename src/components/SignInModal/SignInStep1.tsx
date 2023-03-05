import { TextField } from "@mui/material";
import React, { useState } from "react";
import * as Styles from "./style";
import firebase from "../../utils/firebase";
import { useNavigate } from "react-router-dom";

const SignInStep1 = () => {
  const navigate = useNavigate();
  const [passwordValue, setPasswordValue] = useState<string>("");

  const handleSignIn = (): void => {
    firebase
      .auth()
      .signInWithEmailAndPassword("asfasf@test.com", passwordValue)
      .then(() => {
        navigate("/");
      });
  };
  return (
    <Styles.SignInStep1>
      <h1>輸入你的密碼</h1>
      <TextField disabled className="step1-mail" value={"asfasf@test.com"} />
      <TextField
        label="password"
        autoComplete="current-password"
        className="step1-password"
        value={passwordValue}
        onChange={(e) => {
          setPasswordValue(e.target.value);
        }}
      />
      <p>忘記密碼</p>
      <div className="step1-sign-in" onClick={handleSignIn}>
        登入
      </div>
      <div>還沒有帳戶嗎? 註冊</div>
    </Styles.SignInStep1>
  );
};

export default SignInStep1;
