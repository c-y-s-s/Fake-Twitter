import React, { FC } from "react";
import { Link } from "react-router-dom";
import * as Styles from "./style";

const SignInModal: FC = () => {
  return (
    <Styles.SignInModal>
      <div className="modal-container">
        <div className="top">
          <div>x</div>
          <div>圖</div>
          <div></div>
        </div>
        <div className="center">
          <h2 className="sign-in-title">登入 Twitter</h2>
          {/* <div>使用 Google 帳戶登入</div> */}
          <div className="second-text">
            <div className="second-text-line"></div>
            <div className="text">或</div>
            <div className="second-text-line"></div>
          </div>
          <input
            type="text"
            placeholder="電話、電子郵件或使用者名稱"
            className="sign-in-input"
          />
          <div className="sign-in-button next-step-button">下一步</div>
          <div className="sign-in-button  forget-password">忘記密碼</div>
          <div className="bottom">
            還沒有帳戶嗎?
            <Link to="/register" className="register-text">
              註冊
            </Link>
          </div>
        </div>
      </div>
    </Styles.SignInModal>
  );
};

export default SignInModal;
