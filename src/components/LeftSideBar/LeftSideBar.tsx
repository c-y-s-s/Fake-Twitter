import React from "react";
import * as Styles from "./styles";

import { ReactComponent as HomeSVG } from "../../img/leftSideBar/home.svg";
import { ReactComponent as NotificationsSVG } from "../../img/leftSideBar/notifications.svg";
import { ReactComponent as Explore } from "../../img/leftSideBar/explore.svg";
import { ReactComponent as MessagesSVG } from "../../img/leftSideBar/messages.svg";
import { ReactComponent as BookMarksSVG } from "../../img/leftSideBar/bookmarks.svg";
import { ReactComponent as ListsSVG } from "../../img/leftSideBar/lists.svg";
import { ReactComponent as ProfileSVG } from "../../img/leftSideBar/profile.svg";
import { ReactComponent as TwitterSVG } from "../../img/leftSideBar/twitterLogo.svg";

interface HomeProps {
  name: string;
}

const LeftSideBar = ({ name }: HomeProps) => {
  const LinkData = [
    {
      text: "Home",
      svg: <HomeSVG />,
      link: "/",
    },
    {
      text: "Explore",
      svg: <Explore />,
      link: "explore",
    },
    {
      text: "Notifications",
      svg: <NotificationsSVG />,
      link: "notifications",
    },
    {
      text: "Messages",
      svg: <MessagesSVG />,
      link: "messages",
    },
    {
      text: "Bookmarks",
      svg: <BookMarksSVG />,
      link: "bookmarks",
    },
    {
      text: "ListsSVG",
      svg: <ListsSVG />,
      link: "lists",
    },
    {
      text: "ProfileSVG",
      svg: <ProfileSVG />,
      link: "profileSVG",
    },
  ];

  return (
    <Styles.LeftSideBar>
      <div className="top-container">
        <div className="twitter-logo">
          <TwitterSVG />
        </div>
        <div className="link-container">
          {LinkData.map((item, index) => {
            return (
              <div
                className={`link-item ${name === item.text ? "font-bold" : ""}`}
                key={index}
              >
                {item.svg}
                <a href={item.link}>{item.text}</a>
              </div>
            );
          })}
        </div>
        <div className="tweet">Tweet</div>
      </div>
      <div className="client-data">
        <div className="client-data-img"></div>
        <div className="client-data-container">
          <div className="client-data-name">Leo Chang</div>
          <div className="client-data-serial-number">@fcdc102d9f60407</div>
        </div>
      </div>
    </Styles.LeftSideBar>
  );
};

export default LeftSideBar;
