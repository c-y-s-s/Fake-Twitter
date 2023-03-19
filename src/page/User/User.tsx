import React, { FC, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useGetSearchUserDataQuery } from "../../api/searchApi";

const User: FC = () => {
  const { userId } = useParams();

  const getUserData = useGetSearchUserDataQuery(userId ?? "");
  const userData = getUserData.data;

  // useEffect(() => {
  //   console.log(userData);
  // }, [userData]);

  return (
    <div style={{ textAlign: "center", padding: "16px 0 0 0" }}>
      尚未製作個人頁面 這邊透過 useParams 的 userId 重新打一次 api
      拿用戶個別資料
      <ul style={{ listStyleType: "none" }}>
        <li>Id:{userData?.id}</li>
        <li>Name:{userData?.name}</li>
        <li>Phone:{userData?.phone}</li>
        <li>Username:{userData?.username}</li>
        <li>Website:{userData?.website}</li>
        <li>City:{userData?.address?.city}</li>
        <li>Email:{userData?.email}</li>
      </ul>
    </div>
  );
};

export default User;
