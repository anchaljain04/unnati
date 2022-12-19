import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Home";
import NaviBar from "./NaviBar";
import Services from "./Services";
import Login from "./Login";
import Carpenter from "./Carpenter";
import Electrician from "./Electrician";
import Plumber from "./Plumber";
import Painter from "./Painter";
import Chef from "./Chef";
import Maid from "./Maid";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          exact
          path="/"
          element={
            <div className="App">
              <NaviBar />
              <Home />
            </div>
          }
        />
        <Route exact path="/services" element={<Services />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/maid" element={<Maid />} />
        <Route exact path="/carpenter" element={<Carpenter />} />
        <Route exact path="/electrician" element={<Electrician />} />
        <Route exact path="/plumber" element={<Plumber />} />
        <Route exact path="/painter" element={<Painter />} />
        <Route exact path="/chef" element={<Chef />} />'
      </Routes>
    </BrowserRouter>
  );
}

export default App;
