import React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";

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

function AcceptRequestModal(props) {
  const close = () => {
    props.setOpen(false);
    window.location.reload(true);
  };
  return (
    <div>
      <Modal
        open={props.open}
        onClose={close}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div style={{ textAlign: "center" }}>
            <h4>You have successfully accepted the request.</h4>
            <br />
            <h5>
              Contact details of the provider will be sent to your e-mail soon.
            </h5>
            <br />
            <h5>Thank you for your visit.</h5>
          </div>
          <div style={{ textAlign: "center", marginTop: "25px" }}>
            <button onClick={close}>Close</button>
          </div>
        </Box>
      </Modal>
    </div>
  );
}

export default AcceptRequestModal;
