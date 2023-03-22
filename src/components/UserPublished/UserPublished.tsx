import React, { FC, useEffect, useState } from "react";

import { ReactComponent as AddEmoji } from "../../img/home/addEmoji.svg";
import { ReactComponent as AddGif } from "../../img/home/addGif.svg";
import { ReactComponent as AddLocation } from "../../img/home/addLocation.svg";
import { ReactComponent as AddMedia } from "../../img/home/addMedia.svg";
import { ReactComponent as AddPoll } from "../../img/home/addPoll.svg";
import { ReactComponent as AddSchedule } from "../../img/home/addSchedule.svg";
import { userPublishedModalToggle } from "../../reducers/controller";
import { useDispatch, useSelector } from "react-redux";
import * as Styles from "./styles";
import { GlobalClientImg } from "../../styles/GlobalStyle";
import { RootState } from "../../reducers";

interface UserPublishedProps {
  userImg: string;
  setInputValue: (value: string) => void;
  inputValue: string;
  handleTweet: () => void;
  setModalLineSwitch?: (value: boolean) => void;
  modalLineSwitch?: boolean;
  setImgFile?: any;
  imgFile?: any;
}

const UserPublished: FC<UserPublishedProps> = ({
  userImg,
  setInputValue,
  inputValue,
  handleTweet,
  setModalLineSwitch,
  modalLineSwitch,
  setImgFile,
  imgFile,
}) => {
  const dispatch = useDispatch();
 const userData = useSelector(
   (state: RootState) => state.userSliceReducer.userData
 );
  const handleTweetClick = () => {
    if (inputValue) {
      setTimeout(() => {
        handleTweet();
        dispatch(userPublishedModalToggle(false));
      }, 650);
      if (setModalLineSwitch) {
        setModalLineSwitch(true);
      }
    }
  };

  useEffect(() => {
    return () => {
      if (setModalLineSwitch) {
        setModalLineSwitch(false);
      }
    };
  }, []);

  // 取得上傳圖片的路徑
  const previewUrl = imgFile ? URL.createObjectURL(imgFile) : "";
  return (
    <Styles.UserPublished>
      <div className="client-content-block">
        <div className="client-textarea-block">
          <GlobalClientImg src={userData.photoURL} alt="user" Location="userPublished" />
          <div className="text-container">
            <textarea
              placeholder="What's happening?"
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>): void => {
                setInputValue(e.target.value);
              }}
              value={inputValue}
            />
          </div>
        </div>
        <div className="img-container">
          {imgFile && <img src={previewUrl} alt="" className="post-img" />}
        </div>
        <div className="client-textarea-bottom">
          <div className="client-textarea-icon">
            <div className="icon-item">
              <input
                type="file"
                id="post-image"
                style={{ display: "none" }}
                onChange={(e: React.FormEvent<HTMLInputElement>) => {
                  setImgFile((e.target as HTMLInputElement)?.files?.[0]);
                }}
              />

              <label htmlFor="post-image">
                <AddMedia />
              </label>
            </div>
            {/* 
            尚未新增的功能
            <div className="icon-item">
              <AddGif />
            </div>
            <div className="icon-item">
              <AddPoll />
            </div>
            <div className="icon-item">
              <AddEmoji />
            </div>

            <div className="icon-item">
              <AddSchedule />
            </div>
            <div className="icon-item">
              <AddLocation />
            </div> */}
          </div>
          <div
            className={`client-textarea-tweet ${
              !inputValue ? "stop-click" : ""
            }`}
            onClick={handleTweetClick}
          >
            Send
          </div>
        </div>
      </div>
    </Styles.UserPublished>
  );
};

export default UserPublished;
