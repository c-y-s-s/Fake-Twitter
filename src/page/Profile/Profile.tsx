import React, { useEffect, useState } from "react";
import LeftSideBar from "../../components/LeftSideBar/LeftSideBar";
import RightSideBar from "../../components/RightSideBar/RightSideBar";
import * as Styles from "./styles";
import UserEditDataModal from "./components/UserEditDataModal";
import firebase from "../../utils/firebase";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import { setProFileTabSwitch } from "../../reducers/controller";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../reducers";
import ArticleBlock from "../../components/ArticleBlock/ArticleBlock";

const Profile = () => {
  const dispatch = useDispatch();
  const tabListSwitch = useSelector(
    (state: RootState) => state.controllerSliceReducer.proFileTabSwitch
  );

  const userData = useSelector(
    (state: RootState) => state.userSliceReducer.userData
  );
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const tabListData = [
    { text: "Article", active: tabListSwitch === "Article" ? true : false },
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

  return (
    <Styles.Profile>
      <LeftSideBar name={"Profile"} />
      <div className="profile-content">
        <div className="font-bold title-name">{userData?.displayName}</div>
        <div className="post-number">2 Article</div>
        <div>
          <div className="user-background-img"></div>
          <div className="user-photo-data-edit">
            <img className="picture" src={userData?.photoURL} alt="user" />
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
                    tabListSwitch === "Article"
                      ? dispatch(setProFileTabSwitch("Likes"))
                      : dispatch(setProFileTabSwitch("Article"));
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
        <ArticleBlock useBlocks={"profile"} />
      </div>
      {isOpenModal && <UserEditDataModal setIsOpenModal={setIsOpenModal} />}

      <RightSideBar />
    </Styles.Profile>
  );
};

export default Profile;
