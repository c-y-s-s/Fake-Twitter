import React, { FC, useEffect, useState } from "react";
import { ReactComponent as AddMedia } from "../../img/home/addMedia.svg";
import { userPublishedModalToggle } from "../../reducers/controller";
import { useDispatch, useSelector } from "react-redux";
import * as Styles from "./styles";
import { GlobalClientImg } from "../../styles/GlobalStyle";
import { RootState } from "../../reducers";
import { setImgFile, setInputValue } from "../../reducers/postPublished";
import UsePostArticle from "../../hook/UsePostArticle";
import ReactLoading from "react-loading";

interface UserPublishedProps {
  setModalLineSwitch?: (value: boolean) => void;
}

const UserPublished: FC<UserPublishedProps> = ({ setModalLineSwitch }) => {
  const dispatch = useDispatch();
  const userData = useSelector(
    (state: RootState) => state.userSliceReducer.userData
  );

  const imgFile = useSelector(
    (state: RootState) => state.postPublishedSliceReducer.imgFile
  );
  const inputValue = useSelector(
    (state: RootState) => state.postPublishedSliceReducer.inputValue
  );

  const { onSubmit, loading } = UsePostArticle();
  const handleTweetClick = () => {
    if (inputValue) {
      setTimeout(() => {
        onSubmit();
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // 取得上傳圖片的路徑
  const previewUrl = imgFile ? URL.createObjectURL(imgFile) : "";

  return (
    <Styles.UserPublished>
      <div className="client-content-block">
        <div className="client-textarea-block">
          <GlobalClientImg
            src={userData.photoURL}
            alt="user"
            Location="userPublished"
          />
          <div className="text-container">
            <textarea
              placeholder="What's happening?"
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>): void => {
                dispatch(setInputValue(e.target.value));
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
                  dispatch(
                    setImgFile((e.target as HTMLInputElement)?.files?.[0])
                  );
                }}
              />

              <label htmlFor="post-image">
                <AddMedia />
              </label>
            </div>
          </div>
          <div
            className={`client-textarea-tweet ${
              !inputValue ? "stop-click" : ""
            }`}
            onClick={handleTweetClick}
          >
            {loading ? (
              <ReactLoading
                type={"spin"}
                color="#fff"
                height={"15px"}
                width={"20px"}
              />
            ) : (
              "Send"
            )}
          </div>
        </div>
      </div>
    </Styles.UserPublished>
  );
};

export default UserPublished;
