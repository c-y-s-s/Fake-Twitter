import React, { useEffect, useState } from "react";
import * as Styles from "./styles";
import { ReactComponent as Search } from "../../img/search.svg";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../reducers";
import { rightSideBarSearchExpandToggle } from "../../reducers/controller";
import { useGetSearchDataQuery } from "../../api/searchApi";

interface SearchItem {
  id: number;
  name: string;
  username: string;
  email: string;
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: {
      lat: string;
      lng: string;
    };
  };
  phone: string;
  website: string;
  company: {
    name: string;
    catchPhrase: string;
    bs: string;
  };
}

const RightSideBar: React.FC = () => {
  const dispatch = useDispatch();

  const { data } = useGetSearchDataQuery();

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

  let [searchDataResult, setSearchDataResult] = useState<
    SearchItem[] | undefined
  >([]);
  const rightSideBarSearchExpand = useSelector(
    (state: RootState) => state.controllerSliceReducer.rightSideBarSearchExpand
  );

  const [searchValue, setSearchValue] = useState<string>("");

  let searchListJSX = (): any => {
    switch (searchValue.length > 0) {
      case false:
        return (
          <div className="search-list-text">
            Try searching for people, topics, or keywords
          </div>
        );
      case true:
        return (
          <div className="search-list-text">
            {searchDataResult?.map((item) => {
              return <div key={item.id}>{item.username}</div>;
            })}
          </div>
        );
      default:
        break;
    }
  };

  const handleSearchValue = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setSearchValue(e.target.value);
  };

  const searchDataComparison = (): void => {
    let searchResult;
    if (searchValue?.length > 0) {
      searchResult = data?.filter((item) => {
        return item?.username?.includes(searchValue);
      });
      setSearchDataResult(searchResult);
    }
  };

  useEffect(() => {
    searchDataComparison();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, searchValue]);

  return (
    <Styles.RightSideBar className="search-container">
      <form className="search">
        <div className="search-icon">
          <Search />
        </div>
        <input
          type="text"
          placeholder="Search Twitter"
          onFocus={() => {
            dispatch(rightSideBarSearchExpandToggle(true));
          }}
          onChange={handleSearchValue}
          className="search-input"
        />

        {rightSideBarSearchExpand && (
          <div className="search-list">{searchListJSX()}</div>
        )}
      </form>

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
    </Styles.RightSideBar>
  );
};

export default RightSideBar;
