// import { useState } from "react";
// import { BrowserRouter, Routes, Route } from "react-router-dom";
// import "./App.css";
// import Home2 from "./Home2";
// import NavBar2 from "./NavBar2";
// import Services2 from "./Services2";
// import Login2 from "./Login2";
// import ProviderData2 from "./ProviderData2";
// import Requirements2 from "./Requirements2";
// import About2 from "./About2";
// import MyActivities2 from "./MyActivities2";
// import ConnectionRequests2 from "./ConnectionRequests2";
// import MainLoader2 from "./MainLoader2";

// function App2() {
//   const [loader, setLoader] = useState(true);

//   return loader ? (
//     <MainLoader2 setLoader={setLoader} />
//   ) : (
//     <BrowserRouter>
//       <Routes>
//         <Route
//           exact
//           path="/"
//           element={
//             <div className="App2">
//               <NavBar2 />
//               <Home2 />
//             </div>
//           }
//         />
//         <Route exact path="/services2/:service" element={<ProviderData2 />} />
//         <Route exact path="/services2" element={<Services2 />} />
//         <Route exact path="/requirements2" element={<Requirements2 />} />
//         <Route exact path="/login2" element={<Login2 />} />
//         <Route exact path="/about2" element={<About2 />} />
//         <Route exact path="/activities2" element={<MyActivities2 />} />
//         <Route
//           exact
//           path="/connection-requests2"
//           element={<ConnectionRequests2 />}
//         />
//       </Routes>
//     </BrowserRouter>
//   );
// }

// export default App2;
