import LeftSideBar from "../../components/LeftSideBar/LeftSideBar";
import * as Styles from "./styles";
import userImg from "../../img/userImg.jpg";

import RightSideBar from "../../components/RightSideBar/RightSideBar";
import { RootState } from "../../reducers";
import {
  rightSideBarSearchExpandToggle,
  setLoginModalOpen,
  setRegisterModalOpen,
  tabListToggle,
} from "../../reducers/controller";
import { useSelector, useDispatch } from "react-redux";
import { FC, useEffect, useState } from "react";

import UserPublished from "../../components/UserPublished/UserPublished";
import UserPublishedModal from "../../components/UserPublishedModal/UserPublishedModal";
import { useNavigate } from "react-router-dom";
import SignInModal from "../../components/SignInModal/SignInModal";
import RegisterModal from "../../components/RegisterModal/RegisterModal";
import firebase from "../../utils/firebase";
import "firebase/compat/storage";
import Explore from "../Explore/Explore";
import ArticleBlock from "../../components/ArticleBlock/ArticleBlock";

interface HomeProps {
  name: string;
}
const Home: FC<HomeProps> = ({ name }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const loginModalOpen = useSelector(
    (state: RootState) => state.controllerSliceReducer.loginModalOpen
  );
  const registerModalOpen = useSelector(
    (state: RootState) => state.controllerSliceReducer.registerModalOpen
  );
  const tabList = useSelector(
    (state: RootState) => state.controllerSliceReducer.tabList
  );

  const userLogin = useSelector(
    (state: RootState) => state.controllerSliceReducer.userLogin
  );
  const otherUserData = useSelector(
    (state: RootState) => state.otherUserDataSliceReducer.otherUserData
  );
  const [inputValue, setInputValue] = useState<string>("");
  const [imgFile, setImgFile] = useState<any>(null);

  let articleId = Number(otherUserData[otherUserData.length - 1].id);
  const tabListData = [
    {
      text: "For You",
      active: tabList === "For You" ? true : false,
    },
    {
      text: "Following",
      active: tabList === "Following" ? true : false,
    },
  ];

  // 送發表文章的物件 , 因發文功能有兩個部分,所以邏輯寫在這層
  // 之後可以考慮寫到 reducer 裡面
  const handleTweet = () => {
    //! 先存圖片 取到圖片網址後 , 資料整包寫進 database
    // 取道寫入資料庫所需物件
    const documentRef = firebase
      ?.firestore()
      ?.collection("posts_article")
      ?.doc();
    const usersDocumentRef = firebase?.firestore()?.collection("users");

    let userData: firebase.firestore.DocumentData[] = [];
    usersDocumentRef
      .where("mail", "==", firebase?.auth()?.currentUser?.email)
      .get()
      .then((collectionSnapshot) => {
        userData = collectionSnapshot.docs.map((userItem) => {
          return userItem?.data();
        });
      });

    // storage 物件
    // 傳入資料夾名稱,檔名
    const fireRef = firebase?.storage()?.ref("posts-image/" + documentRef.id);
    // 上傳
    const metadata = {
      contentType: imgFile?.type,
    };

    fireRef.put(imgFile, metadata).then(() => {
      fireRef.getDownloadURL().then((imageUrl) => {
        //使用物件方法 set 寫進 firestore dataBase
        documentRef
          .set({
            imageUrl: imgFile ? imageUrl : "",
            text: inputValue,
            createdAt: firebase?.firestore?.Timestamp?.now(),
            author: {
              userName:
                firebase?.auth()?.currentUser?.displayName || userData[0].name,
              photoURL: firebase?.auth()?.currentUser?.photoURL || "",
              uid: firebase?.auth()?.currentUser?.uid || "",
              email: firebase?.auth()?.currentUser?.email || "",
              membershipNumber: userData[0].membershipNumber,
            },
          })
          .then(() => {
            setInputValue("");
            setImgFile("");
          });
      });
    });
  };

  // search list 透過 className 判斷要不要關閉視窗
  // 篩選出點到不關閉的 className 去做判斷
  const globalClassNameDetection = (
    e: React.MouseEvent<HTMLDivElement>
  ): void => {
    const target = e.target as Element;

    if (
      target.className !== "search-list" &&
      target.className !== "search-list-text" &&
      target.className !== "search-icon" &&
      target.className !== "search" &&
      target.className !== "search-input" &&
      target.className !== "search-result-email" &&
      target.className !== "search-result-name font-bold" &&
      target.className !== "search-result-follower" &&
      target.className !== "search-result-list-item" &&
      target.className !== "search-result-img" &&
      target.className !== "search-result-container" &&
      target.className !== "search-result-follower" &&
      target.nodeName !== "svg"
    ) {
      dispatch(rightSideBarSearchExpandToggle(false));
    }
  };

  const body: HTMLBodyElement | null = document.querySelector("body");

  const handleOpenModal = (type: string) => {
    if (type === "login" && body) {
      body.style.overflow = "hidden";
      dispatch(setLoginModalOpen(true));
      dispatch(setRegisterModalOpen(false));
    } else if (type === "register") {
      dispatch(setLoginModalOpen(false));
      dispatch(setRegisterModalOpen(true));
    }
  };

  return (
    <Styles.Home
      onClick={globalClassNameDetection}
      loginModalOpen={loginModalOpen}
      registerModalOpen={registerModalOpen}
    >
      <LeftSideBar name={name} />

      {userLogin ? (
        <>
          <div className="home-content">
            <div className="home-content-top">
              <div className="link-title">Home</div>
              <div className="tab-list">
                {tabListData.map((item, index) => {
                  return (
                    <div
                      className="tab-list-item"
                      onClick={() => {
                        dispatch(tabListToggle(item.text));
                      }}
                      key={index}
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

            <div className="client-textarea-container">
              <UserPublished
                userImg={userImg}
                setInputValue={setInputValue}
                inputValue={inputValue}
                handleTweet={handleTweet}
                setImgFile={setImgFile}
                imgFile={imgFile}
              />

              <ArticleBlock useBlocks="home" />
            </div>
          </div>
          <RightSideBar />
          <UserPublishedModal
            userImg={userImg}
            setInputValue={setInputValue}
            inputValue={inputValue}
            handleTweet={handleTweet}
          />
        </>
      ) : (
        <>
          <div className="home-content">
            <Explore />
          </div>
          <RightSideBar />
        </>
      )}

      {userLogin === null && (
        <div className="login-prompt">
          <div className="login-prompt-text">
            <div className="big-text font-bold">別錯過正在發生的新鮮事</div>
            <div>Twitter 使用者總是搶先掌握新知。</div>
          </div>
          <div className="login-prompt-button">
            <div
              className="login font-bold"
              onClick={() => {
                handleOpenModal("login");
              }}
            >
              登入
            </div>
            <div
              className="register font-bold"
              onClick={() => {
                handleOpenModal("register");
              }}
            >
              註冊
            </div>
          </div>
        </div>
      )}

      {loginModalOpen && <SignInModal />}
      {registerModalOpen && <RegisterModal />}
    </Styles.Home>
  );
};

export default Home;
