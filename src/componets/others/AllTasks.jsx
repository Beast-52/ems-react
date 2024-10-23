import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export const TaskPanelItem = ({ data }) => {
  return (
    <div
      className={`task-panel h-[45vh] relative text-white px-8 py-6 w-[24vw] rounded-xl   flex-shrink-0 shadow-lg transform transition-transform hover:scale-105 hover:shadow-2xl `}
      style={{
        background: `linear-gradient(-30deg, ${data.backgroundColor} 30%, #1e293b 100%) `,
      }}
    >
      <div className="flex justify-between items-center mb-6">
        <div className="rounded-full px-4 py-2 text-sm font-medium bg-opacity-20 backdrop-blur-2xl  bg-white">
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
      <div className="flex justify-center gap-4 items-center absolute bottom-10 left-1/2 -translate-x-1/2 w-full">
        {!data.active ? (
          data.completed ? (
            <button className="bg-green-500 px-5 py-2 rounded-lg text-sm font-semibold text-white transition-all  shadow-md">
              Completed
            </button>
          ) : (
            <button className="bg-red-500 px-5 py-2 rounded-lg text-sm font-semibold text-white transition-all  shadow-md">
              Failed
            </button>
          )
        ) : (
          <>
            <button className="bg-green-500 px-5 py-2 rounded-lg text-sm font-semibold text-white transition-all hover:bg-green-600 shadow-md">
              Mark as Complete
            </button>
            <button className="bg-red-500 px-5 py-2 rounded-lg text-sm font-semibold text-white transition-all hover:bg-red-600 shadow-md">
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
    if (reduxTasks && reduxTasks[0]) {
      const actualTaskList = reduxTasks
        .filter((item) => item.userId == userData.userId)[0]
        .tasks.map((task, index) => ({
          ...task,
          backgroundColor: colorData[index % colorData.length],
        }));

      setActualTask(actualTaskList);
      console.log("allTasks waly tasksList >", actualTaskList);
    }
  }, [reduxTasks]);

  return (
    <div className="flex gap-8 mt-20 overflow-x-auto scrollbar-hide py-10 px-5 mx-5">
      {actualTask &&
        actualTask.length > 0 &&
        actualTask.map((item, idx) => {
          return <TaskPanelItem key={idx} data={item} />;
        })}
    </div>
  );
};

export default TaskPanel;
