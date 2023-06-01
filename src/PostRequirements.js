import React, { useState, useContext } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import AppContext from "./context/AppContext";

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
  const myContext = useContext(AppContext);
  const data = myContext.isHindi ? myContext.dataHindi : myContext.dataEnglish;

  const userData = localStorage.getItem("Profile");
  const navigate = useNavigate();
  const user = JSON.parse(userData);
  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("https://lucky-bear-hospital-gown.cyclic.app/user/save-requirements", {
        name: user.name,
        email: user.email,
        mobile: user.mobile,
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
        {data?.postRequirement}
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
              {data?.requirementOf}
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
                {data?.select}
              </option>
              <option value="maid">{data?.maidService}</option>
              <option value="carpenter">{data?.carpenterService}</option>
              <option value="electrician">{data?.electricianService}</option>
              <option value="plumber">{data?.plumberService}</option>
              <option value="painter">{data?.painterService}</option>
              <option value="chef">{data?.chefService}</option>
            </select>
            <label style={{ fontWeight: "500", textShadow: "1px 1px white" }}>
              {data?.requiredExperience}:
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
                {data?.select}
              </option>
              <option>0-1</option>
              <option>1-2</option>
              <option>2-3</option>
              <option>3-4</option>
              <option>4+</option>
            </select>

            <label style={{ fontWeight: "500", textShadow: "1px 1px white" }}>
              {data?.preferredTime}
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
                {data?.select}
              </option>
              <option value="Morning Only">{data?.morningOnly}</option>
              <option value="Evening Only">{data?.eveningOnly}</option>
              <option value="Morning/Evening">{data?.morningEvening}</option>
              <option value="All Day">{data?.allDay}</option>
              <option value="Anytime">{data?.anytime}</option>
            </select>
            <label style={{ fontWeight: "500", textShadow: "1px 1px white" }}>
              {data?.address}:
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
                {data?.submit}
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
                {data?.cancel}
              </button>
            </div>
          </form>
        </Box>
      </Modal>
    </div>
  );
}

export default PostRequirements;
