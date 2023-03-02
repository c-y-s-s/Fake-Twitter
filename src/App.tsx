import { Routes, Route } from "react-router-dom";

import Home from "./page/Home/Home";
import Explore from "./page/Explore/Explore";
import User from "./page/User/User";
import SignInModal from "./components/SignInModal/SignInModal";
import RegisterModal from "./components/RegisterModal/RegisterModal";

function App() {
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
