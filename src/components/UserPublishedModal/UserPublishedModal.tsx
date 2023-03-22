import React, { FC, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../reducers";
import { userPublishedModalToggle } from "../../reducers/controller";
import UserPublished from "../UserPublished/UserPublished";
import * as Styles from "./styles";
import { ReactComponent as CrossSVG } from "../../img/cross.svg";
interface UserPublishedProps {
  userImg: string;
  setInputValue: (value: string) => void;
  inputValue: string;
  handleTweet: () => void;
}

const UserPublishedModal: FC<UserPublishedProps> = ({
  userImg,
  setInputValue,
  inputValue,
  handleTweet,
}) => {
  const dispatch = useDispatch();
  const userPublishedModalSwitch = useSelector(
    (state: RootState) => state.controllerSliceReducer.userPublishedModal
  );

  const [modalLineSwitch, setModalLineSwitch] = useState(false);

  
  const body: HTMLBodyElement | null = document.querySelector("body");

  useEffect(() => {
    if (body && userPublishedModalSwitch) {
      body.style.overflow = "hidden";
    }
  }, [body, userPublishedModalSwitch]);

  if (!userPublishedModalSwitch) {
    if (body) {
      body.style.overflow = "auto";
      return null;
    }
  }
  return (
    <Styles.UserPublishedModal
      onClick={() => {
        dispatch(userPublishedModalToggle(false));
      }}
    >
      <div
        className="modal-container"
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <div className={`modal-line ${modalLineSwitch ? "flash " : ""}`}></div>
        <button
          className="close-button"
          onClick={() => {
            dispatch(userPublishedModalToggle(false));
          }}
        >
          <CrossSVG />
        </button>
        <div className="user-published-block">
          <UserPublished
            userImg={userImg}
            setInputValue={setInputValue}
            inputValue={inputValue}
            handleTweet={handleTweet}
            setModalLineSwitch={setModalLineSwitch}
            modalLineSwitch={modalLineSwitch}
          />
        </div>
      </div>
    </Styles.UserPublishedModal>
  );
};

export default UserPublishedModal;
