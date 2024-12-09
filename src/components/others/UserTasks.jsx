import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { deleteTask } from "../../redux/slices/taskSlice";
import { BiLeftArrow, BiLeftArrowAlt } from "react-icons/bi";
// Import deleteTask action

const UserTasks = () => {
  const reduxTasks = useSelector((state) => state.tasks.tasks); // Get all tasks from Redux store
  const usersData = useSelector((state) => state.auth.usersData); // Get usersData from Redux store
  const [userTasks, setUserTasks] = useState([]); // State to store tasks for dynamic userId
  const { id } = useParams(); // Get the userId from URL parameters
  const dispatch = useDispatch(); // Initialize dispatch to trigger Redux actions

  useEffect(() => {
    if (reduxTasks.length > 0 && id) {
      // Filter tasks for the dynamic userId
      const filteredTasks = reduxTasks
        .flatMap((user) => {
          if (user.userId == id) {
            // If the userId matches, we return all tasks for that user
            return user.tasks.map((task) => ({
              ...task,
              userId: user.userId, // Attach userId to each task
            }));
          }
          return [];
        })
        .map((task) => ({
          ...task,
          userName: getUsernameById(task.userId), // Add username to each task dynamically
        }));

      setUserTasks(filteredTasks); // Update state with filtered tasks
    }
  }, [reduxTasks, id]); // Re-run when reduxTasks or userId changes

  // Function to get the username based on userId
  const getUsernameById = (userId) => {
    const user = usersData.find((user) => user.userId === userId);
    return user ? user.name : "Unknown User";
  };
  const navigate = useNavigate();
  // Handle delete task
  const handleDelete = (taskId, userId) => {
    dispatch(deleteTask({ taskId, userId })); // Dispatch the deleteTask action with taskId and userId
  };

  return (
    userTasks && (
      <div className=" p-5 bg-zinc-900 relative  md:mx-10 rounded min-h-[50vh]">
        <h1 className="text-3xl font-semibold text-white mb-6 px-10">
          Tasks for User {id}
        </h1>
        <BiLeftArrowAlt
          onClick={() => navigate(-1)}
          className="absolute top-3 left-3 text-2xl cursor-pointer  hover:scale-150 transition-all duration-150 text-white"
        />
        {/* Displaying the tasks dynamically for the selected user */}
        {userTasks.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-10 ">
            {userTasks.map((task) => (
              <div
                key={task.taskId}
                className="task-card bg-zinc-800 p-5 rounded-lg text-white shadow-lg relative hover:shadow-xl transition-shadow duration-300 ease-in-out"
              >
                {/* Show the username along with task */}
                <h2 className="font-semibold text-xl mb-2">
                  {task.userName} - {task.taskTitle}
                </h2>
                <p className="text-sm text-gray-400 mb-4">
                  {task.taskDescription}
                </p>

                <div className="flex items-center space-x-2">
                  <span
                    className={`badge text-sm font-semibold py-1 px-3 rounded-full ${
                      task.completed
                        ? "bg-green-500 text-white"
                        : task.failed
                        ? "bg-red-500 text-white"
                        : "bg-yellow-500 text-white"
                    }`}
                  >
                    {task.completed
                      ? "Completed"
                      : task.failed
                      ? "Failed"
                      : "Active"}
                  </span>
                </div>

                {/* The delete 'X' icon */}
                <span
                  onClick={() => handleDelete(task.taskId, task.userId)} // Pass both taskId and userId
                  className="inline-block px-3 py-2 absolute top-1 right-2 cursor-pointer hover:scale-125 transition-all duration-150"
                >
                  ❌
                </span>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-lg text-gray-400">No tasks found for User {id}.</p>
        )}
      </div>
    )
  );
};

export default UserTasks;
