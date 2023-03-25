import axios from "axios";
import { useEffect, useRef, useState } from "react";
import * as Styles from "./styles";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import firebase from "../../utils/firebase";
import LeftSideBar from "../LeftSideBar/LeftSideBar";
import RightSideBar from "../RightSideBar/RightSideBar";
import { useParams } from "react-router-dom";

const Chatroom = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState<string>("");
  const user: any = firebase?.auth()?.currentUser || {};
  const db = firebase?.firestore();
  const contentRef = useRef<HTMLDivElement | null>(null);
  const [messageData, setMessageData] = useState<[]>([]);
  const locationPathname = window.location.pathname;
  let userId = useRef<any>();

  const timeConversion = (time: any): any => {
    const resultSecond = new Date(time?.seconds * 1000);
    let resultHours = "";
    if (resultSecond.getHours() >= 12) {
      resultHours = "PM " + resultSecond.getHours() + " ";
    } else {
      resultHours = "AM " + resultSecond.getHours() + " ";
    }
    return {
      year: resultSecond.getFullYear(),
      month: resultSecond.getMonth() + 1,
      date: resultSecond.getDate(),
      hour: resultHours,
      minute:
        resultSecond.getMinutes() < 10
          ? "0" + resultSecond.getMinutes()
          : resultSecond.getMinutes(),
    };
  };

  const handlePostMessage = async () => {
    if (inputValue.length === 0) return;
    let queryMessageSnapshot = await db
      .collection("message")
      .doc("user" + userId.current[0])
      .get();

    let MessageDataLength = queryMessageSnapshot?.data()?.data?.length;

    // open ai 回應訊息請求
    async function fetchData() {
      const response = await axios.post(
        "https://api.openai.com/v1/completions",
        {
          prompt: `Complete this sentence: ${inputValue}`,
          model: "text-davinci-003",
          max_tokens: 50,
          n: 1,
          stop: ".",
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${process.env.REACT_APP_OPEN_AI_API_KEY}`,
          },
        }
      );
      console.log("b");
      db.collection("message")
        ?.doc(`user${userId.current[0]}`)
        .update({
          data: firebase.firestore.FieldValue.arrayUnion({
            text: response.data.choices[0].text,
            created_time: firebase.firestore.Timestamp.now(),
            isUser: false,
          }),
        })
        .then(() => {
          setTimeout(() => {
            contentRef.current?.lastElementChild?.scrollIntoView();
          }, 100);
        });
    }

    // 根據是不是第一次發送聊天去更改 query
    let query: any;
    if (MessageDataLength >= 1) {
      query = db
        .collection(`message`)
        ?.doc(`user${userId.current[0]}`)
        .update({
          id: userId?.current[0],
          data: firebase?.firestore?.FieldValue?.arrayUnion({
            text: inputValue,
            created_time: firebase?.firestore?.Timestamp.now(),
            isUser: true,
          }),
        })
        .then(() => {
          setTimeout(() => {
            contentRef.current?.lastElementChild?.scrollIntoView();
          }, 100);
        });
    } else {
      query = db
        .collection(`message`)
        ?.doc(`user${userId.current[0]}`)
        .set({
          id: userId?.current[0],
          data: firebase?.firestore?.FieldValue?.arrayUnion({
            text: inputValue,
            created_time: firebase?.firestore?.Timestamp?.now(),
            isUser: true,
          }),
        })
        .then(() => {
          setTimeout(() => {
            contentRef.current?.lastElementChild?.scrollIntoView();
          }, 100);
        });
    }

    // message data request
    query
      .then(() => {
        fetchData();
        setInputValue("");
      })
      .catch((error: any) => {
        console.log(error);
      });
  };

  useEffect(() => {
    async function getUserId() {
      const queryUserSnapshot: any = await db
        .collection("users")
        .where("mail", "==", user?.email)
        .get();

      userId.current = queryUserSnapshot?.docs?.map((docSnapShot: any) => {
        return docSnapShot.data().id;
      });
    }
    getUserId();

    function getMessageData() {
      db?.collection("message").onSnapshot((docSnapshot) => {
        const data = docSnapshot?.docs?.map((doc) => {
          if (userId?.current)
            if (doc?.data()?.id === userId?.current[0]) return doc?.data();
        });

        const resultData = data.filter((item) => item !== undefined);

        if (resultData) setMessageData(resultData[0]?.data as []);
        // setArticleData(data);
      });
      // const data = queryMassageSnapshot?.docs?.map((item: any): void => {
      //   return item.data().data;
    }
    getMessageData();
  }, [db, user.email]);

  useEffect(() => {
    if (locationPathname === "/chartroom") {
      setTimeout(() => {
        contentRef.current?.lastElementChild?.scrollIntoView();
      }, 100);

      setIsOpen(true);
    }

    return () => {
      setIsOpen(false);
    };
  }, [locationPathname]);
  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      {locationPathname === "/chartroom" && <LeftSideBar name="chatroom" />}

      <Styles.ChartRoom
        isOpen={isOpen}
        className="chatroom-container"
        onClick={() => {
          setIsOpen(!isOpen);
          setTimeout(() => {
            contentRef.current?.lastElementChild?.scrollIntoView();
          }, 100);
        }}
      >
        Message (Ai對話)
        {isOpen && (
          <div
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            <div className="content" ref={contentRef}>
              {messageData &&
                messageData?.map((messageDataItem: any, index) => {
                  const resultDate = timeConversion(
                    messageDataItem?.created_time
                  );
                  return (
                    <div
                      className={`content-item  ${
                        messageDataItem?.isUser ? "user" : "open-ai"
                      } `}
                      key={messageDataItem?.created_time?.seconds + index}
                    >
                      <div className="content-text">
                        {messageDataItem?.text}
                      </div>
                      <div className="content-time">
                        <span> {resultDate.year}年</span>
                        <span> {resultDate.month}月</span>
                        <span> {resultDate.date}日</span>
                        <span> {resultDate.hour}:</span>
                        <span> {resultDate.minute} </span>
                      </div>
                    </div>
                  );
                })}
            </div>

            <div className="input-container">
              <input
                type="text"
                className="message-input"
                value={inputValue}
                onChange={(e) => {
                  setInputValue(e.target.value);
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handlePostMessage();
                  }
                }}
              />
              <div
                className={`message-post-button ${
                  inputValue.length <= 0 && "text-none"
                }`}
                onClick={handlePostMessage}
              >
                Send
              </div>
            </div>
          </div>
        )}
      </Styles.ChartRoom>
      {locationPathname === "/chartroom" && <RightSideBar />}
    </div>
  );
};

export default Chatroom;
