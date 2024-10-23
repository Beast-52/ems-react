import React, { useEffect } from "react";
import Header from "../others/Header";
import TaskOverview from "../others/TaskOverview";
import TaskPanel from "../others/AllTasks";

const UserDashboard = () => {

  
  return (
    <>
      <Header />
      <TaskOverview />
      <TaskPanel />
    </>
  );
};

export default UserDashboard;
