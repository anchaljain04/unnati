import React, { useState, useEffect } from "react";
import moment from "moment";
import axios from "axios";
import NavBar2 from "./NavBar2";
import { Table } from "react-bootstrap";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { useNavigate } from "react-router-dom";
import { TextField } from "@mui/material";
import ConnectionRequestSent2 from "./ConnectionRequestSent2";
import Tooltip from "@mui/material/Tooltip";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 440,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  py: 2,
  px: 3,
};

function ConnectionRequest2() {
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

  const apiCall = () => {
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
  };
  useEffect(() => {
    apiCall();
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
          apiCall();
          window.alert("Connection request rejected!");
        }
      })
      .catch((error) => console.log(error));
  };
  return (
    <div
      style={{
        textAlign: "center",
        backgroundImage: 'url("/images/bg4.png")',
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        minHeight: "100vh",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
        paddingBottom: "20px",
      }}
    >
      <NavBar2/>
      <div>
        <h2
          style={{
            marginTop: "50px",
            fontFamily: "Roboto Slab, serif",
            fontStyle: "italic",
            color: "white",
            textShadow: "1px 1px black",
          }}
        >
          "आपको प्राप्त कनेक्शन अनुरोधों की सूची"
        </h2>
        <div
          className="container"
          style={{
            marginTop: "50px",
            textAlign: "center",
          }}
        >
          {requestReceived.length === 0 ? (
            <h2 style={{ color: "white" }}>फिलहाल कोई डेटा उपलब्ध नहीं है!</h2>
          ) : (
            <Table
              striped
              bordered
              hover
              variant="dark"
              style={{ width: "90%", margin: "auto" }}
            >
              <thead>
                <tr>
                  <th >क्र.सं.</th>
                  <th >आवश्यकता</th>
                  {isCustomer ? (
                    <>
                      <th >पोस्ट करने की तारिक</th>
                      <th >आवश्यक अनुभव</th>
                      <th >प्रदाता का नाम</th>
                      <th >प्रदाता का पता</th>
                      <th >प्रदाता अनुभव</th>
                      <th >प्रदाता की उपलब्धता</th>
                    </>
                  ) : (
                    <>
                      <th>ग्राहक का नाम</th>
                      <th>ग्राहक का पता</th>
                    </>
                  )}
                  <th >"कनेक्ट करना चाहते हैं ?"</th>
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
                  <h1>लोड हो रहा है</h1>
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
                              <Tooltip
                                title={
                                  <span
                                    style={{
                                      fontSize: "14px",
                                    }}
                                  >
                                    स्वीकार
                                  </span>
                                }
                                placement="right"
                              >
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
                              </Tooltip>

                              <Tooltip
                                title={
                                  <span
                                    style={{
                                      fontSize: "14px",
                                    }}
                                  >
                                    अस्वीकार
                                  </span>
                                }
                                placement="right"
                              >
                                <button
                                  style={{
                                    borderRadius: "50%",
                                    padding: "0px 4px",
                                    paddingBottom: "2px",
                                    color: "white",
                                    background: "red",
                                    border: "none",
                                  }}
                                  onClick={(e) => handleReject(e, request)}
                                >
                                  <CloseIcon style={{ fontSize: "18px" }} />
                                </button>
                              </Tooltip>
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
                              color: "deepskyblue",
                              textDecoration: "underline",
                              fontSize: "14px",
                            }}
                          >
                           प्रतिक्रिया दें
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
      <div style={{ marginBottom: "50px" }}>
        <ConnectionRequestSent2 />
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
              <h4>आपने अनुरोध को सफलतापूर्वक स्वीकार कर लिया है|</h4>
              <br />
              {isCustomer ? (
                <>
                  <h5>
                  प्रदाता का संपर्क विवरण जल्द ही आपके ई-मेल पर भेज दिया जाएगा।

                  </h5>
                  <br />
                </>
              ) : (
                <>
                  <h5>
                  आपका संपर्क विवरण जल्द ही उपयोगकर्ता के साथ साझा किया जाएगा।

                  </h5>
                  <br />
                </>
              )}
              <h5>आपकी विज़िट के लिए धन्यवाद।</h5>
            </div>
            <div style={{ textAlign: "center", marginTop: "25px" }}>
              <button
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  border: "2px solid var(--primary-color)",
                  borderRadius: "6px",
                  padding: "8px 15px",
                  marginLeft: "8px",
                }}
                onClick={handleClose}
              >
                बंद 

              </button>
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
                <h4 style={{ marginTop: "10px", textShadow: "1px 1px white" }}>
                अपना समय देने के लिए धन्यवाद। आपकी प्रतिक्रिया हमारे लिए बहुमूल्य है।

                  <br />
                  <br />
                  आपका दिन शुभ हो।

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
                      padding: "8px 16px",
                      border: "1px solid var(--primary-color)",
                    }}
                    onClick={() => navigate("/")}
                  >
                    
                    बंद
                    
                  </button>
                </div>
              </div>
            ) : (
              <>
                <div style={{ display: "flex", justifyContent: "center" }}>
                  <h5>प्रतिक्रिया</h5>
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
                <label
                  style={{ fontWeight: "500", textShadow: "1px 1px white" }}
                >
                  आपका अनुभव कैसा रहा?
                </label>
                <select
                  style={{
                    marginTop: "5px",
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
                  चुनना

                  </option>
                  <option value="happy">Happy</option>
                  <option value="unhappy">Unhappy</option>
                </select>
                <label
                  style={{ fontWeight: "500", textShadow: "1px 1px white" }}
                >
                  आप हमारे प्रदाता की सेवा का वर्णन कैसे करेंगे?

                </label>
                <select
                  style={{
                    marginTop: "5px",
                    width: "100%",
                    height: "32px",
                    border: "2px solid var(--primary-color)",
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
                <label
                  style={{ fontWeight: "500", textShadow: "1px 1px white" }}
                >
                  आप और कुछ साझा करना चाहते हैं?

                </label>
                <TextField
                  type="text"
                  style={{
                    width: "100%",
                    marginTop: "5px",
                    border: "2px solid var(--primary-color)",
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
                      border: "2px solid var(--primary-color)",
                    }}
                    onClick={handleSubmitFeedback}
                  >
                    जमा
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

export default ConnectionRequest2;
