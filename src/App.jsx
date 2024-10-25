import { useDispatch, useSelector } from "react-redux";
import "./App.css";
import Login from "./components/Auth/Login";
import AdminDashboard from "./components/Dashboard/AdminDashboard";
import UserDashboard from "./components/Dashboard/UserDashboard";
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
import { employee } from "./utils/data"; // Ensure taskData is being imported correctly
import { loginUser } from "./redux/slices/authSlice";

function App() {
  const userData = useSelector((state) => state.auth.user);
  const taskData = useSelector((state) => state.tasks.tasks);
  const dispatch = useDispatch();

  useEffect(() => {
    // Get auth from localStorage
    const auth = userData;

    if (auth) {
      setLocalAuthData(userData);
      dispatch(loginUser(userData)); // Ensure this action is a plain object

      if (userData.role === "admin") {
        const users = getLocalUsersData() || [...employee];
        setLocalUsersData(users);
        if (taskData.length === 0) {
          dispatch(findTask(userData.role));
          setLocalTasksData(taskList);
        }
      } else {
        const task = getLocalTaskData();
        dispatch(findTask(userData.userId));
        setLocalTasksData(task);
      }
    }
  }, []);

  useEffect(() => {
    if (userData) {
      setLocalAuthData(userData);
      dispatch(setReduxTaskData(taskData));
    }
  }, [userData]); // Add dispatch to dependencies

  useEffect(() => {
    if (taskData.length > 0) {
      setLocalTaskData(taskData); // Sync tasksData to localStorage
    }
  }, [taskData]);

  return (
    <>
      {userData ? (
        userData.role === "admin" ? (
          <AdminDashboard />
        ) : (
          <UserDashboard />
        )
      ) : (
        <Login />
      )}
    </>
  );
}

export default App;
