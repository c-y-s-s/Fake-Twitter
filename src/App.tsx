import { Routes, Route } from "react-router-dom";

import Home from "./page/Home/Home";
import Explore from "./page/Explore/Explore";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home name="Home" />} />
      <Route path="/explore" element={<Explore />} />
    </Routes>
  );
}

export default App;
