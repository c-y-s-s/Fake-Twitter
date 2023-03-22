import { FC, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as Styles from "./style";
import firebase from "../../utils/firebase";
import SignInStep1 from "./SignInStep1";
import { ReactComponent as TwitterSVG } from "../../img/leftSideBar/twitterLogo.svg";
import { ReactComponent as CrossSVG } from "../../img/cross.svg";
import { TextField } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../reducers";
import { setLoginModalOpen } from "../../reducers/controller";
import { sendPasswordResetEmail } from "firebase/auth";

interface SignInModalPropsType {
  setLoginModalOpen?: boolean;
}
const SignInModal: FC = () => {
  const userLogin = useSelector(
    (state: RootState) => state.controllerSliceReducer.userLogin
  );

  const loginModalOpen = useSelector(
    (state: RootState) => state.controllerSliceReducer.loginModalOpen
  );
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

  const handleConfirmMail = () => {
    firebase
      .firestore()
      .collection("users")
      .where("mail", "==", mailValue)
      .get()
      .then((collectionSnapshot) => {
        const data = collectionSnapshot.docs.map((userItem) => {
          return userItem.data();
        });

        if (data.length !== 0) {
          setNoUser(false);
          setSignInComponent("1");
        } else {
          setNoUser(true);

          // 3秒後讓提示字消失
          setTimeout(() => {
            setNoUser(false);
          }, 3000);
        }
      })
      .catch((error) => {});
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
              <h2 className="sign-in-title">登入 Twitter</h2>
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
  };

  return (
    <Styles.SignInModal>
      <div className="modal-container">
        <div className="top">
          <button className="close-button" onClick={handleCloseModal}>
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
