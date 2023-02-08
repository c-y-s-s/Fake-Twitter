import LeftSideBar from "../../components/LeftSideBar/LeftSideBar";
import * as Styles from "./styles";

import { ReactComponent as AddEmoji } from "../../img/home/addEmoji.svg";
import { ReactComponent as AddGif } from "../../img/home/addGif.svg";
import { ReactComponent as AddLocation } from "../../img/home/addLocation.svg";
import { ReactComponent as AddMedia } from "../../img/home/addMedia.svg";
import { ReactComponent as AddPoll } from "../../img/home/addPoll.svg";
import { ReactComponent as AddSchedule } from "../../img/home/addSchedule.svg";
import userImg from "../../img/userImg.jpg";
import OtherUser from "./components/OtherUser";
import RightSideBar from "../../components/RightSideBar/RightSideBar";
import { RootState } from "../../reducers";
import { tabListToggle } from "../../reducers/controller";
import { useSelector, useDispatch } from "react-redux";

interface HomeProps {
  name: string;
}
const Home = ({ name }: HomeProps) => {
  const dispatch = useDispatch();
  const tabList = useSelector(
    (state: RootState) => state.controllerSliceReducer.tabList
  );

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
  return (
    <Styles.Home>
      <LeftSideBar name={name} />
      <div className="home-content">
        <div className="home-content-top">
          <div className="link-title">Home</div>
          <div className="tab-list">
            {tabListData.map((item) => {
              return (
                <div
                  className="tab-list-item"
                  onClick={() => {
                    dispatch(tabListToggle(item.text));
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

        <div className="client-textarea-container">
          <div className="client-content-block">
            <div className="client-textarea-block">
              <img className="client-data-img" src={userImg} alt="user" />
              <div className="textarea">
                <textarea placeholder="What's happening?" />
              </div>
            </div>
            <div className="client-textarea-bottom">
              <div className="client-textarea-icon">
                <div className="icon-item">
                  <AddMedia />
                </div>

                <div className="icon-item">
                  <AddGif />
                </div>
                <div className="icon-item">
                  <AddPoll />
                </div>
                <div className="icon-item">
                  <AddEmoji />
                </div>

                <div className="icon-item">
                  <AddSchedule />
                </div>
                <div className="icon-item">
                  <AddLocation />
                </div>
              </div>
              <div className="client-textarea-tweet">Tweet</div>
            </div>
          </div>
          <OtherUser />
          <OtherUser />
          <OtherUser />
          <OtherUser />
          <OtherUser />
        </div>
      </div>
      <RightSideBar />
    </Styles.Home>
  );
};

export default Home;
