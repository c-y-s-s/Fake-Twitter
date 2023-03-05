import { Routes, Route } from "react-router-dom";

import Home from "./page/Home/Home";
import Explore from "./page/Explore/Explore";
import User from "./page/User/User";
import SignInModal from "./components/SignInModal/SignInModal";
import RegisterModal from "./components/RegisterModal/RegisterModal";
import firebase from "./utils/firebase";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { userLogin } from "./reducers/controller";

function App() {
  const dispatch = useDispatch();

  // 監聽登入 || 登出
  useEffect(() => {
    firebase.auth().onAuthStateChanged((currentUser) => {
      dispatch(userLogin(currentUser));
    });
  });
  return (
    <Routes>
      <Route path="/" element={<Home name="Home" />} />

      <Route path="/login" element={<SignInModal />} />
      <Route path="/register" element={<RegisterModal />} />

      <Route path="/explore" element={<Explore />} />
      <Route path="/user/:userId" element={<User />} />
    </Routes>
  );
}

export default App;
