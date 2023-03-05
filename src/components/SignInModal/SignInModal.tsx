import React, { FC, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as Styles from "./style";
import firebase from "../../utils/firebase";
import SignInStep1 from "./SignInStep1";
import { ReactComponent as TwitterSVG } from "../../img/leftSideBar/twitterLogo.svg";
import { ReactComponent as CrossSVG } from "../../img/cross.svg";

const SignInModal: FC = () => {
  // 判斷切換哪個元件
  const [signInComponent, setSignInComponent] = useState("0");

  const signInComponentJSX = (): JSX.Element => {
    switch (signInComponent) {
      case "0":
        return (
          <>
            <div className="center">
              <h2 className="sign-in-title">登入 Twitter</h2>
              {/* <div>使用 Google 帳戶登入</div> */}
              {/* <div className="second-text">
            <div className="second-text-line"></div>
            <div className="text">或</div>
            <div className="second-text-line"></div>
          </div> */}
              <input
                type="text"
                placeholder="電話、電子郵件或使用者名稱"
                className="sign-in-input"
              />
              <div
                className="sign-in-button next-step-button"
                onClick={() => {
                  setSignInComponent("1");
                }}
              >
                下一步
              </div>
              <div className="sign-in-button  forget-password">忘記密碼</div>
              <div className="bottom">
                還沒有帳戶嗎?
                <Link to="/register" className="register-text">
                  註冊
                </Link>
              </div>
            </div>
          </>
        );
      case "1":
        return <SignInStep1 />;

      default:
        return <></>;
    }
  };

  const navigator = useNavigate();
  return (
    <Styles.SignInModal>
      <div className="modal-container">
        <div className="top">
          <button
            className="close-button"
            onClick={() => {
              navigator("/");
            }}
          >
            <CrossSVG />
          </button>
          <TwitterSVG />
          <div></div>
        </div>
        {signInComponentJSX()}
      </div>
    </Styles.SignInModal>
  );
};

export default SignInModal;
