import React, { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import axios from "axios";
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
  p: 4,
};

function PostRequirements() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [service, setService] = useState("");
  const [experience, setExperience] = useState("");
  const [address, setAddress] = useState("");
  const [availability, setAvailability] = useState("");

  const userData = localStorage.getItem("Profile");
  const navigate = useNavigate();
  const user = JSON.parse(userData);
  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:8000/user/save-requirements", {
        name: user.name,
        email: user.email,
        
        service: service.toLowerCase(),
        experience: experience,
        address: address,
        userId: user?._id,
        availability: availability,
      })
      .then((response) => {
        if (response.status === 200) {
          window.alert("Requirement saved successfully.");
          navigate("/");
        }
      })
      .catch((error) => {
        if (error.response.status === 400) {
          window.alert("Failed to save requirement. Please try again later.");
          navigate("/");
        }
      });
  };

  return (
    <div>
      <Button
        onClick={handleOpen}
        style={{
          marginTop: "30px",
          background: "#9e3369",
          justifyContent: "center",
          alignItems: "center",
          border: "none",
          color: "white",
          padding: "8px 15px",
        }}
      >
        Post Requirement
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <form>
            <label style={{ fontWeight: "500", textShadow: "1px 1px white" }}>
              Requirement of:
            </label>
            <select
              style={{
                width: "100%",
                height: "32px",
                border: "2px solid var(--primary-color)",
                borderRadius: "5px",
                padding: "0px 5px",
                marginBottom: "10px",
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
            <label style={{ fontWeight: "500", textShadow: "1px 1px white" }}>
              Required experience:
            </label>
            <select
              style={{
                width: "100%",
                height: "32px",
                border: "2px solid var(--primary-color)",
                borderRadius: "5px",
                padding: "0px 5px",
                marginBottom: "10px",
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

            <label style={{ fontWeight: "500", textShadow: "1px 1px white" }}>
              Preferred time:
            </label>
            <select
              style={{
                width: "100%",
                height: "32px",
                border: "2px solid var(--primary-color)",
                borderRadius: "5px",
                padding: "0px 5px",
                marginBottom: "10px",
              }}
              value={availability}
              onChange={(e) => setAvailability(e.target.value)}
            >
              <option value="" hidden>
                select
              </option>
              <option>Morning Only</option>
              <option>Evening Only</option>
              <option>Morning-Evening</option>
              <option>All Day</option>
              <option>Anytime</option>
            </select>
            <label style={{ fontWeight: "500", textShadow: "1px 1px white" }}>
              Address:
            </label>
            <br />
            <input
              type="text"
              style={{
                marginBottom: "10px",
                borderRadius: "5px",
                width: "100%",
                border: "2px solid var(--primary-color)",
              }}
              onChange={(e) => setAddress(e.target.value)}
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
                  border: "2px solid var(--primary-color)",
                }}
                onClick={handleSubmit}
              >
                Submit
              </button>
              <button
                style={{
                  marginTop: "20px",
                  justifyContent: "center",
                  alignItems: "center",
                  border: "2px solid var(--primary-color)",
                  borderRadius: "6px",
                  padding: "8px 15px",
                  marginLeft: "8px",
                }}
                onClick={handleClose}
              >
                Cancel
              </button>
            </div>
          </form>
        </Box>
      </Modal>
    </div>
  );
}

export default PostRequirements;
