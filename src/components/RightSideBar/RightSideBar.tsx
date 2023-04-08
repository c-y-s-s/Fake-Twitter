import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../reducers";
import {
  setLoginModalOpen,
  setRegisterModalOpen,
} from "../../reducers/controller";
import RegisterModal from "../RegisterModal/RegisterModal";
import Search from "./Search";
import * as Styles from "./styles";
import { collection, getDocs } from "firebase/firestore";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import firebase from "../../utils/firebase";

interface Tending {
  id: string;
  name: string;
  tweetsAmount: string;
}
const RightSideBar: React.FC = () => {
  const dispatch = useDispatch();
  const userLogin = useSelector(
    (state: RootState) => state.controllerSliceReducer.userLogin
  );
  const registerModalOpen = useSelector(
    (state: RootState) => state.controllerSliceReducer.registerModalOpen
  );
  const [tendingList, setTendIngList] = useState<Tending[]>([]);

  const tendingCollectionRef = collection(firebase?.firestore(), "tendingData");

  useEffect(() => {
    const getTendingData = async () => {
      try {
        const data = await getDocs(tendingCollectionRef);
        const filteredData = data.docs.map((doc) => {
          return {
            id: doc.id,
            ...doc.data(),
          } as Tending;
        });

        setTendIngList(filteredData);
      } catch (err) {
        console.log(err);
      }
    };

    getTendingData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <Styles.RightSideBar className="search-container">
      {userLogin ? (
        <>
          <Search />
          <div className="trends-container">
            <div className="trends ">
              <div className="font-bold trends-title"> Trends for you</div>
              {tendingList?.map((item: any, index: any) => {
                return (
                  <div className="trends-item" key={item.id}>
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
              More © 2023 leo, Inc.
            </div>
          </div>
        </>
      ) : (
        <div>
          <div className="no-login-style">
            <div className="title font-bold">你是新手嗎?</div>
            <p className="text">立即註冊，取得你個人專屬的時間軸!</p>
            <div
              className="add-account font-bold"
              onClick={() => {
                dispatch(setLoginModalOpen(false));
                dispatch(setRegisterModalOpen(true));
              }}
            >
              建立帳戶
            </div>
            <p className="text">
              如果註冊，即表示你同意服務條款和隱私政策，包括 Cookie 使用政策。
            </p>
          </div>
          {registerModalOpen && <RegisterModal />}
        </div>
      )}
    </Styles.RightSideBar>
  );
};

export default RightSideBar;
