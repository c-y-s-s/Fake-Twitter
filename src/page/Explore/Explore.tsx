import * as Styles from "./styles";
import Search from "../../components/RightSideBar/Search";
const Explore = () => {
  return (
    <Styles.Explore>
      <Search />
      <div>
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
  );
};

export default Explore;
