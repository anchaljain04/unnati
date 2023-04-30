import React, { useState, useEffect } from "react";
import moment from "moment";
import axios from "axios";
import NavBar from "./NavBar";
import { Table } from "react-bootstrap";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
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

function ConnectionRequests() {
  const [requests, setRequests] = useState([]);
  const userData = localStorage.getItem("Profile");
  const user = JSON.parse(userData);

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const isCustomer = useState(user?.category === "customer" ? true : false);

  let url;
  let raw;
  if (user.category === "customer") {
    url = "http://localhost:8000/user/get-connection-requests";
    raw = {
      params: { userId: user?._id },
    };
  } else {
    url = "http://localhost:8000/provider/get-connection-requests";
    raw = {
      params: { providerId: user?._id },
    };
  }

  useEffect(() => {
    axios
      .get(url, raw)
      .then((response) => {
        setRequests(response.data);
      })
      .catch((error) => console.log(error));
  }, [user?._id, url, raw]);

  const sendEmail = (e, request) => {
    e.preventDefault();
    const raw = {
      subject: "Provider's Details",
      userName: request?.userId?.name,
      to: request?.userId?.email,
      service:
        request?.requirementId?.service.charAt(0).toUpperCase() +
        request?.requirementId?.service.slice(1),
      providerName: request?.providerId?.name,
      providerAddress: request?.providerId?.address,
      providerExperience: request?.providerId?.experience,
      providerEmail: request?.providerId?.email,
      providerMobile: request?.providerId?.mobile,
    };
    axios
      .post("http://localhost:8000/user/send-email", raw)
      .then((res) => {
        console.log(res);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const handleAccept = (e, request) => {
    e.preventDefault();
    axios
      .get("http://localhost:8000/user/update-connection-requests", {
        params: { id: request?._id, status: "accepted" },
      })
      .then((response) => {
        if (response.status === 200) {
          handleOpen();
          sendEmail(e, request);
        }
      })
      .catch((error) => console.log(error));
  };
  const handleReject = (e, request) => {
    e.preventDefault();
    axios
      .get("http://localhost:8000/user/update-connection-requests", {
        params: { id: request?._id, status: "rejected" },
      })
      .then((response) => {
        if (response.status === 200) {
          window.alert("Connection request rejected!");
          window.location.reload(true);
        }
      })
      .catch((error) => console.log(error));
  };
  return (
    <div style={{ textAlign: "center", background: "pink", height: "100vh" }}>
      <NavBar />
      <div>
        <h1
          style={{
            marginTop: "80px",
            fontFamily: "Roboto Slab, serif",
            fontStyle: "italic",
          }}
        >
          {isCustomer
            ? "List of connection requests you received"
            : "List of connection requests you have sent"}
        </h1>
        <div
          className="container"
          style={{
            marginTop: "50px",
            textAlign: "center",
          }}
        >
          {requests.length === 0 ? (
            <h2>No data Available at the moment!</h2>
          ) : (
            <Table
              striped
              bordered
              hover
              variant="dark"
              style={{ width: "85%", margin: "auto" }}
            >
              <thead>
                <tr>
                  <th>S. No.</th>
                  <th>Requirement of</th>
                  <th>Requirement Posted On</th>
                  {!isCustomer ? <th>Required Experience</th> : ""}
                  <th>{isCustomer ? "Provider's Name" : "Customer's Name"}</th>
                  <th>
                    {isCustomer ? "Provider's Address" : "Customer's Address"}
                  </th>
                  {isCustomer ? <th>"Provider's Experience"</th> : ""}
                  <th>{isCustomer ? "Actions" : "Status"}</th>
                </tr>
              </thead>
              <tbody>
                {requests === [] ? (
                  <h1>Loading</h1>
                ) : (
                  requests.map((request, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{request?.requirementId?.service}</td>
                      <td>
                        {moment(request?.requirementId?.createdAt).format(
                          "DD-MM-YYYY"
                        )}
                      </td>
                      {!isCustomer ? (
                        <td>{request.requirementId.experience}</td>
                      ) : (
                        ""
                      )}
                      <td>
                        {isCustomer
                          ? request.providerId.name
                          : request.userId?.name}
                      </td>
                      <td>
                        {isCustomer
                          ? request.providerId.address
                          : request?.userId?.address}
                      </td>
                      {isCustomer ? (
                        <td>{request.providerId.experience}</td>
                      ) : (
                        ""
                      )}
                      <td>
                        {isCustomer && request.status === "pending" ? (
                          <>
                            <div>
                              <button
                                style={{
                                  borderRadius: "50%",
                                  padding: "0px 4px",
                                  paddingBottom: "2px",
                                  marginRight: "5px",
                                  background: "green",
                                  color: "white",
                                  border: "none",
                                }}
                                onClick={(e) => handleAccept(e, request)}
                              >
                                <CheckIcon style={{ fontSize: "18px" }} />
                              </button>
                              <button
                                style={{
                                  borderRadius: "50%",
                                  padding: "0px 4px",
                                  paddingBottom: "2px",
                                  background: "red",
                                  color: "white",
                                  border: "none",
                                }}
                                onClick={(e) => handleReject(e, request)}
                              >
                                <CloseIcon style={{ fontSize: "18px" }} />
                              </button>
                            </div>
                          </>
                        ) : (
                          <>{request.status}</>
                        )}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </Table>
          )}
        </div>
      </div>
      <div>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <div style={{ textAlign: "center" }}>
              <h4>You have successfully accepted the request.</h4>
              <br />
              <h5>
                Contact details of the provider will be sent to your e-mail
                soon.
              </h5>
              <br />
              <h5>Thank you for your visit.</h5>
            </div>
            <div style={{ textAlign: "center", marginTop: "25px" }}>
              <button onClick={handleClose}>Close</button>
            </div>
          </Box>
        </Modal>
      </div>
    </div>
  );
}

export default ConnectionRequests;
