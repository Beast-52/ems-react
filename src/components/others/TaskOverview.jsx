import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { setLocalTaskData } from "../../utils/localStorage";

export const TaskCard = ({ background, count, taskType }) => {
  return (
    <div
      className={`h-[10vmax] md:h-36 w-[20vmax] ${background} flex-shrink-0 text-white text-[3vmax] md:text-[1.8vmax] font-bold flex flex-col justify-center px-10 rounded-md`}
    >
      <h1>{count}</h1>
      <h2 className="md:text-[1.3vmax] text-[1.6vmax]">
        {taskType || "Not Found"}
      </h2>
    </div>
  );
};

const TaskOverview = () => {
  const userData = useSelector((state) => state.auth.user);
  const reduxTask = useSelector((state) => state.tasks.tasks);
  const [actualList, setActualList] = useState([]);

  useEffect(() => {
    if (reduxTask.length > 0 && userData) {
      // Filter tasks belonging to the current user
      const filteredTasks = reduxTask.filter(
        (item) => item.userId === userData.userId
      );

      // Flatten the tasks array
      const allTasks = filteredTasks.flatMap((item) => item.tasks);

      // Initialize counts for all categories
      const categories = {
        Active: { count: 0, background: "bg-green-500", taskType: "Active" },
        Completed: {
          count: 0,
          background: "bg-blue-500",
          taskType: "Completed",
        },
        Failed: { count: 0, background: "bg-red-500", taskType: "Failed" },
        "New Task": {
          count: 0,
          background: "bg-yellow-500",
          taskType: "New Task",
        },
      };

      // Count tasks based on their status
      allTasks.forEach((task) => {
        if (task.active) {
          categories.Active.count += 1; // Increment count for active tasks
        }
        if (task.completed) {
          categories.Completed.count += 1; // Increment count for completed tasks
        }
        if (task.failed) {
          categories.Failed.count += 1; // Increment count for failed tasks
        }
        if (task.newTask) {
          categories["New Task"].count += 1; // Increment count for new tasks
        }
      });

      // Convert categories object back to an array
      const actualTasksArray = Object.values(categories);
      setActualList(actualTasksArray);
    } else {
      // Initialize categories if there are no tasks
      const emptyCategories = {
        Active: { count: 0, background: "bg-green-500", taskType: "Active" },
        Completed: {
          count: 0,
          background: "bg-blue-500",
          taskType: "Completed",
        },
        Failed: { count: 0, background: "bg-red-500", taskType: "Failed" },
        "New Task": {
          count: 0,
          background: "bg-yellow-500",
          taskType: "New Task",
        },
      };
      setActualList(Object.values(emptyCategories));
    }
  }, [reduxTask, userData]);

  return (
    <div className="w-[95%] flex pb-5 justify-between mx-auto flex-shrink-0 overflow-x-auto md:gap-10 gap-x-2 ">
      {actualList.map((task, index) => (
        <TaskCard
          key={index}
          background={task.background}
          count={task.count}
          taskType={task.taskType}
        />
      ))}
    </div>
  );
};

export default TaskOverview;
