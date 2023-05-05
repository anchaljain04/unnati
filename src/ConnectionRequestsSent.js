import React, { useState, useEffect } from "react";
import moment from "moment";
import axios from "axios";
import { Table } from "react-bootstrap";

function ConnectionRequestsSent() {
  const [requestSent, setRequestSent] = useState([]);
  const userData = localStorage.getItem("Profile");
  const user = JSON.parse(userData);

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

  useEffect(() => {
    axios
      .get(url, raw)
      .then((response) => {
        if (user?.category === "customer") {
          setIsCustomer(true);
          const data = response.data.filter((item) => item.sentBy === "user");
          setRequestSent(data);
        } else {
          const data = response.data.filter(
            (item) => item.sentBy === "provider"
          );
          setRequestSent(data);
        }
      })
      .catch((error) => console.log(error));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div style={{ textAlign: "center",
        }}>
      <div>
        <h1
          style={{
            marginTop: "80px",
            fontFamily: "Roboto Slab, serif",
            fontStyle: "italic",
            color: "white"
          }}
        >
          "List of connection requests you have sent"
        </h1>
        <div
          className="container"
          style={{
            marginTop: "50px",
            textAlign: "center",
            color:"white"
          }}
        >
          {requestSent.length === 0 ? (
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
                      <th>Provider's Name</th>
                      <th>Provider's Address</th>
                      <th>Provider's Experience</th>
                    </>
                  ) : (
                    <>
                      <th>Requirement Posted On</th>
                      <th>Required Experience</th>
                      <th>Customer's Name</th>
                      <th>Customer's Address</th>
                    </>
                  )}
                  <th>Action taken</th>
                </tr>
              </thead>
              <tbody>
                {requestSent === [] ? (
                  <h1>Loading</h1>
                ) : (
                  requestSent.map((request, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      {isCustomer ? (
                        <>
                          <td>{request?.providerId?.serviceProviding}</td>
                          <td>{request.providerId.name}</td>
                          <td>{request.providerId.address}</td>
                          <td>{request?.providerId?.experience}</td>
                        </>
                      ) : (
                        <>
                          <td>{request?.requirementId?.service}</td>
                          <td>
                            {moment(request?.requirementId?.createdAt).format(
                              "DD-MM-YYYY"
                            )}
                          </td>
                          <td>{request?.requirementId?.experience}</td>
                          <td>{request.userId?.name}</td>
                          <td>{request?.userId?.address}</td>
                        </>
                      )}
                      <td>{request.status}</td>
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

export default ConnectionRequestsSent;
