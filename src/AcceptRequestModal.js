import React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
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

function AcceptRequestModal({ open, setOpen }) {
  console.log(open, setOpen);
  //   const [open, setOpen] = React.useState(false);
  //   const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const navigate = useNavigate();

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div>
            <h3>You have successfully accepted the request.</h3>
            <h4>
              Contact details of the provider will be sent to your e-mail soon.
            </h4>
            <h5>Thank you for your visit.</h5>
          </div>
          <div>
            <button onClick={() => navigate("/")}>Close</button>
          </div>
        </Box>
      </Modal>
    </div>
  );
}

export default AcceptRequestModal;
