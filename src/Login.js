import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import NavBar from "./NavBar";
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

function App() {
  const navigate = useNavigate();
  const [justifyActive, setJustifyActive] = useState("tab1");
  const [showService, setShowService] = useState(false);
  const [role, setRole] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [mobile, setMobile] = useState("");
  const [address, setAddress] = useState("");
  const [securityQues, setSecurityQues] = useState("");
  const [securityAns, setSecurityAns] = useState("");
  const [category, setCategory] = useState("");
  const [service, setService] = useState("");
  const [experience, setExperience] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleJustifyClick = (value) => {
    if (value === justifyActive) {
      return;
    }
    setJustifyActive(value);
  };

  const handleChange = (e) => {
    setCategory(e.target.value);
    if (e.target.value === "provider") {
      setShowService(true);
    } else if (e.target.value === "customer") {
      setShowService(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      window.alert("Password doesn't match");
    } else if (category === "provider") {
      if (
        !name ||
        !email ||
        !password ||
        !mobile ||
        !address ||
        !securityQues ||
        !securityAns ||
        !category ||
        !service ||
        !experience
      ) {
        window.alert("Please fill all the details");
      } else {
        axios
          .post("http://localhost:8000/provider/register", {
            name,
            email,
            password,
            mobile,
            address,
            category,
            serviceProviding: service,
            experience,
            securityQues,
            securityAns,
          })
          .then((response) => {
            if (response.status === 200) {
              window.alert("Provider Registered successfully.");
              navigate("/");
            }
          })
          .catch((error) => {
            if (error.response.status === 400) {
              window.alert("User already exists. Please Login!");
              setJustifyActive("tab1");
            }
          });
      }
    } else {
      if (
        !name ||
        !email ||
        !password ||
        !mobile ||
        !address ||
        !securityQues ||
        !securityAns ||
        !category
      ) {
        window.alert("Please fill all the details");
      } else {
        axios
          .post("http://localhost:8000/user/register", {
            name,
            email,
            password,
            mobile,
            address,
            category,
            securityQues,
            securityAns,
          })
          .then((response) => {
            if (response.status === 200) {
              window.alert("User Registered successfully.");
              navigate("/");
            }
          })
          .catch((error) => {
            if (error.response.status === 400) {
              window.alert("User already exists. Please Login!");
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
      window.alert("Please fill all the details!");
    } else {
      if (role === "provider") {
        url = "http:///localhost:8000/provider/login";
      } else if (role === "customer") {
        url = "http://localhost:8000/user/login";
      }
      await axios
        .post(url, { email, password })
        .then((response) => {
          if (response.status === 200) {
            window.alert("User logged in successfully");
            localStorage.setItem(
              "Profile",
              JSON.stringify(response.data.result)
            );
            navigate("/");
          }
        })
        .catch((error) => {
          if (error.response.status === 404) {
            window.alert("User not registered!");
            setJustifyActive("tab2");
          } else if (error.response.status === 400) {
            window.alert("Password doesn't match");
          }
        });
    }
  };
  return (
    <div
      style={{
        background: "pink",
        height: "120vh",
      }}
    >
      <NavBar />

      <MDBContainer
        className="p-3 my-5 d-flex flex-column "
        style={{
          width: "500px",
          border: "groove",
          background: "#dfdbe4",
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
              }}
              onClick={() => handleJustifyClick("tab1")}
              active={justifyActive === "tab1"}
            >
              Login
            </MDBTabsLink>
          </MDBTabsItem>
          <MDBTabsItem>
            <MDBTabsLink
              style={{
                border: "1px solid blue",
              }}
              onClick={() => handleJustifyClick("tab2")}
              active={justifyActive === "tab2"}
            >
              Register
            </MDBTabsLink>
          </MDBTabsItem>
        </MDBTabs>

        <MDBTabsContent>
          <MDBTabsPane show={justifyActive === "tab1"}>
            <form onSubmit={handleLogin}>
              <input
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
              <label>Provider</label>
              <input
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
              <label style={{ marginBottom: "15px" }}>Customer</label>
              <br />
              <label>Email:</label>
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
              <label>Password:</label>
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
                  background: "#0d6efd",
                  color: "white",
                  border: "none",
                }}
              >
                Login
              </button>
            </form>

            {/* <div className="d-flex justify-content-between mb-4">
              <a href="!#">Forgot password?</a>
            </div> */}
            <p className="text-center mt-2">
              Not a member?{" "}
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
              <label>Name:</label>
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
              <label>Email:</label>
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
              <label>Password:</label>
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
              <label>Confirm Password:</label>
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

              <label>Contact Number:</label>
              <input
                type="tel"
                style={{
                  width: "100%",
                  marginBottom: "10px",
                  borderRadius: "5px",
                  border: "none",
                  height: "30px",
                  padding: "5px 10px",
                }}
                required
                minLength={10}
                maxLength={10}
                onChange={(e) => setMobile(e.target.value)}
              />
              <label>Address:</label>
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
              <label>Security Question:</label>
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
                  select
                </option>
                <option value="What is the name of street you live in?">
                  What is the name of street you live in?
                </option>
                <option value="What is your favourite color?">
                  What is your favourite color?
                </option>
              </select>
              <br />
              <label>Security Answer:</label>
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
              <label>Category</label>
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
                  select
                </option>
                <option value="provider"> Provider</option>
                <option value="customer"> Customer</option>
              </select>
              <br />
              {showService ? (
                <>
                  <label>Service Providing</label>
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
                      select
                    </option>
                    <option>Maid</option>
                    <option>Carpenter</option>
                    <option>Electrician</option>
                    <option>Plumber</option>
                    <option>Painter</option>
                    <option>Chef</option>
                  </select>

                  <label>Experience (in years)</label>

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
                      select
                    </option>
                    <option>0-1</option>
                    <option>1-2</option>
                    <option>2-3</option>
                    <option>3-4</option>
                    <option>4+</option>
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
                  background: "#0d6efd",
                  color: "white",
                  border: "none",
                }}
              >
                Sign Up
              </button>
            </form>
          </MDBTabsPane>
        </MDBTabsContent>
      </MDBContainer>
    </div>
  );
}

export default App;
