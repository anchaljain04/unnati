import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./index.css";

import NavBar2 from "./NavBar2";
import {
  MDBContainer,
  MDBTabs,
  MDBTabsItem,
  MDBTabsLink,
  MDBTabsContent,
  MDBTabsPane,
} from "mdb-react-ui-kit";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import ForgotPasswordModal2 from "./ForgotPasswordModal2";

function Login2() {
  const navigate = useNavigate();
  const [justifyActive, setJustifyActive] = useState("tab1");
  const [showService, setShowService] = useState(false);
  const [role, setRole] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [address, setAddress] = useState("");
  const [securityQues, setSecurityQues] = useState("");
  const [securityAns, setSecurityAns] = useState("");
  const [category, setCategory] = useState("");
  const [service, setService] = useState("");
  const [experience, setExperience] = useState("");
  const [availability, setAvailability] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [bgClr, setBgClr] = useState("white");

  const handleJustifyClick = (value) => {
    if (value === justifyActive) {
      return;
    }
    setBgClr("#1d2951");

    setJustifyActive(value);
  };

  const handleChange = (e) => {
    setCategory(e.target.value);
    if (e.target.value === "प्रदाता") {
      setShowService(true);
    } else if (e.target.value === "ग्राहक") {
      setShowService(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      window.alert("पासवर्ड मेल नहीं खाता");
    } else if (category === "प्रदाता") {
      if (
        !name ||
        !email ||
        !password ||
        !address ||
        !securityQues ||
        !securityAns ||
        !category ||
        !service ||
        !experience ||
        !availability
      ) {
        window.alert("कृपया सभी विवरण भरें");
      } else {
        axios
          .post("http://localhost:8000/provider/register", {
            name,
            email,
            password,
            address,
            category,
            serviceProviding: service,
            experience,
            availability,
            securityQues,
            securityAns,
          })
          .then((response) => {
            if (response.status === 200) {
              window.alert("प्रदाता सफलतापूर्वक पंजीकृत।");
              navigate("/");
            }
          })
          .catch((error) => {
            if (error.response.status === 400) {
              window.alert("उपयोगकर्ता पहले से मौजूद है। कृपया लॉगिन करें!");
              setJustifyActive("tab1");
            }
          });
      }
    } else {
      if (
        !name ||
        !email ||
        !password ||
        !address ||
        !securityQues ||
        !securityAns ||
        !category
      ) {
        window.alert("कृपया सभी विवरण भरें");
      } else {
        axios
          .post("http://localhost:8000/user/register", {
            name,
            email,
            password,
            address,
            category,
            securityQues,
            securityAns,
          })
          .then((response) => {
            if (response.status === 200) {
              window.alert("उपयोगकर्ता सफलतापूर्वक पंजीकृत.");
              navigate("/");
            }
          })
          .catch((error) => {
            if (error.response.status === 400) {
              window.alert("उपयोगकर्ता पहले से मौजूद है। कृपया लॉगिन करें!");
              setJustifyActive("tab1");
            }
          });
      }
    }
  };

  const handleVisibilityClick = () => {
    setShowPassword(!showPassword);
  };
  let url;
  const handleLogin = async (e) => {
    e.preventDefault();
    if (!role || !email || !password) {
      window.alert("कृपया सभी विवरण भरें!");
    } else {
      if (role === "प्रदाता") {
        url = "http:///localhost:8000/provider/login";
      } else if (role === "customer") {
        url = "http://localhost:8000/user/login";
      }
      await axios
        .post(url, { email, password })
        .then((response) => {
          if (response.status === 200) {
            window.alert("उपयोगकर्ता सफलतापूर्वक लॉग इन हुआ");
            localStorage.setItem(
              "Profile",
              JSON.stringify(response.data.result)
            );
            navigate("/");
          }
        })
        .catch((error) => {
          if (error.response.status === 404) {
            window.alert("उपयोगकर्ता पंजीकृत नहीं है!");
            setJustifyActive("tab2");
          } else if (error.response.status === 400) {
            window.alert("पासवर्ड मेल नहीं खाता");
          }
        });
    }
  };
  return (
    <div
      style={{
        backgroundImage: 'url("/images/bg4.png")',
        height: "120vh",
      }}
    >
      <NavBar2 />

      <MDBContainer
        className="p-3 my-5 d-flex flex-column "
        style={{
          width: "500px",
          border: "groove",
          background: "#f8f8ff",
        }}
      >
        <MDBTabs
          pills
          justify
          className="mb-3 d-flex flex-row justify-content-between"
        >
          <MDBTabsItem>
            <MDBTabsLink
              style={{
                border: "1px solid blue",
                marginRight: "5px",
                backgroundColor: "#1d2951",
              }}
              onClick={() => handleJustifyClick("tab1")}
              active={justifyActive === "tab1"}
            >
             लॉग इन
            </MDBTabsLink>
          </MDBTabsItem>
          <MDBTabsItem>
            <MDBTabsLink
              style={{
                border: "1px solid blue",
                marginLeft: "5px",
                background: { bgClr },
              }}
              onClick={() => handleJustifyClick("tab2")}
              active={justifyActive === "tab2"}
            >
              पंजीकरण
            </MDBTabsLink>
          </MDBTabsItem>
        </MDBTabs>

        <MDBTabsContent>
          <MDBTabsPane show={justifyActive === "tab1"}>
            <form onSubmit={handleLogin}>
              <input
                id="foc"
                type="radio"
                value="provider"
                name="role"
                onChange={(e) => setRole(e.target.value)}
                style={{
                  marginRight: "5px",
                  transform: "scale(1.3)",
                  verticalAlign: "middle",
                }}
              />
              <label htmlFor="foc">प्रदाता</label>
              <input
                id="foc"
                type="radio"
                value="customer"
                name="role"
                onChange={(e) => setRole(e.target.value)}
                style={{
                  marginLeft: "15px",
                  marginRight: "5px",
                  transform: "scale(1.3)",
                  verticalAlign: "middle",
                }}
              />
              <label htmlFor="foc" style={{ marginBottom: "15px" }}>
                ग्राहक
              </label>
              <br />
              <label>ईमेल:</label>
              <input
                type="email"
                style={{
                  width: "100%",
                  marginBottom: "10px",
                  borderRadius: "5px",
                  border: "none",
                  height: "30px",
                  padding: "5px 10px",
                }}
                onChange={(e) => setEmail(e.target.value)}
              />
              <label>पासवर्ड:</label>
              <div style={{ display: "flex" }}>
                <input
                  type={showPassword ? "text" : "password"}
                  style={{
                    width: "100%",
                    marginBottom: "10px",
                    borderRadius: "5px",
                    border: "none",
                    height: "30px",
                    padding: "5px 10px",
                  }}
                  onChange={(e) => setPassword(e.target.value)}
                />
                {showPassword ? (
                  <RemoveRedEyeIcon
                    style={{ marginLeft: "5px", verticalAlign: "middle" }}
                    onClick={handleVisibilityClick}
                  />
                ) : (
                  <VisibilityOffIcon
                    style={{ marginLeft: "5px", verticalAlign: "middle" }}
                    onClick={handleVisibilityClick}
                  />
                )}
              </div>
              <button
                type="submit"
                style={{
                  width: "100%",
                  padding: "6px",
                  borderRadius: "5px",
                  marginTop: "15px",
                  background: "#1d2951",
                  color: "white",
                  border: "none",
                }}
              >
                लॉग इन करें
              </button>
            </form>

            <div className="d-flex justify-content-between mb-2">
              <ForgotPasswordModal2 />
            </div>
            <p className="text-center mt-2">
            सदस्य नहीं हैं?{" "}
              <button
                style={{
                  background: "none",
                  border: "none",
                  color: "blue",
                  textDecoration: "underline",
                  fontSize: "15px",
                }}
                onClick={() => handleJustifyClick("tab2")}
              >
                Register
              </button>
            </p>
          </MDBTabsPane>

          <MDBTabsPane show={justifyActive === "tab2"}>
            <form onSubmit={handleSubmit}>
              <label>नाम:</label>
              <input
                type="text"
                style={{
                  width: "100%",
                  marginBottom: "10px",
                  borderRadius: "5px",
                  border: "none",
                  height: "30px",
                  padding: "5px 10px",
                }}
                required
                onChange={(e) => setName(e.target.value)}
              />
              <label>ईमेल:</label>
              <input
                type="email"
                style={{
                  width: "100%",
                  marginBottom: "10px",
                  borderRadius: "5px",
                  border: "none",
                  height: "30px",
                  padding: "5px 10px",
                }}
                required
                onChange={(e) => setEmail(e.target.value)}
              />
              <label>पासवर्ड:</label>
              <div style={{ display: "flex" }}>
                <input
                  type={showPassword ? "text" : "password"}
                  minLength={6}
                  style={{
                    width: "100%",
                    marginBottom: "10px",
                    borderRadius: "5px",
                    border: "none",
                    height: "30px",
                    padding: "5px 10px",
                  }}
                  required
                  onChange={(e) => setPassword(e.target.value)}
                />
                {showPassword ? (
                  <RemoveRedEyeIcon
                    style={{ marginLeft: "5px", verticalAlign: "middle" }}
                    onClick={handleVisibilityClick}
                  />
                ) : (
                  <VisibilityOffIcon
                    style={{ marginLeft: "5px", verticalAlign: "middle" }}
                    onClick={handleVisibilityClick}
                  />
                )}
              </div>
              <label>पासवर्ड की पुष्टि कीजिये:</label>
              <input
                type="password"
                minLength={6}
                style={{
                  width: "100%",
                  marginBottom: "10px",
                  borderRadius: "5px",
                  border: "none",
                  height: "30px",
                  padding: "5px 10px",
                }}
                required
                onChange={(e) => setConfirmPassword(e.target.value)}
              />

              <label>पता:</label>
              <input
                type="text"
                style={{
                  width: "100%",
                  marginBottom: "10px",
                  borderRadius: "5px",
                  border: "none",
                  height: "30px",
                  padding: "5px 10px",
                }}
                required
                onChange={(e) => setAddress(e.target.value)}
              />
              <label>सुरक्षा प्रश्न:</label>
              <select
                style={{
                  width: "100%",
                  height: "32px",
                  border: "none",
                  borderRadius: "5px",
                  padding: "0px 5px",
                  marginBottom: "10px",
                }}
                value={securityQues}
                onChange={(e) => setSecurityQues(e.target.value)}
              >
                <option value="" hidden>
                चुनना
                </option>
                <option value="What is the name of street you live in?">
                आप जिस गली में रहते हैं उसका नाम क्या है?
                </option>
                <option value="What is your favourite color?">
                अपने पसंदीदा रंग क्या है?
                </option>
              </select>
              <br />
              <label>सुरक्षा जवाब:</label>
              <input
                type="text"
                style={{
                  width: "100%",
                  marginBottom: "10px",
                  borderRadius: "5px",
                  border: "none",
                  height: "30px",
                  padding: "5px 10px",
                }}
                required
                onChange={(e) => setSecurityAns(e.target.value)}
              />
              <label>वर्ग</label>
              <select
                style={{
                  width: "100%",
                  height: "32px",
                  border: "none",
                  borderRadius: "5px",
                  padding: "0px 5px",
                  marginBottom: "10px",
                }}
                value={category}
                onChange={handleChange}
              >
                <option value="" hidden>
                चुनना
                </option>
                <option value="provider"> प्रदाता</option>
                <option value="customer"> ग्राहक</option>
              </select>
              <br />
              {showService ? (
                <>
                  <label>सेवा प्रदान करना</label>
                  <select
                    style={{
                      width: "100%",
                      height: "32px",
                      border: "none",
                      borderRadius: "5px",
                      padding: "0px 5px",
                    }}
                    value={service}
                    onChange={(e) => setService(e.target.value)}
                  >
                    <option value="" hidden>
                    चुनना
                    </option>
                    <option>नौकरानी</option>
                    <option>बढ़ई</option>
                    <option>बिजली मिस्त्री</option>
                    <option>प्लंबर</option>
                    <option>चित्रकार</option>
                    <option>बावर्ची</option>
                  </select>

                  <label>अनुभव (वर्षों में)</label>

                  <select
                    style={{
                      width: "100%",
                      height: "32px",
                      border: "none",
                      borderRadius: "5px",
                      padding: "0px 5px",
                    }}
                    value={experience}
                    onChange={(e) => setExperience(e.target.value)}
                  >
                    <option value="" hidden>
                     चुनना
                    </option>
                    <option>0-1</option>
                    <option>1-2</option>
                    <option>2-3</option>
                    <option>3-4</option>
                    <option>4+</option>
                  </select>
                  <label>उपलब्धता का समय:</label>
                  <select
                    style={{
                      width: "100%",
                      height: "32px",
                      border: "none",
                      borderRadius: "5px",
                      padding: "0px 5px",
                    }}
                    value={availability}
                    onChange={(e) => setAvailability(e.target.value)}
                  >
                    <option value="" hidden>
                    चुनना
                    </option>
                    <option>केवल सुबह</option>
                    <option>केवल शाम</option>
                    <option>सुबह शाम</option>
                    <option>पूरे दिन</option>
                    <option>24*7</option>
                  </select>
                </>
              ) : (
                ""
              )}

              <button
                type="submit"
                style={{
                  width: "100%",
                  padding: "6px",
                  borderRadius: "5px",
                  marginTop: "15px",
                  background: "#1d2951",
                  color: "white",
                  border: "none",
                }}
              >
                साइन अप करें
              </button>
            </form>
          </MDBTabsPane>
        </MDBTabsContent>
      </MDBContainer>
    </div>
  );
}

export default Login2;
