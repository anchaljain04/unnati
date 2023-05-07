import React, { useEffect, useState, useContext } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import axios from "axios";
import AppContext from "./context/AppContext";
import { useNavigate } from "react-router-dom";

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

function UpdateAddressModal() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [address, setAddress] = useState("");

  const [user, setUser] = useState({});
  const navigate = useNavigate();

  const userData = localStorage.getItem("Profile");
  const userInfo = JSON.parse(userData);
  const myContext = useContext(AppContext);
  const data = myContext.isHindi ? myContext.dataHindi : myContext.dataEnglish;
  useEffect(() => {
    axios
      .get("http://localhost:8000/user/get-user-data", {
        params: { email: userInfo.email },
      })
      .then((response) => {
        if (response.status === 200) {
          setUser(response?.data);
        }
      })
      .catch((error) => {
        if (error.response.status === 400) {
          window.alert("Failed to fetch user details. Please try again later.");
          navigate("/");
        }
      });
  }, [navigate, userInfo.email]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!address) {
      window.alert("please enter a valid address!");
    } else {
      axios
        .post("http://localhost:8000/user/update-user", {
          address: address,
          email: user.email,
        })
        .then((response) => {
          if (response.status === 200) {
            localStorage.setItem("Profile", JSON.stringify(response?.data));
            window.alert("Address updated successfully.");
            window.location.reload(true);
          }
        })
        .catch((error) => {
          if (error.response.status === 400) {
            window.alert("Failed to update address. Please try again later.");
            navigate("/");
          }
        });
    }
  };

  return (
    <div>
      <button
        onClick={handleOpen}
        style={{
          background: "none",
          border: "none",
          fontSize: "14px",
          color: "blue",
          textDecoration: "underline",
        }}
      >
        {data?.change}
      </button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <h5>{data?.updateAddressTitle}</h5>
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

          <br />
          <h5>{data?.enterNewAddress}</h5>
          <input
            type="text"
            onChange={(e) => setAddress(e.target.value)}
            style={{ width: "100%", borderRadius: "5px" }}
          />
          <br />
          <div style={{ textAlign: "center" }}>
            <button
              style={{
                marginTop: "20px",
                justifyContent: "center",
                alignItems: "center",
                borderRadius: "5px",
                marginBottom: "10px",
              }}
              onClick={handleSubmit}
            >
              {data?.submit}
            </button>
          </div>
        </Box>
      </Modal>
    </div>
  );
}

export default UpdateAddressModal;
