import { ReactComponent as Message } from "../../../img/otherUser/message.svg";
import { ReactComponent as Transfer } from "../../../img/otherUser/transfer.svg";
import { ReactComponent as View } from "../../../img/otherUser/view.svg";
import { ReactComponent as Like } from "../../../img/otherUser/like.svg";
import { useSelector, useDispatch } from "react-redux";
import * as Styles from "../styles";
import { RootState } from "../../../reducers";
import { useEffect, useRef, useState } from "react";

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
  like: number;
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
          <>
            <div className="other-user-content">
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
                  <div className="other-user-icon-item">
                    <Transfer /> {item.transfer}
                  </div>
                  <div className="other-user-icon-item">
                    <View />
                    {item.view}
                  </div>
                  <div className="other-user-icon-item">
                    <Like />
                    {item.like}
                  </div>
                </div>
              </div>
            </div>
          </>
        );
      })}
    </Styles.OtherUser>
  );
};

export default OtherUser;
