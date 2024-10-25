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
  tasks: [...settingReduxLocalTaskData()],
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
        setLocalTasksData(state.tasks);
      } else {
      }

      // Optional: Log the updated state
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
    toggleCompleteTask(state, action) {
      const { taskId, userId } = action.payload;
      const user = state.tasks.find((user) => user.userId === userId);
      if (user) {
        // Find the task by taskId
        const taskIndex = user.tasks.findIndex(
          (task) => task.taskId === taskId
        );
        if (taskIndex > -1) {
          // Toggle the completed property
          user.tasks[taskIndex].completed = !user.tasks[taskIndex].completed;
          // You might also want to set 'active' to false when completed
          user.tasks[taskIndex].active = false; // if applicable
          setLocalTasksData(state.tasks)
        }
      }
    },

    toggleFailedTask: (state, action) => {
      const { taskId, userId } = action.payload;
      const user = state.tasks.find((user) => user.userId === userId);
      if (user) {
        // Find the task by taskId
        const taskIndex = user.tasks.findIndex(
          (task) => task.taskId === taskId
        );
        if (taskIndex > -1) {
          // Toggle the completed property
          user.tasks[taskIndex].failed = !user.tasks[taskIndex].failed;
          // You might also want to set 'active' to false when completed
          user.tasks[taskIndex].active = false; // if applicable
          setLocalTasksData(state.tasks)
        }
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
