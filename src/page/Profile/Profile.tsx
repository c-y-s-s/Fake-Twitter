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
import UserPublishedModal from "../../components/UserPublishedModal/UserPublishedModal";

const Profile = () => {
  const dispatch = useDispatch();
  const tabListSwitch = useSelector(
    (state: RootState) => state.controllerSliceReducer.proFileTabSwitch
  );

  const userData = useSelector(
    (state: RootState) => state.userSliceReducer.userData
  );
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const [articlesTotalNumber, setArticlesTotalNumber] = useState<string>("0");
  const [userMembershipNumber, setUserMemberShipNumber] = useState("");
  const [userName, setUserName] = useState<string>("");
  const tabListData = [
    { text: "Article", active: tabListSwitch === "Article" ? true : false },
    { text: "Likes", active: tabListSwitch === "Likes" ? true : false },
  ];

  const user: any = firebase?.auth()?.currentUser || {};
  const accountCreatedData = user?.metadata?.creationTime.split(" ");

  const body: HTMLBodyElement | null = document.querySelector("body");
  useEffect(() => {
    if (body && isOpenModal) {
      body.style.overflow = "hidden";
    } else if (body && !isOpenModal) {
      body.style.overflow = "auto";
    }
  }, [body, isOpenModal]);

  useEffect(() => {
    firebase
      .firestore()
      .collection("users")
      .where("mail", "==", user?.email)
      .get()
      .then((collectionSnapshot) => {
        collectionSnapshot.docs.map((item) => {
          setUserMemberShipNumber(item.data().membershipNumber);
          setUserName(item.data().name);
        });
      });
  }, [user?.email]);

  return (
    <Styles.Profile>
      <LeftSideBar name={"Profile"} />
      <div className="profile-content">
        <div className="font-bold title-name">{userName}</div>
        <div className="post-number">{articlesTotalNumber} Article</div>
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
            <div className="center-name font-bold">{userName}</div>
            <div className="serial-number">@{userMembershipNumber}</div>
            <div className="register-date">
              Joined
              <span> {accountCreatedData[1]}</span>
              <span> {accountCreatedData[2]}</span>
              <span> {accountCreatedData[3]}</span>
            </div>
            <div className="fans-container">
              <span>0</span>Following <span>0</span>Followers
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
                    dispatch(setProFileTabSwitch(item.text));
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
        <ArticleBlock
          useBlocks={"profile"}
          setArticlesTotalNumber={setArticlesTotalNumber}
        />
      </div>
      {isOpenModal && <UserEditDataModal setIsOpenModal={setIsOpenModal} />}
      <UserPublishedModal />
      <RightSideBar />
    </Styles.Profile>
  );
};

export default Profile;
