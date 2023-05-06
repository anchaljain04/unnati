import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./Home2";
import NavBar from "./NavBar";
import NavBar2 from "./NavBar2";
import Home2 from "./Home2";

import Services2 from "./Services2";
import Login2 from "./Login2";
import ProviderData2 from "./ProviderData2";
import Requirements2 from "./Requirements2";
import About2 from "./About2";
import MyActivities2 from "./MyActivities2";
import ConnectionRequest2 from "./ConnectionRequest2";
import MainLoader from "./MainLoader";

function App() {
  const [loader, setLoader] = useState(true);
  const [isHindi, setIsHindi] = useState(false);

  return loader ? (
    <MainLoader setLoader={setLoader} />
  ) : (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            exact
            path="/"
            element={(
              <div className="App">
              <NavBar2/>
                <Home2/>
              </div>
            )
              // isHindi ? (
              //   <div className="App">
              //     <NavBar2 />
              //     <Home2 />
              //   </div>
              // ) : (
              //   <div className="App">
              //     {/* <NavBar2/> */}
              //     <Home2 />
              //   </div>
              // )
            }
          />
          <Route exact path="/services/:service" element={<ProviderData2 />} />
          <Route exact path="/services" element={<Services2 />} />
          <Route exact path="/requirements" element={<Requirements2 />} />
          <Route exact path="/login" element={<Login2 />} />
          <Route exact path="/about" element={<About2 />} />
          <Route exact path="/activities" element={<MyActivities2 />} />
          <Route
            exact
            path="/connection-requests"
            element={<ConnectionRequest2 />}
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
