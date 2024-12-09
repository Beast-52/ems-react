import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const EmployeeTable = () => {
  const usersData = useSelector((state) => state.auth.usersData);
  const taskData = useSelector((state) => state.tasks.tasks);

  const [taskOverview, setTaskOverview] = useState([]);

  const getTaskOverview = () => {
    if (!usersData || !taskData) return;

    const taskSummary = usersData.map((user) => {
      const userTasks =
        taskData.filter((item) => item.userId === user.userId)?.[0]?.tasks ||
        [];

      const summary = {
        name: user.name,
        totalCount: userTasks.length,
        activeCount: 0,
        completedCount: 0,
        failedCount: 0,
        newTasksCount: 0,
        userId: user.userId,
      };

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
    getTaskOverview();
  }, [usersData, taskData]);

  if (!usersData || !taskData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="mt-5  h-auto relative overflow-x-auto md:mx-10 mx-2 py-3">
      <table className="w-full border-collapse text-left text-sm md:text-base lg:text-lg text-white">
        <thead className="bg-gray-700">
          <tr>
            <th className="py-3 px-4 border-b border-gray-700">
              Employee Name
            </th>
            <th className="py-3 px-4 border-b border-gray-700">Total</th>
            <th className="py-3 px-4 border-b border-gray-700">New Task</th>
            <th className="py-3 px-4 border-b border-gray-700">Active Task</th>
            <th className="py-3 px-4 border-b border-gray-700">Completed</th>
            <th className="py-3 px-4 border-b border-gray-700">Failed</th>
          </tr>
        </thead>
        <tbody>
          {taskOverview.length > 0 ? (
            taskOverview.map((task, index) => (
              <tr key={index} className="outline outline-gray-700 rounded-md">
                <td className="py-3 px-4">
                  <Link
                    to={`/admin/employee/${task.userId}`}
                    className="text-[#4682B4] hover:underline"
                  >
                    {task.name}
                  </Link>
                </td>
                <td className="py-3 px-10">{task.totalCount}</td>
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
