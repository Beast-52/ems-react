import { createSlice } from "@reduxjs/toolkit";
import { taskData } from "../../utils/data";
import {
  getLocalTasksData,
  setLocalTaskData,
  settingReduxLocalTaskData,
} from "../../utils/localStorage";
import { v4 as uuid } from "uuid";
const initialState = {
  tasks: [...settingReduxLocalTaskData()],
};

const taskSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    findTask: (state, action) => {
      const userId = action.payload;
    
      // Ensure state.tasks is initialized and is an array
      const tasks = state.tasks || [];  // Fallback to an empty array if null or undefined
      
      if (userId !== "admin") {
        // Find tasks specific to this user
        const filteredTasks = tasks.filter(
          (task) => task.userId === userId
        );
        
        console.log("Filtered tasks for user:", filteredTasks);
        state.tasks = filteredTasks.length > 0 ? filteredTasks : [];  // Always assign a valid array
      } else {
        // For admin, load all tasks from local storage and ensure it's an array
        const allTasks = getLocalTasksData() || taskData;
        console.log("All tasks for admin:", allTasks);
        state.tasks = allTasks.length > 0 ? [...allTasks] : [];  // Always assign a valid array
      }
    },
    

    setReduxTaskData: (state, action) => {
      state.tasks = action.payload;
    },
    removeReduxTaskData: () => {
      state.tasks = [];
      setLocalTaskData(state.tasks);
    },
    addTask: (state, action) => {
      const { userId, newTask } = action.payload;

      // Find the user object in the state by userId
      const userTasks = state.tasks.find((user) => user.userId === userId);
      delete newTask.userId;
      if (userTasks) {
        // Add the new task to the user's tasks
        userTasks.tasks.push({
          ...newTask,
        });
        setLocalTaskData(state.tasks);
        console.log("updated state");

      } else {
        console.error(`User with ID ${userId} not found.`);
      }

      // Optional: Log the updated state
      console.log("Updated task list for userId", userId, userTasks.tasks);
    },
    deleteTask: (state, action) => {
      state.tasks = state.tasks.filter((task) => task.id !== action.payload);
    },
    updateTask: (state, action) => {
      const updatedTask = state.tasks.find(
        (task) => task.id === action.payload.id
      );
      if (updatedTask) {
        updatedTask.title = action.payload.title;
        updatedTask.description = action.payload.description;
      }
    },
    toggleCompleteTask: (state, action) => {
      const task = state.tasks.find((item) => item.id === action.payload);
      if (task) {
        task.completed = !task.completed;
      }
    },
    toggleFailedTask: (state, action) => {
      const task = state.tasks.find((item) => item.id === action.payload);
      if (task) {
        task.failed = !task.failed;
      }
    },
    clearTasks: (state) => {
      state.tasks = []; // Clear the tasks
    },
  },
});

export const {
  addTask,
  deleteTask,
  updateTask,
  toggleCompleteTask,
  toggleFailedTask,
  findTask,
  setReduxTaskData,
  clearTasks,
} = taskSlice.actions;

export default taskSlice.reducer;
