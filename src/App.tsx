import { Routes, Route } from "react-router-dom";

import Home from "./page/Home/Home";
import Explore from "./page/Explore/Explore";
import User from "./page/User/User";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home name="Home" />} />
      <Route path="/explore" element={<Explore />} />
      <Route path="/user/:userId" element={<User />}></Route>
    </Routes>
  );
}

export default App;
