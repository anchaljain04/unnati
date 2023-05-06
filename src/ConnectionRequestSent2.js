import React, { useState, useEffect } from "react";
import moment from "moment";
import axios from "axios";
import { Table } from "react-bootstrap";
import NavBar2 from "./NavBar2";

function ConnectionRequestSent2() {
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
          "आपके द्वारा भेजे गए कनेक्शन अनुरोधों की सूची"
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
                  <th>क्र.सं.</th>
                  <th>आवश्यकता</th>
                  {isCustomer ? (
                    <>
                      <th>प्रदाता का नाम</th>
                      <th>प्रदाता का पता</th>
                      <th>प्रदाता का अनुभव</th>
                    </>
                  ) : (
                    <>
                      <th>आवश्यकता पर पोस्ट किया गया</th>
                      <th>आवश्यक अनुभव</th>
                      <th>ग्राहक का नाम</th>
                      <th>ग्राहक का पता</th>
                    </>
                  )}
                  <th>कार्रवाई की</th>
                </tr>
              </thead>
              <tbody>
                {requestSent === [] ? (
                  <h1>लोड हो रहा है</h1>
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

export default ConnectionRequestSent2;
