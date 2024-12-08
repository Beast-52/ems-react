import React, { useEffect } from "react";
import Header from "../others/Header";
import TaskOverview from "../others/TaskOverview";
import TaskPanel from "../others/AllTasks";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const UserDashboard = () => {
  const { id } = useParams(); // This will give you the dynamic parameter

  // Now you can use the `id` in your component, for example to fetch data
  console.log(id); // Should log 5 for the URL `http://localhost:5173/employee/5`

  return (
    <>
      <Header />
      <TaskOverview />
      <TaskPanel />
    </>
  );
};

export default UserDashboard;
