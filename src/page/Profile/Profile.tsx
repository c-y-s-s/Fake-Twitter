import React, { useEffect, useState } from "react";
import LeftSideBar from "../../components/LeftSideBar/LeftSideBar";
import RightSideBar from "../../components/RightSideBar/RightSideBar";
import * as Styles from "./styles";
import UserProfile from "./components/UserProfile";
import UserEditDataModal from "./components/UserEditDataModal";
import firebase from "../../utils/firebase";
import "firebase/compat/auth";
import "firebase/compat/firestore";

const Profile = () => {
  const [tabListSwitch, setTabListSwitch] = useState("Tweets");
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const tabListData = [
    { text: "Tweets", active: tabListSwitch === "Tweets" ? true : false },
    { text: "Likes", active: tabListSwitch === "Likes" ? true : false },
  ];

  const user: any = firebase?.auth()?.currentUser || {};

  const body: HTMLBodyElement | null = document.querySelector("body");

  useEffect(() => {
    if (body && isOpenModal) {
      body.style.overflow = "hidden";
    } else if (body && !isOpenModal) {
      body.style.overflow = "auto";
    }
  }, [body, isOpenModal]);

  console.log("user?.photoURL", user?.photoURL);
  return (
    <Styles.Profile>
      <LeftSideBar name={"Profile"} />
      <div className="profile-content">
        <div className="font-bold title-name">Leo</div>
        <div className="post-number">2 Tweets</div>
        <div>
          <div className="user-background-img"></div>
          <div className="user-photo-data-edit">
            <img className="picture" src={user?.photoURL} alt="" />
            <div
              className="edit-profile font-bold"
              onClick={() => {
                setIsOpenModal(true);
              }}
            >
              Edit profile
            </div>
          </div>
          <div className="data-container">
            <div className="center-name font-bold">{user?.displayName}</div>
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
      {isOpenModal && <UserEditDataModal setIsOpenModal={setIsOpenModal} />}

      <RightSideBar />
    </Styles.Profile>
  );
};

export default Profile;
