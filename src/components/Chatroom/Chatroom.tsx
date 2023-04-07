import axios from "axios";
import { useEffect, useRef, useState } from "react";
import * as Styles from "./styles";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import firebase from "../../utils/firebase";
import LeftSideBar from "../LeftSideBar/LeftSideBar";
import RightSideBar from "../RightSideBar/RightSideBar";
import {
  collection,
  getDocs,
  doc,
  getDoc,
  updateDoc,
  setDoc,
} from "firebase/firestore";

interface TimeConversion {
  nanoseconds: number;
  seconds: number;
}
interface TimeConversionResult {
  year: number;
  month: number;
  date: number;
  hour: string;
  minute: string | number;
}
interface UserId {
  id: number[] | null;
}
const Chatroom = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState<string>("");
  const user: any = firebase?.auth()?.currentUser || {};
  const db = firebase?.firestore();
  const contentRef = useRef<HTMLDivElement | null>(null);
  const [messageData, setMessageData] = useState<[]>([]);
  const locationPathname = window.location.pathname;
  const userId = useRef<UserId>({
    id: null,
  });

  // 訊息發送時間格式重整
  const timeConversion = (time: TimeConversion): TimeConversionResult => {
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

  // open ai 回應訊息請求
  const fetchData = async () => {
    try {
      if (userId?.current?.id === null) return;

      // 拿 input value 去 call openAi api
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

      const messageDoc = doc(
        firebase?.firestore(),
        "message",
        `user${userId?.current?.id[0]}`
      );

      await updateDoc(messageDoc, {
        data: firebase.firestore.FieldValue.arrayUnion({
          text: response.data.choices[0].text,
          created_time: firebase.firestore.Timestamp.now(),
          isUser: false,
        }),
      });

      contentRef.current?.lastElementChild?.scrollIntoView();
    } catch (error) {
      console.log(error);
    }
  };

  // input 發送邏輯
  const handlePostMessage = async () => {
    try {
      if (inputValue.length === 0 || userId?.current?.id === null) return;

      // 取 message 資料長度作為判斷是否為初次使用聊天室
      const messageData = await getDoc(
        doc(firebase?.firestore(), "message", "user" + userId?.current?.id[0])
      );
      const MessageDataLength = messageData?.data()?.data?.length;

      const messageDoc = doc(
        firebase?.firestore(),
        "message",
        `user${userId?.current?.id[0]}`
      );

      // 將送出的 input value 存到 data base
      if (MessageDataLength >= 1) {
        await updateDoc(messageDoc, {
          id: userId?.current?.id[0],
          data: firebase?.firestore?.FieldValue?.arrayUnion({
            text: inputValue,
            created_time: firebase?.firestore?.Timestamp.now(),
            isUser: true,
          }),
        });
      } else {
        await setDoc(messageDoc, {
          id: userId?.current?.id[0],
          data: firebase?.firestore?.FieldValue?.arrayUnion({
            text: inputValue,
            created_time: firebase?.firestore?.Timestamp?.now(),
            isUser: true,
          }),
        });
      }

      fetchData();
      setInputValue("");
      contentRef.current?.lastElementChild?.scrollIntoView();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    async function getUserId() {
      // 找出 mail 是登入中的 user mail
      const queryUserSnapshot: any = await db
        .collection("users")
        .where("mail", "==", user?.email)
        .get();

      userId.current.id = queryUserSnapshot?.docs?.map((docSnapShot: any) => {
        return docSnapShot.data().id;
      });

      // 透過拿到的 userData 取對應 user id 的訊息資料
      db?.collection("message").onSnapshot((docSnapshot) => {
        const data = docSnapshot?.docs?.map((doc) => {
          if (userId?.current?.id !== null) {
            if (doc?.data()?.id === userId?.current?.id[0]) return doc?.data();
          }
        });

        const resultData = data.filter((item) => item !== undefined);

        if (resultData) setMessageData(resultData[0]?.data);
      });
    }
    getUserId();
  }, [db, user.email]);

  useEffect(() => {
    //進入頁面時永遠顯示最新訊息 (最下面)
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
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        height: window.innerHeight - 60 + "px",
      }}
    >
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
        <div className="chatroom-title"> Message (Ai對話)</div>

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
