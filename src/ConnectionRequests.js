import React, { useState, useEffect } from "react";
import moment from "moment";
import axios from "axios";
import NavBar from "./NavBar";
import { Table } from "react-bootstrap";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";

function ConnectionRequests() {
  const [requests, setRequests] = useState([]);
  const userData = localStorage.getItem("Profile");
  const user = JSON.parse(userData);

  useEffect(() => {
    axios
      .get("http://localhost:8000/user/get-connection-requests", {
        params: { userId: user?._id },
      })
      .then((response) => {
        setRequests(response.data);
      })
      .catch((error) => console.log(error));
  }, [user?._id]);

  return (
    <div style={{ textAlign: "center", background: "pink", height: "100vh" }}>
      <NavBar />
      <h1
        style={{
          marginTop: "80px",
          fontFamily: "Roboto Slab, serif",
          fontStyle: "italic",
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
                <th>#</th>
                <th>Service Required</th>
                <th>Requirement Posted On</th>
                <th>Provider's Name</th>
                <th>Provider's Address</th>
                <th>Provider's Experience</th>
                <th>Action</th>
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
                    <td>{request.providerId.name}</td>
                    <td>{request.providerId.address}</td>
                    <td>{request.providerId.experience}</td>
                    <td>
                      <div>
                        <button>
                          <CheckIcon />
                        </button>
                        <button>
                          <CloseIcon />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </Table>
        )}
      </div>
    </div>
  );
}

export default ConnectionRequests;
