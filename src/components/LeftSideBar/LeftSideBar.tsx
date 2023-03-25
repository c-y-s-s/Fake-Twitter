import { useState } from "react";
import * as Styles from "./styles";
import { ReactComponent as TweetRWDSVG } from "../../img/leftSideBar/tweetRWD.svg";
import { ReactComponent as TwitterSVG } from "../../img/leftSideBar/twitterLogo.svg";
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
  const user: any = firebase?.auth()?.currentUser || {};
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
        <div className="twitter-logo">{<TwitterSVG />}</div>
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
            src={user?.photoURL}
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
