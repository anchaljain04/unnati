import React, { useState } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import NavBar2 from "./NavBar2";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  py: 2,
  px: 3,
};

function ForgotPasswordModal2() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [securityQues, setSecurityQues] = useState("");
  const [securityAns, setSecurityAns] = useState("");
  const [isAnswerMatched, setIsAnswerMatched] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const handleVisibilityClick = () => {
    setShowPassword(!showPassword);
  };

  const handleContinue = (e) => {
    e.preventDefault();
    axios
      .get(
        `http://localhost:8000/${
          role === "customer" ? "user" : role
        }/fetch-security-ques`,
        {
          params: { email: email },
        }
      )
      .then((res) => {
        setSecurityQues(res.data.response);
      })
      .catch((error) => console.log(error));
  };

  const handleSubmit = (e) => {
    axios
      .get(
        `http://localhost:8000/${
          role === "customer" ? "user" : role
        }/match-security-ans`,
        {
          params: { email: email, answer: securityAns },
        }
      )
      .then((res) => {
        console.log(res);
        if (res.data.message === "Answer matched") {
          setIsAnswerMatched(true);
        } else {
          setIsAnswerMatched(false);
        }
      })
      .catch((error) => console.log(error));
  };

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    console.log("=======");
    if (password !== confirmPassword) {
      window.alert("password doesn't match");
    } else {
      axios
        .get(
          `http://localhost:8000/${
            role === "customer" ? "user" : role
          }/change-password`,
          {
            params: { email: email, newPassword: password },
          }
        )
        .then((res) => {
          if (res.status === 200) {
            window.alert(res.data.message);
            navigate("/");
          }
        })
        .catch((error) => console.log(error));
    }
  };
  return (
    <div>
      <button
        onClick={handleOpen}
        style={{
          background: "none",
          border: "none",
          color: "blue",
          textDecoration: "underline",
          fontSize: "15px",
        }}
      >
        पासवर्ड भूल गए?
      </button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div style={{ justifyContent: "center" }}>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                marginBottom: "10px",
              }}
            >
              <h5>पासवर्ड बदलें</h5>
              <button
                onClick={handleClose}
                style={{
                  borderRadius: "50%",
                  padding: "2px 9px",
                  backgroundColor: "red",
                  border: "none",
                  color: "white",
                  position: "absolute",
                  right: "25px",
                }}
              >
                X
              </button>
            </div>
            {!securityQues ? (
              <>
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
                <label>प्रदाता</label>
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
                <label style={{ marginBottom: "15px" }}>ग्राहक</label>
                <br />
                <label>अपना ईमेल दर्ज करें:</label>
                <br />
                <input
                  type="text"
                  style={{
                    marginBottom: "10px",
                    borderRadius: "5px",
                    width: "100%",
                  }}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <br />
                <div style={{ textAlign: "center" }}>
                  <button
                    style={{
                      marginTop: "20px",
                      background: "#9e3369",
                      justifyContent: "center",
                      alignItems: "center",
                      borderRadius: "5px",
                      color: "white",
                      padding: "8px 15px",
                      border: "1px solid transparent",
                    }}
                    onClick={handleContinue}
                  >
                    जारी रखना
                  </button>
                </div>
              </>
            ) : isAnswerMatched ? (
              <>
                <label>नया पासवर्ड दर्ज करें:</label>
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
                <div style={{ textAlign: "center" }}>
                  <button
                    style={{
                      marginTop: "20px",
                      background: "#9e3369",
                      justifyContent: "center",
                      alignItems: "center",
                      borderRadius: "5px",
                      color: "white",
                      padding: "8px 15px",
                      border: "1px solid transparent",
                    }}
                    onClick={handlePasswordSubmit}
                  >
                    जमा
                  </button>
                </div>
              </>
            ) : (
              <>
                <label>{securityQues}</label>
                <br />
                <input
                  type="text"
                  style={{
                    marginBottom: "10px",
                    borderRadius: "5px",
                    width: "100%",
                  }}
                  onChange={(e) => setSecurityAns(e.target.value)}
                />
                <div style={{ textAlign: "center" }}>
                  <button
                    style={{
                      marginTop: "20px",
                      background: "#9e3369",
                      justifyContent: "center",
                      alignItems: "center",
                      borderRadius: "5px",
                      color: "white",
                      padding: "8px 15px",
                      border: "1px solid transparent",
                    }}
                    onClick={handleSubmit}
                  >
                    जमा 
                  </button>
                </div>
              </>
            )}
          </div>
        </Box>
      </Modal>
    </div>
  );
}

export default ForgotPasswordModal2;
