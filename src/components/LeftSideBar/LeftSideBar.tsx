import { useState } from "react";
import * as Styles from "./styles";
import { ReactComponent as TweetRWDSVG } from "../../img/leftSideBar/tweetRWD.svg";
import { User } from "@firebase/auth-types";
import { useDispatch, useSelector } from "react-redux";
import { userPublishedModalToggle } from "../../reducers/controller";
import { GlobalClientImg } from "../../styles/GlobalStyle";
import { LinkBar } from "./LinkBar";
import { RootState } from "../../reducers";
import firebase from "../../utils/firebase";
interface LeftSideBarProps {
  name: string;
}

const LeftSideBar = ({ name }: LeftSideBarProps) => {
  const dispatch = useDispatch();
  const user: User | null = firebase?.auth()?.currentUser || null;
  const locationPathname = window.location.pathname;
  const userLogin = useSelector(
    (state: RootState) => state.controllerSliceReducer.userLogin
  );

  const [toggleModalOpen, setToggleModalOpen] = useState<boolean>(false);

  // 登出邏輯
  const handleSignOut = (): void => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        window.location.reload();
      });
  };
  return (
    <Styles.LeftSideBar>
      <div className="top-container">
        <div className="logo">
          <img
            src={
              "https://firebasestorage.googleapis.com/v0/b/leo-project-2feea.appspot.com/o/newLogo.png?alt=media&token=4ad6269d-875b-4f05-b815-5a47591e2c61"
            }
            alt=""
          />
        </div>
        <div className="link-container">
          <LinkBar name={name} />
        </div>
        {userLogin && locationPathname !== "/chartroom" && (
          <div
            className="send"
            onClick={() => {
              dispatch(userPublishedModalToggle(true));
            }}
          >
            <div className="send-text">Send</div>
            <div className="send-rwd-svg">
              <TweetRWDSVG />
            </div>
          </div>
        )}
      </div>
      {userLogin && locationPathname !== "/chartroom" && (
        <div
          className="client-data"
          onClick={() => {
            setToggleModalOpen(!toggleModalOpen);
          }}
        >
          {toggleModalOpen && (
            <div className="client-data-modal">
              <div className="modal-item font-bold" onClick={handleSignOut}>
                Log out
              </div>
            </div>
          )}
          <GlobalClientImg
            src={
              user?.photoURL ||
              "https://firebasestorage.googleapis.com/v0/b/leo-project-2feea.appspot.com/o/5wtqshRu_400x400.jpg?alt=media&token=585c49af-3ac3-48e1-ad25-c70570926760"
            }
            alt=""
            Location="leftSideBar"
          ></GlobalClientImg>

          <div className="client-data-container">
            <div className="client-data-name">{user?.displayName}</div>
            <div className="client-data-serial-number">@fcdc102d9f60407</div>
          </div>
        </div>
      )}
    </Styles.LeftSideBar>
  );
};

export default LeftSideBar;
