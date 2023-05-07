import { useState, useContext } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./Home";
import NavBar from "./NavBar";
import Services from "./Services";
import Login from "./Login";
import Login2 from "./Login2";
import ProviderData from "./ProviderData";
import Requirements from "./Requirements";
import About from "./About";
import MyActivities from "./MyActivities";
import ConnectionRequests from "./ConnectionRequests";
import MainLoader from "./MainLoader";
import AppContext from "./context/AppContext";

function App() {
  const [loader, setLoader] = useState(true);
  const myContext = useContext(AppContext);

  return loader ? (
    <MainLoader setLoader={setLoader} />
  ) : (
    <>
      {/* {console.log(myContext.isHindi)} */}
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
              // )
            }
          />
          <Route exact path="/services/:service" element={<ProviderData />} />
          <Route exact path="/services" element={<Services />} />
          <Route exact path="/requirements" element={<Requirements />} />
          <Route
            exact
            path="/login"
            element={myContext.isHindi ? <Login2 /> : <Login />}
          />
          <Route exact path="/about" element={<About />} />
          <Route exact path="/activities" element={<MyActivities />} />
          <Route
            exact
            path="/connection-requests"
            element={<ConnectionRequests />}
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
