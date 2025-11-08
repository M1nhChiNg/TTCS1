import Home from "./component/Home";
import Detail from "./component/Detail";
import Login from "./component/Login";
import Find from "./component/Find";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import StoryReader from "./component/StoryReader";
import Admin from "./component/Admin";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home></Home>}></Route>
        <Route path="/comics/:StoryID" element={<Detail></Detail>}></Route>
        <Route path="/login" element={<Login></Login>}></Route>
        <Route path="/find" element={<Find></Find>}></Route>
        <Route
          path="/read/:ChapterID"
          element={<StoryReader></StoryReader>}
        ></Route>
        <Route path="/admin" element={<Admin></Admin>}></Route>
      </Routes>
    </Router>
  );
}

export default App;
