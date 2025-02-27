import React, { useState, useEffect } from "react";
import axios from "axios";
import Layout from "../components/Layout";
import moment from "moment";
import { Table, message } from "antd";

const Appointments = () => {
  const [appointments, setAppointments] = useState([]);
  
  const getAppointments = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/v1/user/user-appointments", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      // Debugging: Log the response data
      console.log(res.data); // This will help you see the structure of the response

      if (res.data.success) {
        setAppointments(res.data.data);
      } else {
        message.error("Failed to fetch appointments.");
      }
    } catch (error) {
      console.log(error);
      message.error("Something went wrong. Please try again later.");
    }
  };

  useEffect(() => {
    getAppointments();
  }, []);

  const columns = [
    {
      title: "ID",
      dataIndex: "_id",
    },
    {
      title: "Date & Time",
      dataIndex: "date",
      render: (text, record) => (
        <span>
          {moment(record.date).isValid()
            ? moment(record.date).format("DD-MM-YYYY")
            : "Invalid Date"}{" "}
          {moment(record.time).isValid()
            ? moment(record.time).format("HH:mm")
            : "Invalid Time"}
        </span>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
    },
  ];

  return (
    <Layout>
      <h1>Appointments List</h1>
      {appointments.length === 0 ? (
        <p>No appointments available.</p>
      ) : (
        <Table columns={columns} dataSource={appointments} rowKey="_id" />
      )}
    </Layout>
  );
};

export default Appointments;
