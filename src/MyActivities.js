import React, { useState, useEffect } from "react";
import NavBar from "./NavBar";
import axios from "axios";
import moment from "moment";
import { Table } from "react-bootstrap";

function MyActivities() {
  const userData = localStorage.getItem("Profile");
  const user = JSON.parse(userData);
  const [requirementData, setRequirementData] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:8000/user/get-requirements", {
        params: {
          email: user.email,
        },
      })
      .then((res) => {
        setRequirementData(res.data);
      })
      .catch((error) => console.log(error));
  }, [user.email]);

  const handleDelete = (e, requirement) => {
    axios
      .delete("http://localhost:8000/user/delete-requirement", {
        params: {
          requirementId: requirement?._id,
        },
      })
      .then((res) => {
        window.location.reload(true);
      })
      .catch((error) => console.log(error));
  };
  return (
    <div style={{ textAlign: "center", background: "pink", height: "100vh" }}>
      <NavBar />
      <h2
        style={{
          marginTop: "70px",
          fontFamily: "Roboto Slab, serif",
          fontStyle: "italic",
        }}
      >
        Requirements posted:
      </h2>
      <div
        style={{
          marginTop: "50px",
          textAlign: "center",
        }}
      >
        {requirementData.length === 0 ? (
          <>
            <h2>You haven't posted any requirement yet</h2>
          </>
        ) : (
          <>
            <Table
              striped
              bordered
              hover
              variant="dark"
              style={{ width: "75%", margin: "auto" }}
            >
              <thead>
                <tr>
                  <th>#</th>
                  <th>Service required</th>
                  <th>Experience required</th>
                  <th>Address</th>
                  <th>Date of posting</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {requirementData === [] ? (
                  <h1>Loading</h1>
                ) : (
                  requirementData.map((requirement, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{requirement.service}</td>
                      <td>{requirement.experience}</td>
                      <td>{requirement.address}</td>
                      <td>
                        {moment(requirement.createdAt).format("DD-MM-YYYY")}
                      </td>
                      <td>
                        <button onClick={(e) => handleDelete(e, requirement)}>
                          delete
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </Table>
          </>
        )}
      </div>
    </div>
  );
}

export default MyActivities;
