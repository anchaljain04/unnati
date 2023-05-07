import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import NavBar from "./NavBar";
import { Table } from "react-bootstrap";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import Tooltip from "@mui/material/Tooltip";
import AppContext from "./context/AppContext";

function Requirements() {
  const [requirements, setRequirements] = useState([]);
  const userData = localStorage.getItem("Profile");
  const user = JSON.parse(userData);

  const myContext = useContext(AppContext);
  const data = myContext.isHindi ? myContext.dataHindi : myContext.dataEnglish;
  let url;
  let raw;
  if (user.category === "customer") {
    url = `http://localhost:8000/user/get-requirements`;
  } else {
    url = `http://localhost:8000/provider/get-requirements`;
    raw = {
      params: { service: `${user.serviceProviding}` },
    };
  }

  const apiCall = () => {
    axios
      .get(url, raw)
      .then((res) => {
        axios
          .get("http://localhost:8000/provider/get-connection-requests", {
            params: { providerId: user?._id },
          })
          .then((response) => {
            const providerRequest = response.data.filter(
              (item) => item.sentBy === "provider"
            );
            const data = res.data.map((item) => {
              let firstAttempt = false;
              providerRequest.map((ele) => {
                if (
                  firstAttempt ||
                  (ele.requirementId._id === item._id &&
                    ele.providerId._id === user?._id)
                ) {
                  item.isRequestSent = true;
                  firstAttempt = true;
                  return item;
                } else {
                  item.isRequestSent = false;
                }
                return item;
              });
              return item;
            });
            setRequirements(data);
          })
          .catch((error) => console.log(error));
      })
      .catch((error) => console.log(error));
  };
  useEffect(() => {
    apiCall();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleConnectClick = (e, requirement) => {
    e.preventDefault();
    const raw = {
      subject: "Connection Request",
      userName: requirement?.name,
      text: "Someone has sent you a connection request",
      to: requirement?.email,
      service:
        user.serviceProviding.charAt(0).toUpperCase() +
        user.serviceProviding.slice(1),
      providerId: user?._id,
      requirementId: requirement?._id,
      userId: requirement?.userId,
    };
    window.alert(data?.connectionRequestSentSuccess);
    apiCall();
    axios
      .post("http://localhost:8000/user/send-email", raw)
      .then((res) => {
        console.log(res);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div>
      <div
        style={{
          textAlign: "center",
          backgroundImage: 'url("/images/bg4.png")',
          height: "100vh",
        }}
      >
        <NavBar />
        <h1
          style={{
            marginTop: "90px",
            fontFamily: "Roboto Slab, serif",
            fontStyle: "italic",
            color: "white",
          }}
        >
          {data?.requirementsTitle}
        </h1>
        <div
          className="container"
          style={{
            marginTop: "50px",
            textAlign: "center",
          }}
        >
          {requirements.length === 0 ? (
            <h2>{data?.notProviderData}</h2>
          ) : (
            <Table bordered hover style={{ width: "85%", margin: "auto" }}>
              <thead style={{ background: "#330033", color: "white" }}>
                <tr>
                  <th>#</th>
                  <th>{data?.fullName}</th>
                  <th>{data?.email}</th>
                  <th>{data?.address}</th>
                  <th>{data?.serviceRequired}</th>
                  <th>{data?.requiredExperience}</th>
                  <th>{data?.preferredTime}</th>
                  <th>{data?.action}</th>
                </tr>
              </thead>
              <tbody style={{ background: "#990099", color: "white" }}>
                {requirements === [] ? (
                  <h1>{data?.loading}</h1>
                ) : (
                  requirements.map((requirement, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{requirement.name}</td>
                      <td>{requirement.email}</td>
                      <td>{requirement.address}</td>
                      <td>{data?.[requirement.service + "Service"]}</td>
                      <td>{requirement.experience}</td>
                      <td>
                        {requirement?.availabilityTime
                          ? requirement?.availabilityTime
                          : "-"}
                      </td>
                      {/* {console.log(requirement.name, requirement.isRequestSent)} */}
                      <td>
                        {requirement?.isRequestSent ? (
                          "Sent"
                        ) : (
                          <>
                            <Tooltip
                              title={
                                <span
                                  style={{
                                    fontSize: "14px",
                                  }}
                                >
                                  {data?.connect}
                                </span>
                              }
                              placement="right"
                            >
                              <button
                                onClick={(e) =>
                                  handleConnectClick(e, requirement)
                                }
                                style={{ background: "none", border: "none" }}
                              >
                                <PersonAddAltIcon style={{ color: "white" }} />
                              </button>
                            </Tooltip>
                          </>
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
    </div>
  );
}

export default Requirements;
