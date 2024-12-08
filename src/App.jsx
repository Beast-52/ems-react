import { useDispatch, useSelector } from "react-redux";
import "./App.css";
import { useEffect } from "react";
import { findTask, setReduxTaskData } from "./redux/slices/taskSlice";
import { taskData as taskList } from "./utils/data";
import {
  getLocalAuthData,
  setLocalAuthData,
  setLocalTaskData,
  setLocalUsersData,
  getLocalUsersData,
  getLocalTaskData,
  setLocalTasksData,
} from "./utils/localStorage";
import { employee } from "./utils/data";
import { loginUser } from "./redux/slices/authSlice";
import { Outlet } from "react-router-dom";

function App() {
  const userData = useSelector((state) => state.auth.user);
  const taskData = useSelector((state) => state.tasks.tasks);
  const dispatch = useDispatch();

  useEffect(() => {
    const auth = userData;

    if (auth) {
      setLocalAuthData(userData);
      dispatch(loginUser(userData));

      if (userData.role === "admin") {
        const users = getLocalUsersData() || [...employee]; // Fetch users or default to employee list
        setLocalUsersData(users);
      
        if (!taskData || taskData.length === 0) {
          // If no task data exists or is empty, fetch and set tasks for admin
          dispatch(findTask(userData.role));
          setLocalTasksData(taskList); // Ensure taskList contains valid tasks for admin
        }
      } else {
        // For employee role
        const task = getLocalTaskData(); // Retrieve employee-specific task data
        dispatch(findTask(userData.userId)); // Find tasks specific to employee's userId
      
        if (task && task.length > 0) {
          setLocalTasksData(task); // Set employee tasks in localStorage
        } else {
          // Optionally handle the case where no tasks are found for the employee
          console.log("No tasks found for employee:", userData.userId);
        }
      }
      
  }
}, [userData, taskData, dispatch]);

  useEffect(() => {
    if (userData) {
      setLocalAuthData(userData);
      dispatch(setReduxTaskData(taskData));
    }
  }, [userData, taskData, dispatch]);

  useEffect(() => {
    if (taskData && taskData.length > 0) {
      // Ensure taskData is not null
      setLocalTaskData(taskData);
    }
  }, [taskData]);

  return (
    <>
      <Outlet />
    </>
  );
}

export default App;
