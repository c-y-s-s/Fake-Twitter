import * as Styles from "./styles";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import { ReactComponent as Message } from "../../img/otherUser/message.svg";
import { ReactComponent as Transfer } from "../../img/otherUser/transfer.svg";
import { ReactComponent as View } from "../../img/otherUser/view.svg";
import { ReactComponent as Like } from "../../img/otherUser/like.svg";
import { ReactComponent as LikeActive } from "../../img/otherUser/likeActive.svg";
import { FC, useEffect, useState } from "react";
import { GlobalClientImg } from "../../styles/GlobalStyle";
import InfiniteScroll from "react-infinite-scroll-component";
import ReactLoading from "react-loading";
import firebase from "../../utils/firebase";
import UseToggleCollected from "../../hook/UseToggleCollected";
import UseToggleLike from "../../hook/UseToggleLike";
import { useSelector } from "react-redux";
import { RootState } from "../../reducers";
import { DocumentData } from "firebase/firestore";
import {
  ArticleBlockProps,
  ResultData,
  ArticleData,
  SortIdOtherUserDataProps,
} from "./types";

const ArticleBlock: FC<ArticleBlockProps> = ({
  useBlocks,
  setArticlesTotalNumber,
}) => {
  const tabListSwitch = useSelector(
    (state: RootState) => state.controllerSliceReducer.proFileTabSwitch
  );

  const [sortIdOtherUserData, setSortIdOtherUserData] = useState<
    SortIdOtherUserDataProps[]
  >([]);
  const [articleData, setArticleData] = useState<ArticleData[]>([]);
  const [dataPageNumber, setDataPageNumber] = useState<number>(3);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [currentUserName, setCurrentUserName] = useState<ResultData[]>([]);
  const uid = firebase?.auth()?.currentUser?.uid;

  const fetchMoreData = () => {
    if (sortIdOtherUserData.length < articleData.length) {
      setTimeout(() => {
        setDataPageNumber(dataPageNumber + 2);
      }, 1000);
    } else {
      setHasMore(false);
    }
  };

  const getCreatedTime = (createdSecond: number): string => {
    // 計算發布時間距離現在時間多久
    let resultTime: string = "";
    // 現在時間距離發布時間過去幾秒
    let resultSecond: number =
      (new Date().getTime() - createdSecond * 1000) / 1000;

    if (resultSecond < 60) {
      resultTime = resultSecond.toFixed(0) + "秒前發佈";
    } else if (resultSecond / 60 < 60) {
      resultTime = (resultSecond / 60).toFixed(0) + "分鐘前發佈";
    } else if (resultSecond / 60 > 60 && resultSecond < 86400) {
      resultTime = (resultSecond / 60 / 60).toFixed(0) + "小時前發佈";
    } else if (resultSecond > 86400) {
      resultTime = (resultSecond / 86400).toFixed(0) + "天前發佈";
    }
    return resultTime;
  };

  useEffect(() => {
    const resultData = articleData.map(
      (item: ArticleData): SortIdOtherUserDataProps => {
        // 透過文章 email 去取到更改過後的名字

        const currentUserNameResult = currentUserName?.map(
          (userItem: ResultData | undefined) => {
            if (userItem?.mail === item?.author?.email) {
              return userItem;
            }
          }
        );

        return {
          ...item,
          resultData: currentUserNameResult,
        };
      }
    );

    setSortIdOtherUserData(resultData.slice(0, dataPageNumber));
  }, [dataPageNumber, articleData, currentUserName]);

  // 拿 database data
  // 判斷哪邊使用到這個元件去各別拿取要的資料
  useEffect(() => {
    if (firebase?.auth()?.currentUser?.uid === null) return;

    // userData
    firebase
      .firestore()
      .collection("users")
      .get()
      .then((res) => {
        const userData = res.docs.map((item) => {
          return {
            mail: item?.data().mail,
            name: item?.data().name,
            photoURL: item?.data().photoURL,
          };
        });

        setCurrentUserName(userData);
      });

    switch (useBlocks) {
      case "home":
        firebase
          .firestore()
          .collection("posts_article")
          .orderBy("createdAt", "desc")
          .onSnapshot((docSnapshot) => {
            const data = docSnapshot?.docs?.map((doc) => {
              const id = doc?.id;
              return { id, ...doc?.data() };
            });

            setArticleData(data as []);
          });
        break;
      case "profile":
        let query: any;
        if (tabListSwitch === "Article") {
          query = firebase
            ?.firestore()
            ?.collection("posts_article")
            ?.where("author.uid", "==", firebase?.auth()?.currentUser?.uid);
        } else {
          query = firebase
            ?.firestore()
            ?.collection("posts_article")
            ?.where(
              "likeBy",
              "array-contains",
              firebase?.auth()?.currentUser?.uid
            );
        }
        query?.onSnapshot((docSnapshot: DocumentData) => {
          const data = docSnapshot?.docs?.map((doc: DocumentData) => {
            const id = doc?.id;
            return { id, ...doc?.data() };
          });

          if (setArticlesTotalNumber) setArticlesTotalNumber(data.length);
          setArticleData(data as []);
        });

        break;
      default:
        break;
    }
  }, [setArticlesTotalNumber, tabListSwitch, useBlocks]);

  useEffect(() => {
    if (sortIdOtherUserData.length) {
      setHasMore(true);
    } else {
      setHasMore(false);
    }
  }, [sortIdOtherUserData]);
  return (
    <Styles.OtherUser>
      <InfiniteScroll
        next={fetchMoreData}
        hasMore={hasMore}
        loader={
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              margin: "12px 0 0 0",
            }}
          >
            <ReactLoading
              type={"spokes"}
              color="#1d9bf0"
              width="25px"
              height="25px"
            />
          </div>
        }
        dataLength={sortIdOtherUserData.length}
        style={{ overflow: "hidden" }}
      >
        {sortIdOtherUserData ? (
          sortIdOtherUserData?.map((item: SortIdOtherUserDataProps) => {
            let isItemLike: boolean | undefined;
            if (uid) {
              isItemLike = item?.likeBy?.includes(uid);
            }

            const resultPhotoAndName = item?.resultData.filter(
              (resultItem: ResultData | undefined) => {
                if (resultItem?.mail === item?.author?.email) {
                  return item;
                }
              }
            );

            return (
              item?.id && (
                <div className="other-user-content" key={item?.id}>
                  <GlobalClientImg
                    src={
                      resultPhotoAndName[0]?.photoURL ||
                      "https://firebasestorage.googleapis.com/v0/b/leo-project-2feea.appspot.com/o/5wtqshRu_400x400.jpg?alt=media&token=585c49af-3ac3-48e1-ad25-c70570926760"
                    }
                    alt=""
                    className="client-data-img"
                    Location={"otherUser"}
                  />
                  <div className="other-data-container">
                    <div className="other-user-block">
                      <div className="other-user-name">
                        {resultPhotoAndName[0]?.name || item?.author?.userName}
                      </div>
                      <div className="other-user-account">
                        @{item?.author?.membershipNumber}
                      </div>
                      ·
                      <div className="other-user-date">
                        {getCreatedTime(item?.createdAt?.seconds)}
                      </div>
                    </div>
                    <div className="other-user-text">{item?.text}</div>
                    {item?.imageUrl ? (
                      <div className="other-user-image">
                        <img src={item?.imageUrl} alt=""></img>
                      </div>
                    ) : (
                      <></>
                    )}
                    <div className="other-user-icon">
                      <div className="other-user-icon-item">
                        <Message />
                        12
                      </div>
                      <div
                        className="other-user-icon-item transfer"
                        onClick={() => {
                          UseToggleCollected(item?.id);
                        }}
                      >
                        <Transfer />
                        {item?.transferBy?.length ? item.transferBy?.length : 0}
                      </div>
                      <div className="other-user-icon-item">
                        <View /> 12
                      </div>
                      <div
                        className={`other-user-icon-item like ${
                          isItemLike ? "active" : ""
                        }`}
                        onClick={() => {
                          UseToggleLike(item?.id);
                        }}
                      >
                        {isItemLike ? <LikeActive /> : <Like />}
                        {item?.likeBy?.length ? item.likeBy?.length : 0}
                      </div>
                    </div>
                  </div>
                </div>
              )
            );
          })
        ) : (
          <div>No Data</div>
        )}
      </InfiniteScroll>
    </Styles.OtherUser>
  );
};

export default ArticleBlock;
