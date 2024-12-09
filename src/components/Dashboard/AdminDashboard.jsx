import React from "react";
import Header from "../others/Header";
import CreateTask from "../others/CreateTask";
import EmployeeTable from "../others/EmployeeTable";
import { Outlet, useLocation } from "react-router-dom";

const AdminDashboard = () => {
  document.title = 'EMS - Admin'
  const { pathname } = useLocation();
  return (
    <>
      <Header />

      {pathname.includes("employee") ? <Outlet /> : <CreateTask />}
      <EmployeeTable />
    </>
  );
};

export default AdminDashboard;
