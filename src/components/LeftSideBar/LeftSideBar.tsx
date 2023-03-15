import React from "react";
import * as Styles from "./styles";

import { ReactComponent as TweetRWDSVG } from "../../img/leftSideBar/tweetRWD.svg";
import { ReactComponent as TwitterSVG } from "../../img/leftSideBar/twitterLogo.svg";
import { useDispatch, useSelector } from "react-redux";
import { userPublishedModalToggle } from "../../reducers/controller";
import { GlobalClientImg } from "../../styles/GlobalStyle";
import { LinkBar } from "./LinkBar";
import { RootState } from "../../reducers";

interface LeftSideBarProps {
  name: string;
}

const LeftSideBar = ({ name }: LeftSideBarProps) => {
  const dispatch = useDispatch();

  const userLogin = useSelector(
    (state: RootState) => state.controllerSliceReducer.userLogin
  );

  return (
    <Styles.LeftSideBar>
      <div className="top-container">
        <div className="twitter-logo">
          <TwitterSVG />
        </div>
        <div className="link-container">
          <LinkBar name={name} />
        </div>
        {userLogin && (
          <div
            className="tweet"
            onClick={() => {
              dispatch(userPublishedModalToggle(true));
            }}
          >
            <div className="tweet-text"> Tweet</div>
            <div className="tweet-rwd-svg">
              <TweetRWDSVG />
            </div>
          </div>
        )}
      </div>
      {userLogin && (
        <div className="client-data">
          <GlobalClientImg
            src="/static/media/userImg.e01a53f21b11b7147abf.jpg"
            alt=""
            Location="leftSideBar"
          ></GlobalClientImg>

          <div className="client-data-container">
            <div className="client-data-name">Leo Chang</div>
            <div className="client-data-serial-number">@fcdc102d9f60407</div>
          </div>
        </div>
      )}
    </Styles.LeftSideBar>
  );
};

export default LeftSideBar;
