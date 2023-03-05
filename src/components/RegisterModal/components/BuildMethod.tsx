import React, { Dispatch, FC, SetStateAction } from "react";
import { Link } from "react-router-dom";
import * as Styles from "../style";

interface BuildMethodProps {
  setStep: Dispatch<SetStateAction<Number>>;
}
const BuildMethod: FC<BuildMethodProps> = ({ setStep }) => {
  return (
    <Styles.BuildMethod>
      <div className="center">
        <h2 className="register-title">立即加入Twitter</h2>
        {/* <div>使用 Google 帳戶登入</div> */}
        <div className="second-text">
          {/* <div className="second-text-line"></div>
          <div className="text">或</div>
          <div className="second-text-line"></div> */}
        </div>

        <div
          className="register-button next-step-button"
          onClick={() => {
            setStep(1);
          }}
        >
          建立帳戶
        </div>
        <div className="bottom-text">
          <div>
            如果註冊，即表示你同意服務條款和隱私政策，包括 Cookie 使用政策。
          </div>
          <div className="sign-in-text">
            已經有帳戶了嗎？請
            <Link to="/login" className="sign-in-button">
              登入
            </Link>
          </div>
        </div>
      </div>
    </Styles.BuildMethod>
  );
};

export default BuildMethod;
