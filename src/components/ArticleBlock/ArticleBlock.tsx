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

interface ArticleBlockProps {
  useBlocks: string;
  setArticlesTotalNumber?: React.Dispatch<React.SetStateAction<string>>;
}
interface articleDataProps {
  id: string;
  transferBy?: string[];
  likeBy?: string[];
  imageUrl?: string;
  text: string;
  author: {
    email: string;
    photoURL: string;
    uid: string;
    userName: string;
    membershipNumber: string;
  };
  createAt: {
    seconds: number;
    nanoseconds: number;
  };
}

const ArticleBlock: FC<ArticleBlockProps> = ({
  useBlocks,
  setArticlesTotalNumber,
}) => {
  const tabListSwitch = useSelector(
    (state: RootState) => state.controllerSliceReducer.proFileTabSwitch
  );

  const userData = useSelector(
    (state: RootState) => state.userSliceReducer.userData
  );

  const [sortIdOtherUserData, setSortIdOtherUserData] = useState<any[]>([]);
  const [articleData, setArticleData] = useState<articleDataProps[]>([]);
  const [dataPageNumber, setDataPageNumber] = useState<number>(4);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [currentUserName, setCurrentUserName] = useState<any>({});
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

  useEffect(() => {
    const resultData = articleData.map((item: articleDataProps) => {
      if (item?.author?.email === currentUserName?.mail) {
        return {
          ...item,
          resultName: currentUserName.name,
        };
      }
    });
    setSortIdOtherUserData(resultData.slice(0, dataPageNumber));
  }, [
    dataPageNumber,
    articleData,
    currentUserName?.mail,
    currentUserName.name,
  ]);

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
        res.docs.map((item) => {
          setCurrentUserName({
            mail: item?.data().mail,
            name: item?.data().name,
          });
        });
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
          console.log("a");
          query = firebase
            ?.firestore()
            ?.collection("posts_article")
            ?.where("author.uid", "==", firebase?.auth()?.currentUser?.uid);
        } else {
          console.log("b");
          query = firebase
            ?.firestore()
            ?.collection("posts_article")
            ?.where(
              "likeBy",
              "array-contains",
              firebase?.auth()?.currentUser?.uid
            );
        }
        query?.onSnapshot((docSnapshot: any) => {
          const data = docSnapshot?.docs?.map((doc: any) => {
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
        {sortIdOtherUserData?.map((item) => {
          let isItemLikeL: boolean | undefined;
          if (uid) {
            isItemLikeL = item?.likeBy?.includes(uid);
          }

          // 計算發布時間距離現在時間多久
          let resultTime: string = "";
          let resultSecond: number =
            (new Date().getTime() - item?.createdAt?.seconds * 1000) / 1000;

          if (resultSecond < 60) {
            resultTime = resultSecond.toFixed(0) + "秒前發佈";
          } else if (resultSecond / 60 < 60) {
            resultTime = (resultSecond / 60).toFixed(0) + "分鐘前發佈";
          } else if (resultSecond / 60 > 60 && resultSecond / 60 < 1800) {
            resultTime = (resultSecond / 60 / 60).toFixed(0) + "小時前發佈";
          } else if (resultSecond / 60 > 1800) {
            resultTime = resultSecond / 60 / 24 + "小時前發佈";
          }

          return (
            item?.id && (
              <div className="other-user-content" key={item?.id}>
                <GlobalClientImg
                  src={userData.photoURL}
                  alt=""
                  className="client-data-img"
                  Location={"otherUser"}
                />
                <div className="other-data-container">
                  <div className="other-user-block">
                    <div className="other-user-name">{item?.resultName}</div>
                    <div className="other-user-account">
                      @{item?.author?.membershipNumber}
                    </div>
                    ·<div className="other-user-date">{resultTime}</div>
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
                        isItemLikeL ? "active" : ""
                      }`}
                      onClick={() => {
                        UseToggleLike(item?.id);
                      }}
                    >
                      {isItemLikeL ? <LikeActive /> : <Like />}
                      {item?.likeBy?.length ? item.likeBy?.length : 0}
                    </div>
                  </div>
                </div>
              </div>
            )
          );
        })}
      </InfiniteScroll>
    </Styles.OtherUser>
  );
};

export default ArticleBlock;
