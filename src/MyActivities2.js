import React, { useState, useEffect } from "react";
import NavBar2 from "./NavBar2";
import axios from "axios";
import moment from "moment";
import { Table } from "react-bootstrap";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import Tooltip from "@mui/material/Tooltip";

function MyActivities2() {
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
        if (res.status === 200) {
          const updatedData = requirementData.filter(
            (item) => item?._id !== requirement?._id
          );
          setRequirementData(updatedData);
        }
      })
      .catch((error) => console.log(error));
  };
  return (
    <div
      style={{
        textAlign: "center",
        backgroundImage: 'url("/images/bg4.png")',
        height: "100vh",
      }}
    >
      <NavBar2 />
      <h2
        style={{
          marginTop: "50px",
          fontFamily: "Roboto Slab, serif",
          fontStyle: "italic",
          color: "white",
          textShadow: "1px 1px black",
        }}
      >
        आवश्यकताएं पोस्ट की गईं:
      </h2>
      <div
        style={{
          marginTop: "50px",
          textAlign: "center",
        }}
      >
        {requirementData.length === 0 ? (
          <>
            <h2
              style={{
                color: "white",
              }}
            >
              आपने अभी तक कोई आवश्यकता पोस्ट नहीं की है|
            </h2>
          </>
        ) : (
          <>
            <Table
              striped
              bordered
              hover
              variant="dark"
              style={{ width: "55%", margin: "auto" }}
            >
              <thead>
                <tr>
                  <th style={{width:"5px"}}>#</th>
                  <th style={{width:"10px"}}>आवश्यकता</th>
                  <th style={{width:"10px"}}>अनुभव जरूरी</th>
                  <th style={{width:"30px"}}>पता</th>
                  <th style={{width:"10px"}}>पोस्टिंग की तारीख</th>
                  <th style={{width:"10px"}}>कार्य</th>
                </tr>
              </thead>
              <tbody>
                {requirementData === [] ? (
                  <h1>लोड हो रहा है</h1>
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
                        <Tooltip
                          title={
                            <span
                              style={{
                                fontSize: "14px",
                              }}
                            >
                              मिटाना
                            </span>
                          }
                          placement="right"
                        >
                          <button
                            onClick={(e) => handleDelete(e, requirement)}
                            style={{ background: "none", border: "none" }}
                          >
                            <DeleteOutlineIcon style={{ color: "white" }} />
                          </button>
                        </Tooltip>
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

export default MyActivities2;
