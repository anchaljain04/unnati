import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./Home";
import NavBar from "./NavBar";
import Services from "./Services";
import Login from "./Login";
import ProviderData from "./ProviderData";
import Requirements from "./Requirements";
import About from "./About";
import MyActivities from "./MyActivities";
import ConnectionRequests from "./ConnectionRequests";
import MainLoader from "./MainLoader";

function App() {
  const [loader, setLoader] = useState(true);

  return loader ? (
    <MainLoader setLoader={setLoader} />
  ) : (
    <BrowserRouter>
      <Routes>
        <Route
          exact
          path="/"
          element={
            <div className="App">
              <NavBar />
              <Home />
            </div>
          }
        />
        <Route exact path="/services/:service" element={<ProviderData />} />
        <Route exact path="/services" element={<Services />} />
        <Route exact path="/requirements" element={<Requirements />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/about" element={<About />} />
        <Route exact path="/activities" element={<MyActivities />} />
        <Route
          exact
          path="/connection-requests"
          element={<ConnectionRequests />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
