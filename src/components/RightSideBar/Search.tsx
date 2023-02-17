import React, { useEffect, useState } from "react";
import { ReactComponent as SearchSVG } from "../../img/search.svg";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../reducers";
import { rightSideBarSearchExpandToggle } from "../../reducers/controller";
import { useGetSearchDataQuery } from "../../api/searchApi";
import { Link } from "react-router-dom";
import { GlobalClientImg } from "../../styles/GlobalStyle";
import { SearchItem } from "../../types/search";

const Search = () => {
  const dispatch = useDispatch();

  const { data } = useGetSearchDataQuery();
  const [searchValue, setSearchValue] = useState<string>("");
  const rightSideBarSearchExpand = useSelector(
    (state: RootState) => state.controllerSliceReducer.rightSideBarSearchExpand
  );

  let [searchDataResult, setSearchDataResult] = useState<SearchItem[]>([]);

  let searchListJSX = (): JSX.Element => {
    switch (searchValue.length > 0) {
      case false:
        return (
          <div className="search-result-container">
            <div className="search-result-empty">
              Try searching for people, topics, or keywords
            </div>
          </div>
        );
      // search input 輸入文字顯示搜尋結果
      case true:
        return (
          <div className="search-result-container">
            {searchDataResult?.length > 0 ? (
              searchDataResult?.map((item) => {
                return (
                  <Link
                    to={`user/${item.id}`}
                    key={item.id}
                    className="search-result-list-item"
                  >
                    <GlobalClientImg
                      src="https://picsum.photos/56/56?grayscale"
                      alt=""
                      Location="rightSideBar"
                    />
                    <div className="search-result-content">
                      <div className="search-result-name font-bold">
                        {item.name}
                      </div>
                      <div className="search-result-email">
                        @{item.username}
                      </div>
                      <div className="search-result-follower">用戶動態文字</div>
                    </div>
                  </Link>
                );
              })
            ) : (
              <div className="search-list-empty">
                <>
                  <div> Search for "{searchValue}"</div>
                  <div>Go to @{searchValue}</div>
                </>
              </div>
            )}
          </div>
        );
      default:
        return <></>;
    }
  };

  const handleSearchValue = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setSearchValue(e.target.value);
  };

  // 搜尋邏輯
  const searchDataComparison = (): void => {
    let searchResult;
    if (searchValue?.length > 0) {
      searchResult = data?.filter((item) => {
        return item?.username?.includes(searchValue);
      });
      if (searchResult) setSearchDataResult(searchResult);
    }
  };

  useEffect(() => {
    searchDataComparison();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, searchValue]);

  return (
    <form className="search">
      <div className="search-icon">
        <SearchSVG />
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
  );
};

export default Search;
