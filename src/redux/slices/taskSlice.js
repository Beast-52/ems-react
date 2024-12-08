import { compose, createSlice } from "@reduxjs/toolkit";
import { taskData } from "../../utils/data";
import {
  getLocalTasksData,
  setLocalTaskData,
  setLocalTasksData,
  settingReduxLocalTaskData,
} from "../../utils/localStorage";
import { v4 as uuid } from "uuid";
const initialState = {
  tasks:
    settingReduxLocalTaskData().length > 0
      ? [...settingReduxLocalTaskData()]
      : taskData,
};

const taskSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    findTask: (state, action) => {
      const userId = action.payload;

      // Ensure state.tasks is initialized and is an array
      const tasks = state.tasks || []; // Fallback to an empty array if null or undefined

      if (userId !== "admin") {
        // Find tasks specific to this user
        const filteredTasks = tasks.filter((task) => task.userId === userId);

        state.tasks = filteredTasks.length > 0 ? filteredTasks : []; // Always assign a valid array
      } else {
        // For admin, load all tasks from local storage and ensure it's an array
        const allTasks = getLocalTasksData() || taskData;
        state.tasks = allTasks.length > 0 ? [...allTasks] : []; // Always assign a valid array
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
          taskId: uuid(),
        });
        console.log(state.tasks);
        setLocalTasksData(state.tasks);
      } else {
      }

      // Optional: Log the updated state
    },
    deleteTask: (state, action) => {
      // Find the user who owns the task to delete
      state.tasks = state.tasks.map((user) => {
        if (user.userId === action.payload.userId) {
          // Filter out the task with the matching taskId
          user.tasks = user.tasks.filter(
            (task) => task.taskId !== action.payload.taskId
          );
        }
        return user;
      });

      // Save the updated state to localStorage (if required)
      setLocalTasksData(state.tasks);
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
    toggleCompleteTask(state, action) {
      const { taskId, userId } = action.payload;
      const user = state.tasks.find((user) => user.userId === userId);
      if (user) {
        // Find the task by taskId
        const taskIndex = user.tasks.findIndex(
          (task) => task.taskId === taskId
        );
        if (taskIndex > -1) {
          const task = user.tasks[taskIndex];
          // Toggle the completed property
          task.completed = !task.completed;
          task.active = false; // Optionally set active to false when completed

          // Log task changes (for debugging)
          console.log("Updated Completed Task:", task);
        }
        // After mutation, update the localStorage with the latest tasks state
        console.log("State Before Saving Completed Task:", state.tasks);
        setLocalTasksData(state.tasks);
      }
    },

    toggleFailedTask(state, action) {
      const { taskId, userId } = action.payload;
      const user = state.tasks.find((user) => user.userId === userId);
      if (user) {
        // Find the task by taskId
        const taskIndex = user.tasks.findIndex(
          (task) => task.taskId === taskId
        );
        if (taskIndex > -1) {
          const task = user.tasks[taskIndex];
          // Toggle the failed property
          task.failed = !task.failed;
          task.active = false; // Optionally set active to false when failed

          // Log task changes (for debugging)
          console.log("Updated Failed Task:", task);
        }
        // After mutation, update the localStorage with the latest tasks state
        console.log("State Before Saving Failed Task:", state.tasks);
        setLocalTasksData(state.tasks);
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
