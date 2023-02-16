import { ReactComponent as Message } from "../../../img/otherUser/message.svg";
import { ReactComponent as Transfer } from "../../../img/otherUser/transfer.svg";
import { ReactComponent as View } from "../../../img/otherUser/view.svg";
import { ReactComponent as Like } from "../../../img/otherUser/like.svg";
import { ReactComponent as LikeActive } from "../../../img/otherUser/likeActive.svg";
import { useSelector, useDispatch } from "react-redux";
import * as Styles from "../styles";
import { RootState } from "../../../reducers";
import { useEffect, useRef, useState } from "react";
import { AddOtherUserDataLike } from "../../../reducers/otherUserData";

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

const OtherUser = () => {
  const dispatch = useDispatch();
  const otherUserData = useSelector(
    (state: RootState) => state.otherUserDataSliceReducer.otherUserData
  );

  const [sortIdOtherUserData, setSortIdOtherUserData] = useState<
    otherUserDataProps[]
  >([]);

  useEffect(() => {
    setSortIdOtherUserData(
      otherUserData
        .slice()
        .sort((a: otherUserDataProps, b: otherUserDataProps) => {
          return Number(b.id) - Number(a.id);
        })
    );
  }, [otherUserData]);

  return (
    <Styles.OtherUser>
      {sortIdOtherUserData?.map((item) => {
        return (
          <div className="other-user-content" key={item.id}>
            <img
              src="https://picsum.photos/50/50?grayscale"
              alt=""
              className="client-data-img"
            />

            <div className="other-data-container">
              <div className="other-user-block">
                <div className="other-user-name">{item.userName}</div>
                <div className="other-user-account">
                  {item.userSerialNumber}
                </div>
                ·<div className="other-user-date">31m</div>
              </div>

              <div className="other-user-text">{item.text}</div>
              <div className="other-user-image">
                <img
                  src={`https://picsum.photos/500/370/?blur=${item.id}`}
                  alt=""
                ></img>
              </div>
              <div className="other-user-icon">
                <div className="other-user-icon-item">
                  <Message />
                  {item.message}
                </div>
                <div className="other-user-icon-item transfer">
                  <Transfer /> {item.transfer}
                </div>
                <div className="other-user-icon-item">
                  <View />
                  {item.view}
                </div>
                <div
                  className={`other-user-icon-item like ${
                    item.like.userClick ? "active" : ""
                  }`}
                  onClick={() => {
                    dispatch(AddOtherUserDataLike(item.id));
                  }}
                >
                  {item.like.userClick ? <LikeActive /> : <Like />}
                  {item.like.number}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </Styles.OtherUser>
  );
};

export default OtherUser;
