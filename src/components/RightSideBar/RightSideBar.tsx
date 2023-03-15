import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../reducers";
import Search from "./Search";
import * as Styles from "./styles";

const RightSideBar: React.FC = () => {
  const userLogin = useSelector(
    (state: RootState) => state.controllerSliceReducer.userLogin
  );

  const tendingData = [
    {
      name: "$500 Binance",
      tweetsAmount: "172K",
    },
    {
      name: "Turkey",
      tweetsAmount: "172K",
    },
    {
      name: "Russian",
      tweetsAmount: "172K",
    },
    {
      name: "#Test",
      tweetsAmount: "172K",
    },
    {
      name: "#Test",
      tweetsAmount: "172K",
    },
    {
      name: "#Test",
      tweetsAmount: "172K",
    },
    {
      name: "#Test",
      tweetsAmount: "172K",
    },
    {
      name: "#Test",
      tweetsAmount: "172K",
    },
    {
      name: "#Test",
      tweetsAmount: "172K",
    },
    {
      name: "#Test",
      tweetsAmount: "172K",
    },
  ];

  return (
    <Styles.RightSideBar className="search-container">
      {userLogin ? (
        <>
          <Search />
          <div className="trends-container">
            <div className="trends ">
              <div className="font-bold trends-title"> Trends for you</div>
              {tendingData.map((item, index) => {
                return (
                  <div className="trends-item" key={index}>
                    <div className="trends-item-name">News.Tending</div>
                    <div className="trends-item-tag font-bold">{item.name}</div>
                    <div className="trends-item-tweets-amount">
                      {item.tweetsAmount} Tweets
                    </div>
                  </div>
                );
              })}
              <div className="show-more">Show more</div>
            </div>
            <div className="policy-text">
              Terms of Service Privacy Policy Cookie Policy
              <br />
              Accessibility Ads info
              <br />
              More © 2023 Twitter, Inc.
            </div>
          </div>
        </>
      ) : (
        <></>
      )}
    </Styles.RightSideBar>
  );
};

export default RightSideBar;
