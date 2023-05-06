import React, { useEffect, useState } from "react";
import axios from "axios";
import NavBar2 from "./NavBar2";
import { Table } from "react-bootstrap";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import Tooltip from "@mui/material/Tooltip";

function Requirements2() {
  const [requirements, setRequirements] = useState([]);
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
        <NavBar2 />
        <h1
          style={{
            marginTop: "90px",
            fontFamily: "Roboto Slab, serif",
            fontStyle: "italic",
            color: "white",
          }}
        >
          ग्राहकों की आवश्यकताओं की सूचीs
        </h1>
        <div
          className="container"
          style={{
            marginTop: "50px",
            textAlign: "center",
          }}
        >
          {requirements.length === 0 ? (
            <h2>फिलहाल कोई डेटा उपलब्ध नहीं है!</h2>
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
                  <th>पूरा नाम</th>
                  <th>ईमेल</th>
                  <th>पता</th>
                  <th>सेवा की आवश्यकता</th>
                  <th>अनुभव जरूरी</th>
                  <th>पसंदीदा समय</th>
                  <th>कार्य</th>
                </tr>
              </thead>
              <tbody>
                {requirements === [] ? (
                  <h1>लोड हो रहा है</h1>
                ) : (
                  requirements.map((requirement, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{requirement.name}</td>
                      <td>{requirement.email}</td>
                      <td>{requirement.address}</td>
                      <td>{requirement.service}</td>
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
                                  जोड़ना
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

export default Requirements2;
