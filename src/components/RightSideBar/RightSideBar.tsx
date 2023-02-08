import React from "react";
import * as Styles from "./styles";
import { ReactComponent as Search } from "../../img/search.svg";
const RightSideBar = () => {
  const tendingData = [
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
    <Styles.RightSideBar>
      <form className="search">
        <div className="search-icon">
          <Search />
        </div>
        <input type="text" placeholder="Search Twitter" />
      </form>

      <div className="trends-container">
        <div className="trends">
          Trends for you
          {tendingData.map((item, index) => {
            return (
              <div className="trends-item" key={index}>
                <div className="trends-item-name">News.Tending</div>
                <div className="trends-item-tag">{item.name}</div>
                <div className="trends-item-tweets-amount">
                  {item.tweetsAmount} Tweets
                </div>
              </div>
            );
          })}
          <div className="show-more">Show more</div>
        </div>
        <div>
          <br />
          <br />
          <br />
          Terms of Service Privacy Policy Cookie Policy
          <br />
          Accessibility Ads info
          <br />
          More © 2023 Twitter, Inc.
        </div>
      </div>
    </Styles.RightSideBar>
  );
};

export default RightSideBar;
