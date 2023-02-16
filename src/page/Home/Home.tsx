import LeftSideBar from "../../components/LeftSideBar/LeftSideBar";
import * as Styles from "./styles";
import userImg from "../../img/userImg.jpg";
import OtherUser from "./components/OtherUser";
import RightSideBar from "../../components/RightSideBar/RightSideBar";
import { RootState } from "../../reducers";
import {
  rightSideBarSearchExpandToggle,
  tabListToggle,
} from "../../reducers/controller";
import { useSelector, useDispatch } from "react-redux";
import { FC, useState } from "react";
import { addArticle } from "../../reducers/otherUserData";
import UserPublished from "../../components/UserPublished/UserPublished";
import UserPublishedModal from "../../components/UserPublishedModal/UserPublishedModal";

interface HomeProps {
  name: string;
}
const Home: FC<HomeProps> = ({ name }) => {
  const dispatch = useDispatch();
  const tabList = useSelector(
    (state: RootState) => state.controllerSliceReducer.tabList
  );

  const [inputValue, setInputValue] = useState<string>("");

  const otherUserData = useSelector(
    (state: RootState) => state.otherUserDataSliceReducer.otherUserData
  );

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

  const handleTweet = () => {
    dispatch(
      addArticle({
        id: (articleId += 1).toString(),
        userName: "user01",
        userSerialNumber: "@fcdc102d9f60407",
        postingTime: "31m",
        text: inputValue,
        message: 0,
        transfer: 0,
        view: 1,
        like: { number: 0, userClick: false },
      })
    );
    setInputValue("");
  };

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
      target.nodeName !== "svg"
    ) {
      dispatch(rightSideBarSearchExpandToggle(false));
    }
  };
  return (
    <Styles.Home onClick={globalClassNameDetection}>
      <LeftSideBar name={name} />
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
          />

          <OtherUser />
        </div>
      </div>

      <RightSideBar />
      <UserPublishedModal
        userImg={userImg}
        setInputValue={setInputValue}
        inputValue={inputValue}
        handleTweet={handleTweet}
      />
    </Styles.Home>
  );
};

export default Home;
