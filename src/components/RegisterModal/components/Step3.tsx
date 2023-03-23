import { TextField } from "@mui/material";
import ReactLoading from "react-loading";
import React, { FC, useEffect, useState } from "react";
import firebase from "../../../utils/firebase";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../reducers";
import { useNavigate } from "react-router-dom";
import { setRegisterModalOpen } from "../../../reducers/controller";
import * as Styles from "../style";
const Step3: FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const registerData = useSelector(
    (state: RootState) => state.registerSliceReducer.registerData
  );
  const [passwordValue, setPasswordValue] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [errorMsgRender, setErrorMsgRender] = useState<boolean>(false);
  //註冊邏輯
  const handlePostRegister = (): void => {
    if (passwordValue.length < 8) return;
    setLoading(true);
    // 取到寫入資料必要物件
    const documentRef = firebase?.firestore()?.collection("users")?.doc();

    function generateRandomString() {
      const length = 10;
      const characters =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
      let result = "";

      for (let i = 0; i < length; i++) {
        result += characters.charAt(
          Math.floor(Math.random() * characters.length)
        );
      }

      return result;
    }

    firebase
      .auth()
      .createUserWithEmailAndPassword(registerData.mail, passwordValue)
      .then(() => {
        //傳入寫入資料的物件
        documentRef
          .set({
            mail: registerData.mail,
            name: registerData.name,
            membershipNumber: generateRandomString(),
            birthday: `${registerData.year}-${registerData.month}-${registerData.day}`,
            // firebase 提供 time-stamp 函式可用
            created_time: firebase.firestore.Timestamp.now(),
          })
          .then(() => {
            //註冊成功資料有寫入資料庫導回首頁
            navigate("/");
            dispatch(setRegisterModalOpen(false));
            window.location.reload();
            setLoading(false);
          })
          .catch(() => {
            console.log("寫入資料庫失敗");
            setLoading(false);
          });
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  };

  console.log(passwordValue.length < 8, "aa");

  useEffect(() => {
    if (passwordValue.length < 8 || passwordValue.length === 0) {
      setErrorMsgRender(true);
    } else {
      setErrorMsgRender(false);
    }
  }, [passwordValue.length]);
  return (
    <Styles.Step3>
      <div className="step3-title font-bold">你將需要密碼</div>
      <p>請確定密碼為8個字元以上</p>
      <TextField
        error={
          passwordValue.length >= 8 || passwordValue.length === 0 ? false : true
        }
        label="密碼"
        type="password"
        className="password"
        value={passwordValue}
        onChange={(e) => {
          setPasswordValue(e.target.value);
        }}
      />

      <div className={`error-msg font-bold`}>
        <p>
          {errorMsgRender && "你的密碼必須至少 8 個字元。請輸入較長的密碼。"}
        </p>
      </div>

      <div
        className={`${
          passwordValue.length < 8 ? "submit-register false" : "submit-register"
        }`}
        onClick={handlePostRegister}
      >
        {loading ? (
          <ReactLoading
            type={"spin"}
            color="#fff"
            height={"30px"}
            width={"30px"}
          />
        ) : (
          "下一步"
        )}
      </div>
    </Styles.Step3>
  );
};

export default Step3;
