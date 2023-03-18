import { Routes, Route } from "react-router-dom";

import Home from "./page/Home/Home";
import Explore from "./page/Explore/Explore";
import User from "./page/User/User";
import SignInModal from "./components/SignInModal/SignInModal";
import RegisterModal from "./components/RegisterModal/RegisterModal";
import firebase from "./utils/firebase";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUserLogin } from "./reducers/controller";
import { RootState } from "./reducers";

function App() {
  const dispatch = useDispatch();
  const userLogin = useSelector(
    (state: RootState) => state.controllerSliceReducer.userLogin
  );


  // 監聽登入中 || 登出
  useEffect(() => {
    firebase.auth().onAuthStateChanged((currentUser) => {
      dispatch(setUserLogin(currentUser));
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
