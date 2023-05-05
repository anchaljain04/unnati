import React, { useEffect, useState } from "react";
import axios from "axios";
import NavBar from "./NavBar";
import { Table } from "react-bootstrap";

function Requirements() {
  const [requirements, setRequirements] = useState([]);
  const [isRequestSent, setIsRequestSent] = useState(false);
  const userData = localStorage.getItem("Profile");
  const user = JSON.parse(userData);
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
  useEffect(() => {
    axios
      .get(url, raw)
      .then((response) => {
        setRequirements(response.data);
      })
      .catch((error) => console.log(error));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const checkRequestSent = (requirement) => {
    axios
      .get("http://localhost:8000/provider/is-request-sent", {
        params: { requirementId: requirement?._id, providerId: user?._id },
      })
      .then((response) => {
        setIsRequestSent(response.data);
      })
      .catch((error) => console.log(error));
  };
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
      <div style={{ textAlign: "center", backgroundImage: 'url("/images/back3.jpg")', height: "100vh" }}>
        <NavBar />
        <h1
          style={{
            marginTop: "90px",
            fontFamily: "Roboto Slab, serif",
            fontStyle: "italic",
            color: "white",
          }}
        >
          List of customer requirements
        </h1>
        <div
          className="container"
          style={{
            marginTop: "50px",
            textAlign: "center",
          }}
        >
          {requirements.length === 0 ? (
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
                  <th>#</th>
                  <th>Full Name</th>
                  <th>Email</th>
                  <th>Phone number</th>
                  <th>Address</th>
                  <th>Service Required</th>
                  <th>Experience Required</th>
                  <th>Preferred Time</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {requirements === [] ? (
                  <h1>Loading</h1>
                ) : (
                  requirements.map((requirement, index) => (
                    <>
                      <div>{checkRequestSent(requirement)}</div>
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{requirement.name}</td>
                        <td>{requirement.email}</td>
                        <td>{requirement.mobile}</td>
                        <td>{requirement.address}</td>
                        <td>{requirement.service}</td>
                        <td>{requirement.experience}</td>
                        <td>
                          {requirement?.availabilityTime
                            ? requirement?.availabilityTime
                            : "-"}
                        </td>
                        <td>
                          {isRequestSent ? (
                            "Sent"
                          ) : (
                            <>
                              <button
                                onClick={(e) =>
                                  handleConnectClick(e, requirement)
                                }
                              >
                                Connect
                              </button>
                            </>
                          )}
                        </td>
                      </tr>
                    </>
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
