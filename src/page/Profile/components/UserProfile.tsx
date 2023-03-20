import { ReactComponent as Message } from "../../../img/otherUser/message.svg";
import { ReactComponent as Transfer } from "../../../img/otherUser/transfer.svg";
import { ReactComponent as View } from "../../../img/otherUser/view.svg";
import { ReactComponent as Like } from "../../../img/otherUser/like.svg";
import { ReactComponent as LikeActive } from "../../../img/otherUser/likeActive.svg";
import { useSelector, useDispatch } from "react-redux";
import * as Styles from "../styles";
import { RootState } from "../../../reducers";
import { FC, useEffect, useState } from "react";
import { AddOtherUserDataLike } from "../../../reducers/otherUserData";
import { GlobalClientImg } from "../../../styles/GlobalStyle";
import InfiniteScroll from "react-infinite-scroll-component";
import ReactLoading from "react-loading";
import firebase from "../../../utils/firebase";
import "firebase/compat/auth";
import "firebase/compat/firestore";
interface otherUserDataProps {
  id: string;
  userName: string;
  userSerialNumber: string;
  postingTime: string;
  text: string;
  image?: string;
  message: number;
  transfer: number;
  view: number;
  like: { number: number; userClick: boolean };
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

interface UserProfileProps {
  tabListSwitch: string;
}

const UserProfile: FC<UserProfileProps> = ({ tabListSwitch }) => {
  const dispatch = useDispatch();
  const otherUserData = useSelector(
    (state: RootState) => state.otherUserDataSliceReducer.otherUserData
  );
  const [sortIdOtherUserData, setSortIdOtherUserData] = useState<any[]>([]);
  const [articleData, setArticleData] = useState<articleDataProps[]>([]);
  const [dataPageNumber, setDataPageNumber] = useState<number>(4);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [isTransfer, setIsTransfer] = useState<boolean>(false);
  const [isLike, setIsLike] = useState<boolean>(false);
  const uid = firebase?.auth()?.currentUser?.uid;

  const fetchMoreData = () => {
    // mock APi call
    if (sortIdOtherUserData.length < articleData.length) {
      setTimeout(() => {
        setDataPageNumber(dataPageNumber + 2);
      }, 1500);
    } else {
      setHasMore(false);
    }
  };

  useEffect(() => {
    setSortIdOtherUserData(
      articleData?.slice(0, dataPageNumber)
      // .sort((a: otherUserDataProps, b: otherUserDataProps) => {
      //   return Number(b.id) - Number(a.id);
      // })
    );
  }, [articleData, dataPageNumber]);

  // 拿 database data
  useEffect(() => {
    let query: any;
    if (tabListSwitch === "Tweets") {
      query = firebase
        .firestore()
        .collection("posts_article")
        .where("author.uid", "==", firebase?.auth()?.currentUser?.uid);
    } else {
      query = firebase
        .firestore()
        .collection("posts_article")
        .where("likeBy", "array-contains", firebase?.auth()?.currentUser?.uid);
    }
    query.get().then((docSnapshot: any) => {
      const data = docSnapshot?.docs?.map((doc: any) => {
        const id = doc?.id;
        return { id, ...doc?.data() };
      });

      setArticleData(data as []);
    });
  }, [tabListSwitch]);

  function toggleCollected(articleId: string): void {
    const uid = firebase.auth().currentUser?.uid;

    firebase
      .firestore()
      .collection("posts_article")
      .doc(articleId)
      .get()
      .then((collectionSnapshot) => {
        if (collectionSnapshot?.data()?.transferBy?.includes(uid)) {
          firebase
            .firestore()
            .collection("posts_article")
            .doc(articleId)
            .update({
              // 避免舊職被蓋掉,使用 fieldvalue.arrayRemove
              transferBy: firebase.firestore.FieldValue.arrayRemove(uid),
            })
            .then(() => {
              setIsTransfer(false);
            });
        } else {
          firebase
            .firestore()
            .collection("posts_article")
            .doc(articleId)
            .update({
              // 避免舊職被蓋掉,使用 fieldvalue.arrayUnion
              transferBy: firebase.firestore.FieldValue.arrayUnion(uid),
            })
            .then(() => {
              setIsTransfer(true);
            });
        }
      });
  }

  function toggleLike(articleId: string): void {
    const uid = firebase.auth().currentUser?.uid;

    firebase
      .firestore()
      .collection("posts_article")
      .doc(articleId)
      .get()
      .then((collectionSnapshot) => {
        if (collectionSnapshot?.data()?.likeBy?.includes(uid)) {
          firebase
            .firestore()
            .collection("posts_article")
            .doc(articleId)
            .update({
              // 避免舊職被蓋掉,使用 fieldvalue.arrayRemove
              likeBy: firebase.firestore.FieldValue.arrayRemove(uid),
            })
            .then(() => {
              setIsLike(false);
            });
        } else {
          firebase
            .firestore()
            .collection("posts_article")
            .doc(articleId)
            .update({
              // 避免舊職被蓋掉,使用 fieldvalue.arrayUnion
              likeBy: firebase.firestore.FieldValue.arrayUnion(uid),
            })
            .then(() => {
              setIsLike(true);
            });
        }
      });
  }

  return (
    <Styles.UserProfile>
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
            isItemLikeL = item.likeBy?.includes(uid);
          }
          return (
            <div className="other-user-content" key={item.id}>
              <GlobalClientImg
                src="https://picsum.photos/50/50?grayscale"
                alt=""
                className="client-data-img"
                Location={"otherUser"}
              />
              <div className="other-data-container">
                <div className="other-user-block">
                  <div className="other-user-name">
                    {item?.author?.userName}
                  </div>
                  <div className="other-user-account">
                    .@{item?.author?.membershipNumber}
                  </div>
                  ·<div className="other-user-date">31m</div>
                </div>

                <div className="other-user-text">{item.text}</div>
                {item.imageUrl ? (
                  <div className="other-user-image">
                    <img src={item.imageUrl} alt=""></img>
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
                      toggleCollected(item.id);
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
                      toggleLike(item.id);
                    }}
                  >
                    {isItemLikeL ? <LikeActive /> : <Like />}
                    {item?.likeBy?.length ? item.likeBy?.length : 0}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </InfiniteScroll>
    </Styles.UserProfile>
  );
};

export default UserProfile;
