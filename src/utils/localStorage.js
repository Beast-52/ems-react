import { taskData } from "./data";

export function setLocalAuthData(data) {
  localStorage.setItem("userData", JSON.stringify(data));
}

export function getLocalAuthData() {
  return JSON.parse(localStorage.getItem("userData"));
}
export function setLocalUsersData(data) {
  localStorage.setItem("usersData", JSON.stringify([...data]));
}

export function getLocalUsersData() {
  return JSON.parse(localStorage.getItem("usersData"));
}
export function setLocalTaskData(data) {
  localStorage.setItem("taskData", JSON.stringify(data));
}

export function getLocalTaskData() {
  return JSON.parse(localStorage.getItem("taskData"));
}
export function setLocalTasksData(data) {
  localStorage.setItem("tasksData", JSON.stringify(data)); // Saving to localStorage
  console.log("Tasks saved to localStorage:", data); // Debug log to check data
}

export const getLocalTasksData = () => {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  return Array.isArray(tasks) ? tasks : [];
};

export function removeLocalAuthData() {
  localStorage.removeItem("userData");
}

export function removeLocalTaskData() {
  localStorage.removeItem("taskData");
}

export const removeLocalUsersData = () => {
  localStorage.removeItem("usersData");
};
export function settingReduxLocalTaskData() {
  if (localStorage.getItem("tasksData")) {
    return JSON.parse(localStorage.getItem("tasksData"));
  }
  return taskData;
}
