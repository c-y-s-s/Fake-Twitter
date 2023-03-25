import * as Styles from "./styles";
import Search from "../../components/RightSideBar/Search";
import LeftSideBar from "../../components/LeftSideBar/LeftSideBar";
import RightSideBar from "../../components/RightSideBar/RightSideBar";
import Chatroom from "../../components/Chatroom/Chatroom";

const Explore = () => {
  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <LeftSideBar name={"Explore"} />
      <Styles.Explore>
        <Search />
        <div className="explore-list">
          <h3>你的流行趨勢</h3>
          <div className="explore-item">
            <div>全球流行趨勢</div>
            <div className="font-bold">12346789</div>
            <div>51.9萬推文</div>
          </div>
          <div className="explore-item">
            <div>全球流行趨勢</div>
            <div className="font-bold">12346789</div>
            <div>51.9萬推文</div>
          </div>
          <div className="explore-item">
            <div>全球流行趨勢</div>
            <div className="font-bold">12346789</div>
            <div>51.9萬推文</div>
          </div>
          <div className="explore-item">
            <div>全球流行趨勢</div>
            <div className="font-bold">12346789</div>
            <div>51.9萬推文</div>
          </div>
        </div>
      </Styles.Explore>
      <RightSideBar />
      <div className="home-chart-room">
        <Chatroom />
      </div>
    </div>
  );
};

export default Explore;
