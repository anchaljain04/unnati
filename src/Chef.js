import React, { Component } from 'react'
import NaviBar from './NaviBar'
import { Table } from 'react-bootstrap'

export default class Chef extends Component {
  render() {
    return (
      <div>
        <NaviBar/>
        <br/>
        <div
          style={{
            marginLeft: "250px",
            marginRight: "250px",
            marginTop: "100px",
          }}
        >
          <Table striped bordered hover variant="dark">
            <thead>
              <tr>
                <th>#</th>
                <th>Full Name</th>
                <th>Phone number</th>
                <th>Experience</th>
                <th>Availability</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td>Mark Otto</td>
                <td>9856741235</td>
                <td>2 yrs</td>
                <td>Yes</td>
              </tr>
              <tr>
                <td>2</td>
                <td>Jacob Thorn</td>
                <td>5623897412</td>
                <td>4 yrs</td>
                <td>No</td>
              </tr>
              <tr>
                <td>3</td>
                <td>Larry Bhaskar</td>
                <td>8956232547</td>
                <td>8 yrs</td>
                <td>Yes</td>
              </tr>
            </tbody>
          </Table>
        </div>
      </div>
    )
  }
}
