import { Routes, Route, Navigate } from "react-router-dom";

import Home from "./page/Home/Home";
import Explore from "./page/Explore/Explore";
import User from "./page/User/User";
import SignInModal from "./components/SignInModal/SignInModal";
import RegisterModal from "./components/RegisterModal/RegisterModal";

import { useDispatch, useSelector } from "react-redux";
import { setUserLogin } from "./reducers/controller";
import { FC, useEffect } from "react";
import Profile from "./page/Profile/Profile";
import { setUserData } from "./reducers/user";
import Chatroom from "./components/Chatroom/Chatroom";

interface appProps {
  user: any;
}

const App: FC<appProps> = (props) => {
  const user = props;
  const dispatch = useDispatch();

  // 監聽登入中 || 登出
  useEffect(() => {
    if (user) {
      dispatch(setUserLogin(user?.user));
      dispatch(
        setUserData({
          displayName: user?.user?.displayName,
          email: user?.user?.email,
          photoURL: user?.user?.photoURL,
          uid: user?.user?.uid,
          creationTime: user?.user?.metadata?.creationTime,
        })
      );
    } else {
      dispatch(setUserLogin("null"));
    }
  }, [dispatch, user]);

  return (
    <>
      <Routes>
        <Route path="/" element={<Home name="Home" />} />
        <Route
          path="/login"
          element={
            user?.user !== null ? <Navigate to="/" replace /> : <SignInModal />
          }
        />
        <Route
          path="/register"
          element={
            user?.user !== null ? (
              <Navigate to="/" replace />
            ) : (
              <RegisterModal />
            )
          }
        />
        <Route path="/explore" element={<Explore />} />
        <Route
          path="/profile"
          element={
            user?.user === null ? <Navigate to="/login" replace /> : <Profile />
          }
        />
        <Route path="/user/:userId" element={<User />} />
        <Route path="/chartroom" element={<Chatroom />} />
        <Route path="*" element={<div>error</div>} />
      </Routes>
    </>
  );
};

export default App;
