import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const EmployeeTable = () => {
  const usersData = useSelector((state) => state.auth.usersData);
  const taskData = useSelector((state) => state.tasks.tasks);

  const [taskOverview, setTaskOverview] = useState([]);

  // Helper function to get task summary
  const getTaskOverview = () => {
    if (!usersData || !taskData) return; // Early exit if data is not available
    
    const taskSummary = usersData.map((user) => {
      // Find the tasks assigned to the user
      const userTasks = taskData.filter((item) => item.userId === user.userId)?.[0]?.tasks || [];  // Filter to get tasks for the user or default to empty array
       
      const summary = {
        name: user.name,
        totalCount: userTasks.length,
        activeCount: 0,
        completedCount: 0,
        failedCount: 0,
        newTasksCount: 0,
        userId: user.userId, // Store the userId for navigation
      };

      // Iterate through the user's tasks to get counts
      userTasks.forEach((task) => {
        if (task.active) summary.activeCount++;
        if (task.completed) summary.completedCount++;
        if (task.failed) summary.failedCount++;
        if (task.newTask) summary.newTasksCount++;
      });

      return summary;
    });

    setTaskOverview(taskSummary);
  };

  useEffect(() => {
    // Call getTaskOverview whenever the user or task data changes
    getTaskOverview();
  }, [usersData, taskData]); // Add taskData as a dependency

  // Handle loading state
  if (!usersData || !taskData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="mt-5 w-full h-[20vh] relative">
      <table className="text-white border-separate relative mx-10 w-[96%] border-spacing-y-4 text-3xl">
        <thead className="bg-gray-700 sticky top-0 left-0">
          <tr>
            <th className="border-b border-gray-700 py-3 px-4 text-left">
              Employee Name
            </th>
            <th className="border-b border-gray-700 py-3 px-4 text-left">
              Total
            </th>
            <th className="border-b border-gray-700 py-3 px-4 text-left">
              New Task
            </th>
            <th className="border-b border-gray-700 py-3 px-4 text-left">
              Active Task
            </th>
            <th className="border-b border-gray-700 py-3 px-4 text-left">
              Completed
            </th>
            <th className="border-b border-gray-700 py-3 px-4 text-left">
              Failed
            </th>
          </tr>
        </thead>
        <tbody>
          {taskOverview.length > 0 ? (
            taskOverview.map((task, index) => (
              <tr
                key={index}
                className="outline rounded outline-gray-700 text-2xl"
              >
                <td className="py-3 px-4">
                  {/* Link to employee details page */}
                  <Link to={`/admin/employee/${task.userId}`} className="text-[#4682B4]">
                    {task.name}
                  </Link>
                </td>
                <td className="py-3 px-10">
                  {task.totalCount}
                </td>
                <td className="py-3 px-20 text-[#ff5722]">
                  {task.newTasksCount}
                </td>
                <td className="py-3 px-20 text-blue-500">{task.activeCount}</td>
                <td className="py-3 px-20 text-green-500">
                  {task.completedCount}
                </td>
                <td className="py-3 px-10 text-red-500">{task.failedCount}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" className="text-center py-3 px-4">
                No data available
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default EmployeeTable;
