import React, { Dispatch, FC, SetStateAction, useState } from "react";
import * as Styles from "../styles";
import { ReactComponent as CrossSVG } from "../../../img/cross.svg";
import TextField from "@mui/material/TextField";
import { getAuth, updateProfile } from "firebase/auth";
import firebase from "../../../utils/firebase";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import ReactLoading from "react-loading";

interface UserEditDataModalProps {
  setIsOpenModal: Dispatch<SetStateAction<boolean>>;
}

const UserEditDataModal: FC<UserEditDataModalProps> = ({ setIsOpenModal }) => {
  const [nameValue, setNameValue] = useState("");
  const [passwordValue, setPasswordValue] = useState("");
  const [file, setFile] = useState<any>(null);
  const [isLoading, setLoading] = useState<boolean>(false);
  const user: any = firebase?.auth()?.currentUser || {};
  const auth: any = getAuth();

  // 取得圖片路徑
  const previewImageUrl = file ? URL.createObjectURL(file) : user?.photoURL;

  const handleEditUserData = (): void => {
    if (!auth) return;
    setLoading(true);
    const db = firebase.firestore();
    // 圖片
    if (file) {
      // 上傳會員圖片邏輯
      const fireRef = firebase?.storage()?.ref("user-photos/" + user?.uid);
      const metadata = {
        contentType: file?.type,
      };

      fireRef.put(file, metadata).then(() => {
        fireRef.getDownloadURL().then((imageUrl) => {
          user?.updateProfile({
            photoURL: imageUrl,
          });
          setIsOpenModal(false);
          setLoading(false);
          window.location.reload();
        });
      });
    }

    //名字
    if (nameValue.length > 1) {
      db.collection("users")
        .where("mail", "==", user?.email)
        .get()
        .then((collectionSnapshot) => {
          collectionSnapshot.docs.map((item) => {
            let userId = item.data().id;

            db.collection("users")
              .doc(`user${userId}`)
              .update({
                name: nameValue,
              })
              .then(() => {
                setLoading(false);
                window.location.reload();
              });
          });
        });

      updateProfile(auth?.currentUser, {
        displayName: nameValue ? nameValue : user?.displayName,
      })
        .then(() => {
          setIsOpenModal(false);
          // window.location.reload();
        })
        .catch((error) => {
          console.log(error);
        });
    }

    // 密碼
    if (passwordValue.length >= 8) {
      user.updatePassword(passwordValue).then(() => {
        setIsOpenModal(false);
        setLoading(false);
        window.location.reload();
      });
    }
  };

  return (
    <Styles.UserEditDataModal>
      <div className="modal-container">
        <div className="top-container">
          <div className="left">
            <button
              className="close-button"
              onClick={() => {
                setIsOpenModal(false);
              }}
            >
              <CrossSVG />
            </button>
            <div className="font-bold">Edit profile</div>
          </div>

          <div className="save-button" onClick={handleEditUserData}>
            {isLoading ? (
              <ReactLoading
                type={"spin"}
                color="#fff"
                height={"15px"}
                width={"20px"}
              />
            ) : (
              "Save"
            )}
          </div>
        </div>

        <div className="center-block">
          <div>
            <div className="user-photo-data-edit">
              <img className="picture" src={previewImageUrl} alt="" />
              <label htmlFor="post-image" className="change-image">
                更換照片
              </label>
              <input
                type="file"
                id="post-image"
                style={{ display: "none" }}
                onChange={(e) => {
                  if (e.target.files) setFile(e?.target?.files[0]);
                }}
              />
            </div>

            <TextField
              type="text"
              className="name"
              value={nameValue}
              onChange={(e) => setNameValue(e.target.value)}
              label="name"
            />

            <TextField
              error={
                passwordValue.length >= 8 || passwordValue.length === 0
                  ? false
                  : true
              }
              label="密碼"
              type="password"
              className="password"
              value={passwordValue}
              onChange={(e) => {
                setPasswordValue(e.target.value);
              }}
            />

            {passwordValue.length >= 8 ||
              (passwordValue.length !== 0 && (
                <p className="error-msg">
                  你的密碼必須至少 8 個字元。請輸入較長的密碼。
                </p>
              ))}
          </div>
        </div>
      </div>
    </Styles.UserEditDataModal>
  );
};

export default UserEditDataModal;
