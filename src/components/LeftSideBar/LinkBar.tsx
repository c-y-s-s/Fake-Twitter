import React, { FC } from "react";
import { ReactComponent as HomeSVG } from "../../img/leftSideBar/home.svg";
import { ReactComponent as NotificationsSVG } from "../../img/leftSideBar/notifications.svg";
import { ReactComponent as Explore } from "../../img/leftSideBar/explore.svg";
import { ReactComponent as MessagesSVG } from "../../img/leftSideBar/messages.svg";
import { ReactComponent as BookMarksSVG } from "../../img/leftSideBar/bookmarks.svg";
import { ReactComponent as ListsSVG } from "../../img/leftSideBar/lists.svg";
import { ReactComponent as ProfileSVG } from "../../img/leftSideBar/profile.svg";

import { ReactComponent as SearchSVG } from "../../img/leftSideBar/search.svg";
import { useSelector } from "react-redux";
import { RootState } from "../../reducers";
import { Link, useNavigate } from "react-router-dom";

interface LinkBarBarProps {
  name: string;
}
export const LinkBar: FC<LinkBarBarProps> = ({ name }) => {
  const userLogin = useSelector(
    (state: RootState) => state.controllerSliceReducer.userLogin
  );
  const navigator = useNavigate();
  // 註解起來的是還沒新增的功能
  const LinkData =
    userLogin !== null
      ? [
          {
            text: "Home",
            svg: <HomeSVG />,
            link: "/",
            className: "home",
          },
          {
            text: "Search",
            svg: <SearchSVG />,
            link: "/explore",
            className: "search",
          },
          {
            text: "Explore",
            svg: <Explore />,
            link: "/explore",
            className: "explore",
          },
          // {
          //   text: "Notifications",
          //   svg: <NotificationsSVG />,
          //   link: "notifications",
          //   className: "notifications",
          // },
          {
            text: "Messages",
            svg: <MessagesSVG />,
            link: "/chartroom",
            className: "messages",
          },
          // {
          //   text: "Bookmarks",
          //   svg: <BookMarksSVG />,
          //   link: "bookmarks",
          //   className: "bookmarks",
          // },
          // {
          //   text: "Lists",
          //   svg: <ListsSVG />,
          //   link: "lists",
          //   className: "lists",
          // },
          {
            text: "Profile",
            svg: <ProfileSVG />,
            link: "/profile",
            className: "profile",
          },
        ]
      : [
          {
            text: "Explore",
            svg: <Explore />,
            link: "/explore",
            className: "explore",
          },
        ];

  return (
    <div className="link-container">
      {LinkData.map((item, index) => {
        return (
          <div
            className={`link-item  ${item.className}  ${
              name === item.text ? "font-bold" : ""
            }   ${item.className === "messages" && "messages-none"}`}
            key={index}
          >
            <div
              className="icon"
              onClick={() => {
                navigator(item.link);
              }}
            >
              {item.svg}
            </div>
            <Link to={item.link}>{item.text}</Link>
          </div>
        );
      })}
    </div>
  );
};
