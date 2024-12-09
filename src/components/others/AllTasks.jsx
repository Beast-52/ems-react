import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  toggleCompleteTask,
  toggleFailedTask,
  deleteTask, // Assume you have a deleteTask action
  // Assume you have an editTask action
} from "../../redux/slices/taskSlice";
import { useLocation } from "react-router-dom";

export const TaskPanelItem = ({ data }) => {
  const userData = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const location = useLocation();

  // Toggle task completion or failure
  const toggleComplete = () => {
    dispatch(
      toggleCompleteTask({ taskId: data.taskId, userId: userData.userId })
    );
  };

  const toggleFailed = () => {
    dispatch(
      toggleFailedTask({ taskId: data.taskId, userId: userData.userId })
    );
  };

  // Edit or delete for admin
  const handleEdit = () => {
    dispatch(editTask(data.taskId)); // Add your editing logic
  };

  const handleDelete = () => {
    dispatch(deleteTask(data.taskId)); // Add your delete logic
  };

  return (
    <div
      className={`task-panel min-h-[50vh] mx-auto md:h-[45vh] relative text-white px-8 py-6 md:w-[24vw] w-[20rem] rounded-xl flex-shrink-0 shadow-lg transform transition-transform hover:scale-105 hover:shadow-2xl`}
      style={{
        background: `linear-gradient(-30deg, ${data.backgroundColor} 30%, #1e293b 100%)`,
      }}
    >
      <div className="flex justify-between items-center mb-6">
        <div className="rounded-full px-4 py-2 text-sm font-medium bg-opacity-20 backdrop-blur-2xl bg-white">
          {data.category}
        </div>
        <div className="text-sm text-zinc-100">{data.taskDate}</div>
      </div>
      <div className="mb-4">
        <h1 className="text-3xl font-bold leading-tight text-white">
          {data.taskTitle}
        </h1>
      </div>
      <div>
        <p className="text-sm leading-relaxed text-gray-300">
          {data.taskDescription}
        </p>
      </div>

      {/* Admin Options (edit/delete) */}
      {location.pathname.includes("/admin") && (
        <div className="absolute top-4 right-4 flex gap-2">
          <button
            onClick={handleEdit}
            className="bg-yellow-500 px-4 py-2 rounded-lg text-sm font-semibold text-white shadow-md"
          >
            Edit
          </button>
          <button
            onClick={handleDelete}
            className="bg-red-500 px-4 py-2 rounded-lg text-sm font-semibold text-white shadow-md"
          >
            Delete
          </button>
        </div>
      )}

      {/* Task Completion and Failure Options */}
      <div className="flex justify-center gap-4 items-center absolute bottom-10 left-1/2 -translate-x-1/2 w-full">
        {!data.active ? (
          data.completed ? (
            <button className="bg-green-500 px-5 py-2 rounded-lg text-sm font-semibold text-white transition-all shadow-md">
              Task Completed
            </button>
          ) : (
            <button className="bg-red-500 px-5 py-2 rounded-lg text-sm font-semibold text-white transition-all shadow-md">
              Task Failed
            </button>
          )
        ) : (
          <>
            <button
              onClick={toggleComplete}
              className="bg-green-500 px-5 py-2 rounded-lg text-sm font-semibold text-white transition-all hover:bg-green-600 shadow-md"
              aria-label={`Mark task "${data.taskTitle}" as complete`}
            >
              Mark as Complete
            </button>
            <button
              onClick={toggleFailed}
              className="bg-red-500 px-5 py-2 rounded-lg text-sm font-semibold text-white transition-all hover:bg-red-600 shadow-md"
              aria-label={`Mark task "${data.taskTitle}" as failed`}
            >
              Mark as Fail
            </button>
          </>
        )}
      </div>
    </div>
  );
};

const TaskPanel = () => {
  const colorData = ["#ff6b6b", "#4f83cc", "#34d399", "#fbbf24", "#6366f1"];
  const userData = useSelector((state) => state.auth.user);
  const reduxTasks = useSelector((state) => state.tasks.tasks);
  const [actualTask, setActualTask] = useState([]);

  useEffect(() => {
    if (reduxTasks && userData) {
      const userTasks = reduxTasks.find(
        (item) => item.userId === userData.userId
      );
      if (userTasks) {
        const actualTaskList = userTasks.tasks.map((task, index) => ({
          ...task,
          backgroundColor: colorData[index % colorData.length],
        }));
        setActualTask(actualTaskList);
      } else {
        setActualTask([]); // Clear tasks if none found
      }
    }
  }, [reduxTasks, userData]);

  return (
    <div className="flex gap-8 mt-20 overflow-x-auto flex-wrap md:flex-nowrap  py-10 md:px-5 md:mx-5 ">
      {actualTask.map((item) => (
        <TaskPanelItem key={item.taskId} data={item} />
      ))}
    </div>
  );
};

export default TaskPanel;
