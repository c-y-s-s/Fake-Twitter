import { FC, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as Styles from "./style";
import firebase from "../../utils/firebase";
import SignInStep1 from "./SignInStep1";
import { ReactComponent as CrossSVG } from "../../img/cross.svg";
import { TextField } from "@mui/material";
import { useDispatch } from "react-redux";
import { setLoginModalOpen } from "../../reducers/controller";
import { sendPasswordResetEmail } from "firebase/auth";

const SignInModal: FC = () => {
  const user: any = firebase?.auth();

  // 判斷切換哪個元件
  const [signInComponent, setSignInComponent] = useState("0");
  const [mailValue, setMail] = useState<string>("");
  const [noUser, setNoUser] = useState<boolean>(false);
  const navigator = useNavigate();
  const dispatch = useDispatch();
  const handleMailChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setMail(e.target.value);
  };
  const body: HTMLBodyElement | null = document.querySelector("body");

  const handleConfirmMail = async () => {
    try {
      const UserData = await firebase
        .firestore()
        .collection("users")
        .where("mail", "==", mailValue)
        .get();

      const isUserData = UserData.docs.map((userItem) => {
        return userItem.data();
      });

      if (isUserData.length !== 0) {
        setNoUser(false);
        setSignInComponent("1");
      } else {
        setNoUser(true);

        // 3秒後讓提示字消失
        setTimeout(() => {
          setNoUser(false);
        }, 3000);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleSendPasswordResetEmail = () => {
    sendPasswordResetEmail(user, mailValue).then((a) => {
      alert("Password reset email sent");
    });
  };

  const signInComponentJSX = (): JSX.Element => {
    switch (signInComponent) {
      case "0":
        return (
          <>
            <div className="center">
              <h2 className="sign-in-title">登入社群</h2>
              {/* <div>使用 Google 帳戶登入</div> */}
              {/* <div className="second-text">
            <div className="second-text-line"></div>
            <div className="text">或</div>
            <div className="second-text-line"></div>
          </div> */}
              <TextField
                type="text"
                className="sign-in-input"
                value={mailValue}
                onChange={handleMailChange}
                id="outlined-error"
                label="電話、電子郵件或使用者名稱"
                placeholder="電話、電子郵件或使用者名稱"
              />
              {noUser && (
                <div className="nothing-account-text">
                  抱歉，我們找不到你的帳戶
                </div>
              )}
              <div
                className="sign-in-button next-step-button"
                onClick={handleConfirmMail}
              >
                下一步
              </div>
              <div
                className="sign-in-button  forget-password"
                onClick={handleSendPasswordResetEmail}
              >
                忘記密碼
              </div>
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
        return <SignInStep1 mailValue={mailValue} />;

      default:
        return <></>;
    }
  };

  const handleCloseModal = () => {
    dispatch(setLoginModalOpen(false));
    navigator("/");
    if (body) {
      body.style.overflow = "auto";
      return null;
    }
  };

  return (
    <Styles.SignInModal>
      <div className="modal-container">
        <div className="top">
          <button className="close-button" onClick={handleCloseModal}>
            <CrossSVG />
          </button>

          <div></div>
        </div>
        {signInComponentJSX()}
      </div>
    </Styles.SignInModal>
  );
};

export default SignInModal;
