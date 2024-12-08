import React from "react";
import Header from "../others/Header";
import CreateTask from "../others/CreateTask";
import EmployeeTable from "../others/EmployeeTable";

const AdminDashboard = () => {
  return (
    <>
      <Header />
      <CreateTask />
      <EmployeeTable />
    </>
  );
};

export default AdminDashboard;
