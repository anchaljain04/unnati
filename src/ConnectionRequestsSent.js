import React, { useState, useEffect, useContext } from "react";
import moment from "moment";
import axios from "axios";
import { Table } from "react-bootstrap";
import AppContext from "./context/AppContext";

function ConnectionRequestsSent() {
  const [requestSent, setRequestSent] = useState([]);
  const userData = localStorage.getItem("Profile");
  const user = JSON.parse(userData);
  const myContext = useContext(AppContext);
  const data = myContext.isHindi ? myContext.dataHindi : myContext.dataEnglish;
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
    <div style={{ textAlign: "center" }}>
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
          {data?.connectionRequestSentTitle}
        </h2>
        <div
          className="container"
          style={{
            marginTop: "50px",
            textAlign: "center",
            color: "white",
          }}
        >
          {requestSent.length === 0 ? (
            <h2>{data?.notProviderData}</h2>
          ) : (
            <Table
              striped
              bordered
              hover
              style={{ width: "85%", margin: "auto" }}
            >
              <thead style={{ color: "#870A30" }}>
                <tr>
                  <th>S. No.</th>
                  <th>{data?.requirementOf}</th>
                  {isCustomer ? (
                    <>
                      <th>{data?.provider + " " + data?.name}</th>
                      <th>{data?.provider + " " + data?.address}</th>
                      <th>{data?.provider + " " + data?.experience}</th>
                    </>
                  ) : (
                    <>
                      <th>{data?.requirementPostedOn}</th>
                      <th>{data?.requiredExperience}</th>
                      <th>{data?.customer + " " + data?.name}</th>
                      <th>{data?.customer + " " + data?.address}</th>
                    </>
                  )}
                  <th>{data?.action}</th>
                </tr>
              </thead>
              <tbody>
                {requestSent === [] ? (
                  <h1>{data?.loading}</h1>
                ) : (
                  requestSent.map((request, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      {isCustomer ? (
                        <>
                          <td>
                            {
                              data?.[
                                request?.providerId?.serviceProviding +
                                  "Service"
                              ]
                            }
                          </td>
                          <td>{request.providerId.name}</td>
                          <td>{request.providerId.address}</td>
                          <td>{request?.providerId?.experience}</td>
                        </>
                      ) : (
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
