import React, { FC, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useGetSearchUserDataQuery } from "../../api/searchApi";

import "firebase/compat/auth";
import "firebase/compat/firestore";
import firebase from "../../utils/firebase";

const User: FC = () => {
  const { userId } = useParams();
  const [userData, setUserData] = useState<any>("");

  useEffect(() => {
    const getUserData = async () => {
      const userData = await firebase
        .firestore()
        .collection("users")
        .doc(userId)
        .get();

      if (userData) setUserData(userData?.data());
    };

    getUserData();
  }, [userId]);

  return (
    <div style={{ textAlign: "center", padding: "16px 0 0 0" }}>
      尚未製作個人頁面 這邊透過 useParams 的 userId 打 api 拿用戶個別資料
      <ul style={{ listStyleType: "none" }}>
        <li>Id:{userData?.id}</li>
        <li>Name:{userData?.name}</li>
        <li>Email:{userData?.mail}</li>
        <li>birthday:{userData?.birthday}</li>
      </ul>
    </div>
  );
};

export default User;
