import React, { FC } from "react";

import { ReactComponent as AddEmoji } from "../../img/home/addEmoji.svg";
import { ReactComponent as AddGif } from "../../img/home/addGif.svg";
import { ReactComponent as AddLocation } from "../../img/home/addLocation.svg";
import { ReactComponent as AddMedia } from "../../img/home/addMedia.svg";
import { ReactComponent as AddPoll } from "../../img/home/addPoll.svg";
import { ReactComponent as AddSchedule } from "../../img/home/addSchedule.svg";

import * as Styles from "./styles";
interface UserPublishedProps {
  userImg: string;
  setInputValue: (value: string) => void;
  inputValue: string;
  handleTweet: () => void;
}

const UserPublished: FC<UserPublishedProps> = ({
  userImg,
  setInputValue,
  inputValue,
  handleTweet,
}) => {
  return (
    <Styles.UserPublished>
      <div className="client-content-block">
        <div className="client-textarea-block">
          <img className="client-data-img" src={userImg} alt="user" />
          <div className="textarea">
            <textarea
              placeholder="What's happening?"
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>): void => {
                setInputValue(e.target.value);
              }}
              value={inputValue}
            />
          </div>
        </div>
        <div className="client-textarea-bottom">
          <div className="client-textarea-icon">
            <div className="icon-item">
              <AddMedia />
            </div>

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
            </div>
          </div>
          <div className="client-textarea-tweet" onClick={handleTweet}>
            Tweet
          </div>
        </div>
      </div>
    </Styles.UserPublished>
  );
};

export default UserPublished;
