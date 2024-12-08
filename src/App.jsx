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
import { Outlet, useLocation, useNavigate } from "react-router-dom";

function App() {
  const userData = useSelector((state) => state.auth.user);
  const taskData = useSelector((state) => state.tasks.tasks);
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const navigate = useNavigate();
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
  useEffect(() => {
    const users = [];
    // Generate users e1@e.com to e5@e.com
    for (let i = 1; i <= 5; i++) {
      users.push({
        email: `e${i}@e.com`,
        password: "123",
      });
    }
    // Add the admin user
    users.push({
      email: "admin@me.com",
      password: "123",
    });

    // Log the users in a table format
    console.table(users);
    if (pathname == "/") {
      navigate("login");
    }
  }, []);
  return (
    <>
      <Outlet />
    </>
  );
}

export default App;
