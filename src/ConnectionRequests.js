import React, { useState, useEffect } from "react";
import moment from "moment";
import axios from "axios";
import NavBar from "./NavBar";
import { Table } from "react-bootstrap";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { useNavigate } from "react-router-dom";
import { TextField } from "@mui/material";
import ConnectionRequestsSent from "./ConnectionRequestsSent";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 430,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  py: 2,
  px: 3,
};

function ConnectionRequests() {
  const [requestReceived, setRequestReceived] = useState([]);
  const userData = localStorage.getItem("Profile");
  const user = JSON.parse(userData);

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    navigate("/");
  };

  const [userId, setUserId] = useState("");
  const [providerId, setProviderId] = useState("");
  const [requirementId, setRequirementId] = useState("");

  const [openFeedback, setOpenFeedback] = React.useState(false);
  const handleOpenFeedback = (user, provider, requirement) => {
    setOpenFeedback(true);
    setUserId(user);
    setProviderId(provider);
    setRequirementId(requirement);
  };
  const handleCloseFeedback = () => setOpenFeedback(false);
  const [experience, setExperience] = useState("");
  const [feedback, setFeedback] = useState("");
  const [isDone, setIsDone] = useState(false);
  const [message, setMessage] = useState("");

  const [feedbackData, setFeedbackData] = useState([]);
  const navigate = useNavigate();

  const [isCustomer, setIsCustomer] = useState(false);

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

  const isExistingFeedback = (requirementId) => {
    axios
      .get("http://localhost:8000/feedback/get")
      .then((res) => {
        setFeedbackData(res.data);
      })
      .catch((error) => console.log(error));
    const exists = feedbackData.filter(
      (item) => item.requirementId === requirementId
    );
    if (exists.length > 0) {
      return true;
    }
  };
  useEffect(() => {
    axios
      .get(url, raw)
      .then((response) => {
        if (user?.category === "customer") {
          setIsCustomer(true);
          setRequestReceived(
            response.data.filter((item) => item.sentBy === "provider")
          );
        } else {
          setRequestReceived(
            response.data.filter((item) => item.sentBy === "user")
          );
        }
      })
      .catch((error) => console.log(error));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const sendEmail = (e, request) => {
    e.preventDefault();
    const raw = {
      subject: "Provider's Details",
      userName: request?.userId?.name,
      to: request?.userId?.email,
      service:
        request?.requirementId?.service.charAt(0).toUpperCase() +
          request?.requirementId?.service.slice(1) ||
        request?.providerId?.service.charAt(0).toUpperCase() +
          request?.providerId?.service.slice(1),
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
  const handleSubmitFeedback = (e) => {
    e.preventDefault();
    if (!experience || !feedback || !message) {
      window.alert("please fill all the fields");
    } else {
      axios
        .post("http://localhost:8000/feedback/save", {
          providerId: providerId,
          userId: userId,
          requirementId: requirementId,
          experience: experience,
          feedback: feedback,
          message: message,
        })
        .then((res) => {
          setIsDone(true);
        })
        .catch((error) => console.log(error));
    }
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
          "List of connection requests you received"
        </h1>
        <div
          className="container"
          style={{
            marginTop: "50px",
            textAlign: "center",
          }}
        >
          {requestReceived.length === 0 ? (
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
                  {isCustomer ? (
                    <>
                      <th>Requirement Posted On</th>
                      <th>Required Experience</th>
                      <th>Provider's Name</th>
                      <th>Provider's Address</th>
                      <th>Provider's Experience</th>
                      <th>Provider's Availability</th>
                    </>
                  ) : (
                    <>
                      <th>Customer's Name</th>
                      <th>Customer's Address</th>
                    </>
                  )}
                  <th>"Wish to connect?"</th>
                  {isCustomer ? (
                    <th
                      style={{
                        borderWidth: "0px",
                        "--bs-table-bg": "none",
                        "--bs-table-striped-bg": "none",
                        border: "none",
                        boxShadow: "none",
                        borderBottomStyle: "hidden",
                        borderTopStyle: "hidden",
                      }}
                    ></th>
                  ) : (
                    ""
                  )}
                </tr>
              </thead>
              <tbody>
                {requestReceived === [] ? (
                  <h1>Loading</h1>
                ) : (
                  requestReceived.map((request, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      {isCustomer ? (
                        <>
                          <td>{request?.requirementId?.service}</td>
                          <td>
                            {moment(request?.requirementId?.createdAt).format(
                              "DD-MM-YYYY"
                            )}
                          </td>
                          <td>{request?.requirementId?.experience}</td>
                          <td>{request.providerId.name}</td>
                          <td>{request.providerId.address}</td>
                          <td>{request?.providerId?.experience}</td>
                          <td>
                            {request?.providerId?.availabilityTime || "-"}
                          </td>
                        </>
                      ) : (
                        <>
                          <td>{request?.providerId?.serviceProviding}</td>
                          <td>{request.userId?.name}</td>
                          <td>{request?.userId?.address}</td>
                        </>
                      )}
                      <td>
                        {request.status === "pending" ? (
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
                      {isCustomer &&
                      request.status === "accepted" &&
                      !isExistingFeedback(request?.requirementId?._id) ? (
                        <td
                          className="table-borderless"
                          style={{
                            borderWidth: "0px",
                            "--bs-table-bg": "none",
                            "--bs-table-striped-bg": "none",
                            border: "none",
                            boxShadow: "none",
                            borderBottomStyle: "hidden",
                            borderTopStyle: "hidden",
                            paddingLeft: "0px",
                          }}
                        >
                          <button
                            onClick={(e) =>
                              handleOpenFeedback(
                                request?.userId?._id,
                                request?.providerId?._id,
                                request?.requirementId?._id
                              )
                            }
                            style={{
                              background: "none",
                              border: "none",
                              color: "blue",
                              textDecoration: "underline",
                              fontSize: "14px",
                            }}
                          >
                            give feedback
                          </button>
                        </td>
                      ) : (
                        <th
                          style={{
                            borderWidth: "0px",
                            "--bs-table-bg": "none",
                            "--bs-table-striped-bg": "none",
                            border: "none",
                            boxShadow: "none",
                            borderBottomStyle: "hidden",
                            borderTopStyle: "hidden",
                          }}
                        ></th>
                      )}
                    </tr>
                  ))
                )}
              </tbody>
            </Table>
          )}
        </div>
      </div>
      <ConnectionRequestsSent />
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
              {isCustomer ? (
                <>
                  <h5>
                    Contact details of the provider will be sent to your e-mail
                    soon.
                  </h5>
                  <br />
                </>
              ) : (
                <>
                  <h5>
                    Your contact details will be shared with the user soon.
                  </h5>
                  <br />
                </>
              )}
              <h5>Thank you for your visit.</h5>
            </div>
            <div style={{ textAlign: "center", marginTop: "25px" }}>
              <button onClick={handleClose}>Close</button>
            </div>
          </Box>
        </Modal>
        <Modal
          open={openFeedback}
          onClose={handleCloseFeedback}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            {isDone ? (
              <div style={{ textAlign: "center" }}>
                <h4 style={{ marginTop: "10px" }}>
                  Thank you for your time. Your feedback is valuable to us.
                  <br />
                  <br />
                  Have a nice day.
                </h4>
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
                    onClick={() => navigate("/")}
                  >
                    close
                  </button>
                </div>
              </div>
            ) : (
              <>
                <div style={{ display: "flex", justifyContent: "center" }}>
                  <h5>Feedback</h5>
                  <button
                    onClick={handleCloseFeedback}
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
                <label>How was your experience?</label>
                <select
                  style={{
                    marginTop: "5px",
                    width: "100%",
                    height: "32px",
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
                  <option value="happy">Happy</option>
                  <option value="unhappy">Unhappy</option>
                </select>
                <label>
                  How would you describe the service of our provider?
                </label>
                <select
                  style={{
                    marginTop: "5px",
                    width: "100%",
                    height: "32px",
                    borderRadius: "5px",
                    padding: "0px 5px",
                    marginBottom: "10px",
                  }}
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                >
                  <option value="" hidden>
                    select
                  </option>
                  <option value="fantastic">Fantastic</option>
                  <option value="average">Average</option>
                  <option value="worst">Worst</option>
                </select>
                <label>Anything else you want to share?</label>
                <TextField
                  type="text"
                  style={{
                    width: "100%",
                    marginTop: "5px",
                    border: "1px solid black",
                    borderRadius: "5px",
                  }}
                  onChange={(e) => setMessage(e.target.value)}
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
                    onClick={handleSubmitFeedback}
                  >
                    Submit
                  </button>
                </div>
              </>
            )}
          </Box>
        </Modal>
      </div>
    </div>
  );
}

export default ConnectionRequests;
