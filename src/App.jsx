import Home from "./component/Home";
import Detail from "./component/Detail";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home></Home>}></Route>
        <Route path="/comics/:slug" element={<Detail></Detail>}></Route>
      </Routes>
    </Router>
  );
}

export default App;
