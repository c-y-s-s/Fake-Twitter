import React, { useState } from "react";
import LeftSideBar from "../../components/LeftSideBar/LeftSideBar";
import RightSideBar from "../../components/RightSideBar/RightSideBar";
import * as Styles from "./styles";

import UserProfile from "./components/UserProfile";
const Profile = () => {
  const [tabListSwitch, setTabListSwitch] = useState("Tweets");

  const tabListData = [
    { text: "Tweets", active: tabListSwitch === "Tweets" ? true : false },
    { text: "Likes", active: tabListSwitch === "Likes" ? true : false },
  ];
  return (
    <Styles.Profile>
      <LeftSideBar name={"Profile"} />
      <div className="profile-content">
        <div className="font-bold title-name">Leo</div>
        <div className="post-number">2 Tweets</div>
        <div>
          <div className="user-background-img"></div>
          <div className="user-photo-data-edit">
            <img className="picture" src={"../../img/userImg.jpg"} alt="" />
            <div className="edit-profile font-bold">Edit profile</div>
          </div>
          <div className="data-container">
            <div className="center-name font-bold">leo</div>
            <div className="serial-number">@12345689</div>
            <div className="register-date">Joined February 2015</div>
            <div className="fans-container">
              <span>62</span>Following <span>3</span>Followers
            </div>
          </div>
        </div>
        <div>
          <div className="tab-list">
            {tabListData.map((item, index) => {
              return (
                <div
                  className="tab-list-item"
                  key={index}
                  onClick={() => {
                    tabListSwitch === "Tweets"
                      ? setTabListSwitch("Likes")
                      : setTabListSwitch("Tweets");
                  }}
                >
                  <div
                    className={`tab-list-item-text ${
                      item.active ? "font-bold active" : ""
                    }`}
                  >
                    {item.text}
                    <div
                      className={`line ${item.active ? "active" : ""}`}
                    ></div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <UserProfile tabListSwitch={tabListSwitch} />
      </div>

      <RightSideBar />
    </Styles.Profile>
  );
};

export default Profile;
