import React, { useState, useEffect, useContext } from "react";
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
import AppContext from "./context/AppContext";
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

function ConnectionRequests() {
  const [requestReceived, setRequestReceived] = useState([]);
  const userData = localStorage.getItem("Profile");
  const user = JSON.parse(userData);
  const myContext = useContext(AppContext);
  const data = myContext.isHindi ? myContext.dataHindi : myContext.dataEnglish;
  const [optionValue, setOptionValue] = useState("");

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    navigate("/");
  };
  const handleOptionChange = (e, value) => {
    setExperience(e.target.value);
    setOptionValue(e.target.value);
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

  const navigate = useNavigate();

  const [isCustomer, setIsCustomer] = useState(false);

  let url;
  let raw;
  if (user.category === "customer") {
    url = "https://lucky-bear-hospital-gown.cyclic.app/user/get-connection-requests";
    raw = {
      params: { userId: user?._id },
    };
  } else {
    url = "https://lucky-bear-hospital-gown.cyclic.app/provider/get-connection-requests";
    raw = {
      params: { providerId: user?._id },
    };
  }

  const apiCall = () => {
    axios
      .get(url, raw)
      .then((response) => {
        if (user?.category === "customer") {
          setIsCustomer(true);
          axios
            .get("https://lucky-bear-hospital-gown.cyclic.app/feedback/get")
            .then((res) => {
              const updatedRequests = filteredReq.map((item) => {
                let firstAttempt = false;
                res.data.map((ele) => {
                  if (
                    firstAttempt ||
                    ele.requirementId === item?.requirementId?._id
                  ) {
                    item.feedBackSent = true;
                    firstAttempt = true;
                    return item;
                  } else {
                    item.feedBackSent = false;
                  }
                  return item;
                });
                return item;
              });
              setRequestReceived(updatedRequests);
            })
            .catch((error) => console.log(error));
          const filteredReq = response.data.filter(
            (item) => item.sentBy === "provider"
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
      .post("https://lucky-bear-hospital-gown.cyclic.app/user/send-email", raw)
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
      window.alert(data?.fillAllFields);
    } else {
      axios
        .post("https://lucky-bear-hospital-gown.cyclic.app/feedback/save", {
          providerId: providerId,
          userId: userId,
          requirementId: requirementId,
          experience: experience,
          feedback: feedback,
          message: message,
        })
        .then((res) => {
          console.log("====",res);
          setIsDone(true);
        })
        .catch((error) => console.log(error));
    }
  };
  console.log(isDone);
  const handleAccept = (e, request) => {
    e.preventDefault();
    axios
      .get("https://lucky-bear-hospital-gown.cyclic.app/user/update-connection-requests", {
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
      .get("https://lucky-bear-hospital-gown.cyclic.app/user/update-connection-requests", {
        params: { id: request?._id, status: "rejected" },
      })
      .then((response) => {
        if (response.status === 200) {
          apiCall();
          window.alert(data?.connectionRequestReject);
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
      <NavBar />
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
          {data?.connectionRequestTitle}
        </h2>
        <div
          className="container"
          style={{
            marginTop: "50px",
            textAlign: "center",
          }}
        >
          {requestReceived.length === 0 ? (
            <h2 style={{ color: "white" }}>{data?.notProviderData}</h2>
          ) : (
            <Table bordered hover style={{ width: "90%", margin: "auto" }}>
              <thead style={{ background: "#330033", color: "white" }}>
                <tr>
                  <th>S. No.</th>
                  <th>{data?.requirementOf}</th>
                  {isCustomer ? (
                    <>
                      <th>{data?.requirementPostedOn}</th>
                      <th>{data?.requiredExperience}</th>
                      <th>{data?.provider + " " + data?.name}</th>
                      <th>{data?.provider + " " + data?.address}</th>
                      <th>{data?.provider + " " + data?.experience}</th>
                      <th>{data?.provider + " " + data?.availability}</th>
                      <th>{data?.provider + " " + data?.rating}</th>
                    </>
                  ) : (
                    <>
                      <th>Customer's Name</th>
                      <th>Customer's Address</th>
                    </>
                  )}
                  <th>{data?.wishToConnect}</th>
                  {isCustomer ? <th>{data?.feedbackStatus}</th> : ""}
                </tr>
              </thead>
              <tbody style={{ background: "#990099", color: "white" }}>
                {requestReceived === [] ? (
                  <h1>{data?.loading}</h1>
                ) : (
                  requestReceived.map((request, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      {isCustomer ? (
                        <>
                          <td>
                            {
                              data?.[
                                request?.requirementId?.service + "Service"
                              ]
                            }
                          </td>
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
                          <td>
                            {request?.providerId?.rating
                              ? request?.providerId?.rating + "/" + 5
                              : "-"}
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
                                    {data?.accept}
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
                                    {data?.reject}
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
                      !request.feedBackSent ? (
                        <td className="table-borderless">
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
                              color: "darkturquoise",
                              textDecoration: "underline",
                              fontSize: "14px",
                            }}
                          >
                            {data?.giveFeedback}
                          </button>
                        </td>
                      ) : (
                        <th>
                          {request.status === "accepted" && request.feedBackSent
                            ? "Feedback Sent"
                            : "-"}
                        </th>
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
        <ConnectionRequestsSent />
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
              <h4>{data?.sentRequestSuccess[0]}</h4>
              <br />
              {isCustomer ? (
                <>
                  <h5>{data?.sentRequestSuccess[1]}</h5>
                  <br />
                </>
              ) : (
                <>
                  <h5>Y{data?.sentRequestSuccess[2]}</h5>
                  <br />
                </>
              )}
              <h5>{data?.sentRequestSuccess[3]}</h5>
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
                {data?.close}
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
                  {data?.feedbackSuccess[0]}
                  <br />
                  <br />
                  {data?.feedbackSuccess[1]}
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
                    {data?.close}
                  </button>
                </div>
              </div>
            ) : (
              <>
                <div style={{ display: "flex", justifyContent: "center" }}>
                  <h5>{data?.feedback}</h5>
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
                <div>
                  <label
                    style={{ fontWeight: "500", textShadow: "1px 1px white" }}
                  >
                    {data?.feedbackQuestions[0]}
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
                    onChange={(e) => {
                      handleOptionChange(e, e.target.value);
                    }}
                  >
                    <option value="" hidden>
                      {data?.select}
                    </option>

                    <option value="veryHappy">Very Happy</option>
                    <option value="happy">Happy</option>
                    <option value="average">Average</option>
                    <option value="unhappy">Unhappy</option>
                    <option value="veryUnhappy">Very Unhappy</option>
                  </select>
                </div>

                {/* {optionValue === "veryHappy" ? ( */}
                <>
                  <label
                    style={{
                      fontWeight: "500",
                      textShadow: "1px 1px white",
                    }}
                  >
                    {data?.feedbackQuestions[1]}
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
                      {data?.select}
                    </option>
                    {optionValue === "veryHappy" ? (
                      <>
                        <option value="remarkable">Remarkable</option>
                        <option value="stunning">Stunning</option>
                        <option value="tremendous">Tremendous</option>
                        <option value="amazing">Amazing</option>
                      </>
                    ) : optionValue === "happy" ? (
                      <>
                        <option value="satisfied">Satisfied</option>
                        <option value="fantastic">Fantastic</option>
                        <option value="grateful">Grateful</option>
                        <option value="pleased">Pleased</option>
                      </>
                    ) : optionValue === "average" ? (
                      <>
                        <option value="nice">Nice</option>
                        <option value="fine">Fine</option>
                        <option value="glad">Glad</option>
                      </>
                    ) : optionValue === "unhappy" ? (
                      <>
                        <option value="unsatisfied">Unsatisfied</option>
                        <option value="bad">Bad</option>
                        <option value="poor">Poor</option>
                        <option value="annoying">Annoying</option>
                      </>
                    ) : optionValue === "veryUnhappy" ? (
                      <>
                        <option value="terrified">Terrible</option>
                        <option value="notGood">Not Good</option>
                        <option value="disappointed">Disappointed</option>
                        <option value="veryPoor">Very Poor</option>
                      </>
                    ) : (
                      ""
                    )}
                  </select>
                </>
                {/* ) : optionValue ==='happy' ? (
                  ""
                )} */}
                <label
                  style={{ fontWeight: "500", textShadow: "1px 1px white" }}
                >
                  {data?.feedbackQuestions[2]}
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
                    {data?.submit}
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
